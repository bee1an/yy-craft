import { CreateNamespace, px } from '@yy-ui/utils'
import {
  computed,
  ComputedRef,
  defineComponent,
  ExtractPropTypes,
  PropType,
  VNodeChild
} from 'vue'
import { useTheme, useThemeProps } from '@yy-ui/composables'
import {
  DropdownThemeVars,
  dropdownDark,
  dropdownLight,
  dropdownStyle
} from '@yy-ui/theme-chalk'
import YPopover from '../../popover/src/popover'
import YIcon from '../../icon/src/icon.vue'
import { JSX } from 'vue/jsx-runtime'
import { YBaseCollapsed3 } from '../../_internal'

export type DropdownOption = {
  /** 显示内容: 可以传入render函数 */
  label: string | (() => VNodeChild)
  /** 显示图标, 默认没有图标 */
  icon?: () => VNodeChild
  /** 唯一key */
  key: string | number | symbol
  /** 显示类型, group没有交互 */
  type?: 'item' | 'group'
  /** 子集 */
  children?: DropdownOption[]
}

export type DropdownItem = {
  label: string | (() => VNodeChild)
  icon?: () => VNodeChild
  active: boolean
  selected: boolean
  key: string | number | symbol
  type: 'item' | 'group'
  /** 子集 */
  children?: DropdownItem[]
  _iconHasWidth: boolean
  _expandHasWidth: boolean
}

export const dropdownProps = {
  ...useThemeProps<DropdownThemeVars>(),

  options: { type: Array as PropType<DropdownOption[]>, default: () => [] }
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>

export default defineComponent({
  name: 'Dropdown',
  props: dropdownProps,
  setup(props) {
    const bem = new CreateNamespace('dropdown')

    const lightVars = dropdownLight.vars()
    const darkVars = dropdownDark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars, {}),
        dark: Object.assign({}, darkVars, {})
      }
    })

    const { styleVars, vars } = useTheme(
      theme,
      'dropdown',
      dropdownStyle,
      props
    )

    const createItems = (
      option: DropdownOption,
      iconHasWidth: boolean,
      expandHasWidth: boolean
    ): DropdownItem => {
      const { label, icon, key, type = 'item', children } = option
      let childrenRef = children
      if (children) {
        const iconHasWidth = children.some(child => child.icon)
        const expandHasWidth = children.some(child => child.children)
        childrenRef = children.map(child =>
          createItems(child, iconHasWidth, expandHasWidth)
        )
      }

      return {
        label,
        icon,
        active: false,
        selected: false,
        key,
        type,
        children: childrenRef as DropdownItem[],
        _iconHasWidth: iconHasWidth,
        _expandHasWidth: expandHasWidth
      }
    }

    const dropdownItems = computed(() => {
      const iconHasWidth = props.options.some(option => option.icon)
      const expandHasWidth = props.options.some(option => option.children)
      return props.options.map(option =>
        createItems(option, iconHasWidth, expandHasWidth)
      )
    }) as ComputedRef<DropdownItem[]>

    return { bem, styleVars, vars, dropdownItems }
  },
  render() {
    const {
      bem,
      styleVars,
      vars,
      dropdownItems,
      $slots: { default: defaultSlot }
    } = this

    const renderItem = (item: DropdownItem) => {
      return (
        <div
          class={[
            bem.b('item').value,
            bem.b('item').m(item.type === 'group' && 'group-title').value,
            bem.b('item').m(item.selected && 'selected').value,
            bem.b('item').m(item.active && 'active').value
          ]}
        >
          <div
            class={bem.b('item').e('content-icon').value}
            style={{
              width: item._iconHasWidth ? px(vars.iconSize) : undefined,
              height: px(vars.iconSize)
            }}
          >
            {item.icon && <YIcon>{item.icon()}</YIcon>}
          </div>

          <div class={bem.b('item').e('content-main').value}>
            {typeof item.label === 'string' ? item.label : item.label()}
          </div>

          <div
            class={[bem.b('item').e('content-expand').value]}
            style={{
              width: px(item._expandHasWidth ? vars.iconSize : 8),
              height: px(vars.iconSize)
            }}
          >
            {item.type === 'item' && item.children && (
              <YIcon>
                <YBaseCollapsed3 />
              </YIcon>
            )}
          </div>
        </div>
      )
    }

    const createChild = (item: DropdownItem): JSX.Element | JSX.Element[] => {
      if (!item.children) {
        return renderItem(item)
      }

      if (item.type === 'group') {
        return [
          renderItem(item),
          ...(item.children.map(createChild) as JSX.Element[])
        ]
      }

      return (
        <YPopover
          trigger="hover"
          placement="right-start"
          to={false}
          show-arrow={false}
          class={bem.b('submenu').value}
          row
          distanceFromTrigger={5}
        >
          {{
            trigger: () => renderItem(item),
            default: () => item.children!.map(createChild)
          }}
        </YPopover>
      )
    }

    return (
      <YPopover style={styleVars} class={bem.b().value} row>
        {{
          trigger: defaultSlot,
          default: () => dropdownItems.map(createChild)
        }}
      </YPopover>
    )
  }
})

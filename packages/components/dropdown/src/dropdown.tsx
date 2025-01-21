import { CreateNamespace } from '@yy-ui/utils'
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
import { YBaseCollapsed2 } from '../../_internal'

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

    const { styleVars } = useTheme(theme, 'dropdown', dropdownStyle, props)

    const createItems = (option: DropdownOption): DropdownItem => {
      const { label, icon, key, type = 'item', children } = option
      let childrenRef = children
      if (children) {
        childrenRef = children.map(createItems)
      }

      return {
        label,
        icon,
        active: false,
        selected: false,
        key,
        type,
        children: childrenRef as DropdownItem[]
      }
    }

    const dropdownItems = computed(() => {
      return props.options.map(createItems)
    }) as ComputedRef<DropdownItem[]>

    return { bem, styleVars, dropdownItems }
  },
  render() {
    const {
      bem,
      styleVars,
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
          {item.icon && (
            <div class={bem.b('item').e('content-icon').value}>
              <YIcon>{item.icon()}</YIcon>
            </div>
          )}

          <div class={bem.b('item').e('content-main').value}>
            {typeof item.label === 'string' ? item.label : item.label()}
          </div>

          {item.type === 'item' && item.children && (
            <div class={[bem.b('item').e('content-expand').value]}>
              <YIcon>
                <YBaseCollapsed2 />
              </YIcon>
            </div>
          )}
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
          row
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

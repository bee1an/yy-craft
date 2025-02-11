import { CreateNamespace } from '@yy-ui/utils/src/create'
import { px } from '@yy-ui/utils/src/css'
import {
  computed,
  ComputedRef,
  defineComponent,
  ExtractPropTypes,
  PropType,
  reactive,
  RendererElement,
  StyleValue,
  VNodeChild
} from 'vue'
import { useTheme, useThemeProps } from '@yy-ui/composables/use-theme'
import { DefaultPlacement } from '@yy-ui/composables/use-placement'
import {
  DropdownThemeVars,
  dropdownDark,
  dropdownLight,
  dropdownStyle
} from '@yy-ui/theme-chalk/src/dropdown'
import YPopover from '../../popover/src/popover'
import YIcon from '../../icon/src/icon.vue'
import type { JSX } from 'vue/jsx-runtime'
import { YBaseCollapsed3 } from '../../_internal/icons'

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
  parent: DropdownItem | null
}

export const dropdownProps = {
  ...useThemeProps<DropdownThemeVars>(),

  options: { type: Array as PropType<DropdownOption[]>, default: () => [] },

  /** 二级菜单触发位置 */
  subPlacement: {
    type: String as PropType<DefaultPlacement>,
    default: 'right-start'
  },

  /** 是否可选中 */
  selectable: Boolean,

  /** 默认选中 */
  selectedKeys: {
    type: Array as PropType<DropdownOption['key'][]>,
    default: () => []
  },

  /***************************以下为popover props**************************** */

  /** 触发方式 */
  trigger: {
    type: String as PropType<'click' | 'hover' | 'focus' | 'manual'>,
    default: 'click'
  },

  /** 手动控制显隐 */
  showPopover: Boolean,

  /** 不要箭头 */
  showArrow: { type: Boolean, default: true },

  /** zIndex */
  zIndex: Number,

  /** 位置 */
  placement: { type: String as PropType<DefaultPlacement>, default: 'bottom' },

  /** popover挂载位置 */
  to: {
    type: [String, Object, Boolean] as PropType<
      string | RendererElement | boolean
    >,
    default: 'body'
  },

  /** 是否使用包裹元素*/
  wrapper: Boolean,

  /** wrapper class */
  wrapperClass: null,

  /** wrapper style */
  wrapperStyle: null as unknown as PropType<StyleValue>
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>

export const dropdownEmits = {
  /** v-model */
  'update:selected-keys': (() => true) as (
    newValue: DropdownItem['key'][]
  ) => void
}

export type DropdownEmits = typeof dropdownEmits

export default defineComponent({
  name: 'Dropdown',
  props: dropdownProps,
  emits: dropdownEmits,
  setup(props, { emit }) {
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

    const activeKeys = reactive(new Set())
    const setChainActive = (item: DropdownItem) => {
      activeKeys.add(item.key)
      item.active = true
      item.parent && setChainActive(item.parent)
    }

    // const selectedKeys = computed({
    //   get() {
    //     return new Set(props.selectedKeys)
    //   },
    //   set(newValue) {
    //     emit('update:selected-keys', Array.from(newValue))
    //   }
    // })
    const selectedKeys = reactive(Array.from(new Set(props.selectedKeys)))

    const selectItem = (item: DropdownItem): void => {
      selectedKeys.push(item.key)
      emit('update:selected-keys', selectedKeys)
      setChainActive(item)
    }
    const clearSelect = () => {
      activeKeys.clear()
      selectedKeys.length = 0
      emit('update:selected-keys', selectedKeys)
    }

    /**
     * 检查当前项是否处于活动状态
     * 依赖于是否有子元素处于选中状态
     */
    const checkActiveState = (item: DropdownItem) => {
      if (item.children) {
        const finded = item.children.find((child) => {
          if (selectedKeys.includes(child.key)) {
            return true
          }
        })

        if (finded) {
          setChainActive(item)
        } else {
          item.children.forEach(checkActiveState)
        }
      }
    }

    const createItems = (
      option: DropdownOption,
      iconHasWidth: boolean,
      expandHasWidth: boolean,
      parent: DropdownItem | null
    ): DropdownItem => {
      const { label, icon, key, type = 'item', children } = option

      const item: DropdownItem = {
        label,
        icon,
        active: activeKeys.has(option.key),
        selected: props.selectable && selectedKeys.includes(option.key),
        key,
        type,
        _iconHasWidth: iconHasWidth,
        _expandHasWidth: expandHasWidth,
        parent
      }

      if (children) {
        // 判断是否需要给图标预留位置
        const iconHasWidth = children.some((child) => child.icon)
        const expandHasWidth = children.some((child) => child.children)

        item.children = children.map((child) =>
          createItems(child, iconHasWidth, expandHasWidth, item)
        )
      }

      !item.active && checkActiveState(item)

      return item
    }

    const dropdownItems = computed(() => {
      const iconHasWidth = props.options.some((option) => option.icon)
      const expandHasWidth = props.options.some((option) => option.children)
      return props.options.map((option) =>
        createItems(option, iconHasWidth, expandHasWidth, null)
      )
    }) as ComputedRef<DropdownItem[]>

    const itemClickHandler = (item: DropdownItem) => {
      if (!props.selectable) return

      if (!item.children) {
        clearSelect()
        selectItem(item)
      }
    }

    return { bem, styleVars, vars, dropdownItems, itemClickHandler }
  },
  render() {
    const {
      bem,
      styleVars,
      vars,
      dropdownItems,
      itemClickHandler,
      $props: {
        trigger,
        showPopover,
        showArrow,
        zIndex,
        placement,
        subPlacement,
        to,
        wrapper,
        wrapperClass,
        wrapperStyle
      },
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
          onClick={() => itemClickHandler(item)}
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
          placement={subPlacement}
          to={false}
          wrapper
          show-arrow={false}
          class={bem.b('submenu').value}
          row
          distance-from-trigger={5}
        >
          {{
            trigger: () => renderItem(item),
            default: () => item.children!.map(createChild)
          }}
        </YPopover>
      )
    }

    return (
      <YPopover
        style={styleVars}
        class={bem.b().value}
        row
        trigger={trigger}
        show-popover={showPopover}
        show-arrow={showArrow}
        z-index={zIndex}
        placement={placement}
        to={to}
        wrapper={wrapper}
        wrapper-class={wrapperClass}
        wrapper-style={wrapperStyle}
      >
        {{
          trigger: defaultSlot,
          default: () => dropdownItems.map(createChild)
        }}
      </YPopover>
    )
  }
})

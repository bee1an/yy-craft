import { createKey, CreateNamespace, depx, px } from '@yy-ui/utils'
import {
  computed,
  defineComponent,
  ExtractPropTypes,
  PropType,
  reactive,
  useTemplateRef,
  VNodeChild
} from 'vue'
import { useTheme, useThemeProps } from '@yy-ui/composables'
import {
  MenuThemeVars,
  menuDark,
  menuLight,
  menuStyle
} from '@yy-ui/theme-chalk'
import { Icon } from '@yy-ui/components'
import { YBaseCollapsed2, YFadeInExpandTransition } from '../../_internal'
import { watch } from 'vue'
import YDropdown from '../../dropdown/src/dropdown'

export type MenuOption = {
  /** 显示内容: 可以传入render函数 */
  label: string | (() => VNodeChild)
  /** 显示图标, 默认没有图标 */
  icon?: () => VNodeChild
  /** 唯一key */
  key: string | number | symbol
  /** 显示类型, group没有交互 */
  type?: 'item' | 'group'
  /** 子集 */
  children?: MenuOption[]
}

export type MenuItem = {
  label: string | (() => VNodeChild)
  icon?: () => VNodeChild
  active: boolean
  selected: boolean
  key: string | number | symbol
  type: 'item' | 'group'
  level: number
  raw: MenuOption
  parent: MenuItem | null
  isLeaf: boolean
  expanded?: boolean
  children?: MenuItem[]
}

export const menuProps = {
  ...useThemeProps<MenuThemeVars>(),

  options: { type: Array as PropType<MenuOption[]>, default: () => [] },

  /** 默认展开的key */
  defaultExpandedKeys: {
    type: Array as PropType<MenuOption['key'][]>,
    default: () => []
  },

  /** 默认选中的key */
  defaultSelectedKeys: {
    type: Array as PropType<MenuOption['key'][]>,
    default: () => []
  },

  /** 收起状态 */
  collapsed: {
    type: Boolean
  },

  /** 收起后宽度 */
  collapsedWidth: {
    type: [Number, String]
  }
}

export type MenuProps = ExtractPropTypes<typeof menuProps>

export const menuEmits = {
  /** 菜单展开后 */
  expanded: () => true,
  /** 菜单收起后 */
  collapsed: () => true
}

export type MenuEmits = typeof menuEmits

export default defineComponent({
  name: 'Menu',
  props: menuProps,
  emits: menuEmits,
  setup(props, { emit }) {
    const bem = new CreateNamespace('menu')

    const lightVars = menuLight.vars()
    const darkVars = menuDark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars, {}),
        dark: Object.assign({}, darkVars, {})
      }
    })

    const { styleVars, vars } = useTheme(
      theme,
      'menu',
      menuStyle,
      props,
      menuLight.exclude
    )

    // 高亮项
    const activeKeys = reactive(new Set())
    // 选中项
    const selectedKeys = reactive(new Set(props.defaultSelectedKeys))
    // 执行选中会将所有父元素高亮
    const setChainActive = (item: MenuItem) => {
      activeKeys.add(item.key)
      item.parent && setChainActive(item.parent)
    }
    const selectItem = (item: MenuItem) => {
      selectedKeys.add(item.key)
      setChainActive(item)
    }
    const clearSelect = () => {
      activeKeys.clear()
      selectedKeys.clear()
    }

    // 展开项
    const expandedKeys = reactive(new Set(props.defaultExpandedKeys))
    const toggleExpandItem = (item: MenuItem) => {
      expandedKeys.has(item.key) ? collapseItem(item) : expandItem(item)
      createMenu()
    }
    const expandItem = (item: MenuItem) => {
      expandedKeys.add(item.key)
    }
    const collapseItem = (item: MenuItem) => {
      expandedKeys.delete(item.key)
    }

    const menuItems = reactive([]) as MenuItem[]
    const createItems = (
      option: MenuOption,
      level: number,
      parent: MenuItem | null,
      items: MenuItem[]
    ) => {
      const item: MenuItem = {
        key: option.key,
        label: option.label,
        icon: option.icon,
        active: activeKeys.has(option.key),
        selected: selectedKeys.has(option.key),
        type: option.type ?? 'item',
        level,
        raw: option,
        parent,
        isLeaf: !option.children,
        expanded: option.type === 'group' ? true : expandedKeys.has(option.key) // 默认收起
      }

      item.selected && selectItem(item)

      items.push(item)

      if (props.collapsed) {
        //
        item.children = option.children?.map(child =>
          createItems(child, level + 1, item, [])
        )
      } else {
        item.expanded &&
          option.children?.forEach(child => {
            createItems(child, level + 1, item, items)
          })
      }

      return item
      // !props.collapsed &&
      //   item.expanded &&
      //   option.children?.forEach(child => {
      //     createItems(child, level + 1, item, items)
      //   })
    }
    const createMenu = () => {
      menuItems.length = 0
      props.options.forEach(option => {
        const items: MenuItem[] = []
        createItems(option, 1, null, items)
        menuItems.push(...items)
      })
    }
    createMenu()
    watch(() => props.collapsed, createMenu)

    const itemClickHandler = (item: MenuItem) => {
      if (item.isLeaf) {
        clearSelect()
        selectItem(item)
        createMenu()
      } else {
        toggleExpandItem(item)
      }
    }

    const wapperWidth = computed(() => {
      return props.collapsed ? px(props.collapsedWidth) : '100%'
    })

    const iconSize = computed(() => {
      // 根据menu收起后的宽度计算icon大小
      if (!props.collapsed) return undefined

      const collapsedWidthDepx = depx(props.collapsedWidth!)

      const sizeKey =
        collapsedWidthDepx < 48
          ? 'small'
          : collapsedWidthDepx < 64
          ? 'medium'
          : 'large'

      return vars.value[createKey('iconSize', sizeKey)]
    })
    const iconMargin = computed(() => {
      // 根据menu收起后的宽度计算icon margin
      if (!props.collapsed) return undefined

      return px((depx(props.collapsedWidth!) - depx(iconSize.value!)) / 2)
    })

    const menuContainer = useTemplateRef('menuContainer')
    const transitionendHandler = (e: TransitionEvent) => {
      // 外层容器的width转场结束时, 触发收起或展开事件
      if (e.propertyName === 'width' && e.target === menuContainer.value) {
        props.collapsed ? emit('collapsed') : emit('expanded')
      }
    }

    return {
      bem,
      styleVars,
      menuItems,
      itemClickHandler,
      wapperWidth,
      iconSize,
      iconMargin,
      transitionendHandler
    }
  },
  render() {
    const {
      bem,
      styleVars,
      menuItems,
      itemClickHandler,
      wapperWidth,
      iconSize,
      iconMargin,
      transitionendHandler,
      $props: { collapsed }
    } = this

    const getSharedItemEl = (item: MenuItem) => (
      <div
        key={item.key}
        class={[
          bem.b('item').value,
          bem.b('item').m(item.type === 'group' && 'group-title').value,
          bem.b('item').m(item.selected && 'selected').value,
          bem.b('item').m(item.active && 'active').value
        ]}
        onClick={() => {
          itemClickHandler(item)
        }}
      >
        <div class={bem.b('item').e('indent').value}>
          {Array.from({ length: item.level }).map(() => (
            <div
              class={bem.b('item').e('indent-box').value}
              style={{ width: iconMargin }}
            ></div>
          ))}
        </div>

        <div class={bem.b('item').e('content').value}>
          {item.icon && (
            <div
              class={bem.b('item').e('content-icon').value}
              style={{
                fontSize: iconSize,
                marginRight: iconMargin
              }}
            >
              <Icon>{item.icon()}</Icon>
            </div>
          )}
          <div class={bem.b('item').e('content-main').value}>
            {typeof item.label === 'string' ? item.label : item.label()}
          </div>
          {!item.isLeaf && item.type === 'item' && (
            <div
              class={[
                bem.b('item').e('content-expand').value,
                bem
                  .b('item')
                  .e('content-expand')
                  .m(item.expanded && 'expanded').value
              ]}
            >
              <Icon>
                <YBaseCollapsed2 />
              </Icon>
            </div>
          )}
        </div>
      </div>
    )

    const sharedEl = menuItems.map(item => {
      if (collapsed && item.children) {
        return (
          <YDropdown
            key={item.key}
            options={item.children}
            placement="right-start"
            show-arrow={false}
            trigger="hover"
          >
            {getSharedItemEl(item)}
          </YDropdown>
        )
      }

      return getSharedItemEl(item)
    })

    return (
      <div
        style={[styleVars, { width: wapperWidth }]}
        class={[bem.b().value, bem.b().m(collapsed && 'collapsed').value]}
        onTransitionend={transitionendHandler}
        ref="menuContainer"
      >
        {collapsed ? (
          sharedEl
        ) : (
          <YFadeInExpandTransition group>{sharedEl}</YFadeInExpandTransition>
        )}
      </div>
    )
  }
})

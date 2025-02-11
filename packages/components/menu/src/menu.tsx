import {
  computed,
  defineComponent,
  ExtractPropTypes,
  PropType,
  reactive,
  useTemplateRef,
  VNodeChild
} from 'vue'
import { useTheme, useThemeProps } from '@yy-ui/composables/use-theme'
import {
  MenuThemeVars,
  menuDark,
  menuLight,
  menuStyle
} from '@yy-ui/theme-chalk/src/menu'
import { Icon } from '@yy-ui/components/icon'
import { YBaseCollapsed2 } from '../../_internal/icons'
import { YFadeInExpandTransition } from '../../_internal/fade-in-expand-transition'
import { watch } from 'vue'
import YDropdown from '../../dropdown/src/dropdown'
import { CreateNamespace } from '@yy-ui/utils/src/create'
import { depx, px } from '@yy-ui/utils/src/css'
import { createKey } from '@yy-ui/utils/src/tools'

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
  selectedKeys: {
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
  collapsed: () => true,
  /** v-model */
  'update:selected-keys': (() => true) as (newValue: MenuItem['key'][]) => void
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
    const selectedKeys = reactive(Array.from(new Set(props.selectedKeys)))
    const updateSelectedKeys = (newValue: MenuItem['key'][]) => {
      clearSelect()
      selectedKeys.splice(0, selectedKeys.length, ...newValue)
      emit('update:selected-keys', selectedKeys)
    }

    // 执行选中会将所有父元素高亮
    const setChainActive = (item: MenuItem) => {
      activeKeys.add(item.key)
      item.active = true
      item.parent && setChainActive(item.parent)
    }
    const clearSelect = () => {
      activeKeys.clear()
      selectedKeys.length = 0
      emit('update:selected-keys', selectedKeys)
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

    /**
     * 检查当前项是否处于活动状态
     * 依赖于是否有子元素处于选中状态
     */
    const checkActiveState = (item: MenuItem) => {
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
      option: MenuOption,
      level: number,
      parent: MenuItem | null,
      visibleItems: MenuItem[] | null
    ) => {
      const item: MenuItem = {
        key: option.key,
        label: option.label,
        icon: option.icon,
        active: activeKeys.has(option.key),
        selected: selectedKeys.includes(option.key),
        type: option.type ?? 'item',
        level,
        raw: option,
        parent,
        isLeaf: !option.children,
        expanded: option.type === 'group' ? true : expandedKeys.has(option.key) // 默认收起
      }

      visibleItems?.push(item)

      item.children = option.children?.map((child) =>
        createItems(
          child,
          level + 1,
          item,
          !props.collapsed && item.expanded ? visibleItems : null // 当菜单是展开状态并且菜单项是展开状态时，才继续渲染子菜单
        )
      )
      !item.active && checkActiveState(item)

      // if (props.collapsed) {
      //   item.children = option.children?.map(child =>
      //     createItems(child, level + 1, item, [])
      //   )
      // } else {
      //   item.expanded &&
      //     (item.children = option.children?.map(child =>
      //       createItems(child, level + 1, item, items)
      //     ))
      // }

      return item
    }
    const createMenu = () => {
      menuItems.length = 0
      props.options.forEach((option) => {
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
        selectedKeys.push(item.key)
        emit('update:selected-keys', selectedKeys)
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
      if (e.propertyName !== 'width' || e.target !== menuContainer.value) {
        return
      }
      props.collapsed ? emit('collapsed') : emit('expanded')
    }

    return {
      bem,
      styleVars,
      menuItems,
      itemClickHandler,
      selectedKeys,
      updateSelectedKeys,
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
      selectedKeys,
      updateSelectedKeys,
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

    const sharedEl = menuItems.map((item) => {
      if (collapsed && item.children) {
        return (
          <YDropdown
            selected-keys={selectedKeys}
            onUpdate:selected-keys={updateSelectedKeys}
            key={item.key}
            options={item.children}
            placement="right-start"
            show-arrow={false}
            trigger="hover"
            selectable
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

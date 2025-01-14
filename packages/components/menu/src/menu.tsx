import { CreateNamespace } from '@yy-ui/utils'
import {
  computed,
  defineComponent,
  ExtractPropTypes,
  PropType,
  reactive,
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

export type MenuOption = {
  /** 显示内容: 可以传入render函数 */
  label?: string | (() => VNodeChild)
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
  label?: string | (() => VNodeChild)
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
  }
}

export type MenuProps = ExtractPropTypes<typeof menuProps>

export default defineComponent({
  name: 'Menu',
  props: menuProps,
  setup(props) {
    const bem = new CreateNamespace('menu')

    const lightVars = menuLight.vars()
    const darkVars = menuDark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars, {}),
        dark: Object.assign({}, darkVars, {})
      }
    })

    const { styleVars } = useTheme(theme, 'menu', menuStyle, props)

    const menuItems = reactive([]) as MenuItem[]

    const expandedKeys = reactive(new Set(props.defaultExpandedKeys))
    const activeKeys = reactive(new Set())
    const selectedKeys = reactive(new Set(props.defaultSelectedKeys))
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

    const createItems = (
      option: MenuOption,
      level: number,
      parent: MenuItem | null,
      items: MenuItem[]
    ) => {
      const item = {
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
      } satisfies MenuItem

      item.selected && selectItem(item)

      items.push(item)

      item.expanded &&
        option.children?.forEach(child => {
          createItems(child, level + 1, item, items)
        })
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

    const itemClickHandler = (item: MenuItem) => {
      if (item.isLeaf) {
        clearSelect()
        selectItem(item)
        createMenu()
      } else {
        toggleExpandItem(item)
      }
    }

    return { bem, styleVars, menuItems, itemClickHandler }
  },
  render() {
    const { bem, styleVars, menuItems, itemClickHandler } = this

    return (
      <div style={styleVars} class={bem.b().value}>
        <YFadeInExpandTransition>
          {menuItems.map(item => {
            const selected = item.type === 'item' && item.selected && 'selected'
            const active = item.type === 'item' && item.active && 'active'

            return (
              <div
                key={item.key}
                class={[
                  bem.b('item').value,
                  item.type === 'group' && bem.b('group').value,
                  bem.b('item').m(selected).value,
                  bem.b('item').m(active).value
                ]}
                onClick={() => {
                  itemClickHandler(item)
                }}
              >
                <div class={bem.b('item').e('indent').value}>
                  {Array.from({ length: item.level }).map(() => (
                    <div class={bem.b('item').e('indent-box').value}></div>
                  ))}
                </div>

                <div class={bem.b('item').e('content').value}>
                  {item.icon && (
                    <div class={bem.b('item').e('content-icon').value}>
                      <Icon>{item.icon()}</Icon>
                    </div>
                  )}
                  <div class={bem.b('item').e('content-main').value}>
                    {item.label}
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
          })}
        </YFadeInExpandTransition>
      </div>
    )
  }
})

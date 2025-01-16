import { CreateNamespace } from '@yy-ui/utils'
import {
  computed,
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
  level: number
  raw: DropdownOption
  parent: DropdownItem | null
  isLeaf: boolean
  expanded?: boolean
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

    return { bem, styleVars }
  },
  render() {
    const { bem, styleVars } = this

    return <div style={styleVars} class={bem.b().value}></div>
  }
})

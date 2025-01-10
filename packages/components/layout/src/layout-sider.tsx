import { CreateNamespace } from '@yy-ui/utils'
import { computed, defineComponent, ExtractPropTypes } from 'vue'
import {
  layoutSiderDark,
  layoutSiderLight,
  layoutSiderStyle,
  LayoutSiderThemeVars
} from '@yy-ui/yy-ui'
import { useTheme, useThemeProps } from '@yy-ui/composables'
import YyScrollbar from '../../scrollbar'

export const layoutSiderProps = {
  ...useThemeProps<LayoutSiderThemeVars>()
}

export type LayoutSiderProps = ExtractPropTypes<typeof layoutSiderProps>

export default defineComponent({
  name: 'LayoutSider',
  props: layoutSiderProps,
  setup(props) {
    const bem = new CreateNamespace('layout-sider')

    const lightVars = layoutSiderLight.vars()
    const darkVars = layoutSiderDark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars, {}),
        dark: Object.assign({}, darkVars, {})
      }
    })

    const { styleVars } = useTheme(
      theme,
      'layout-sider',
      layoutSiderStyle,
      props
    )

    return { bem, styleVars }
  },
  render() {
    const {
      bem,
      styleVars,
      $slots: { default: defaultSlot }
    } = this

    return (
      <aside style={styleVars} class={bem.b().value}>
        <YyScrollbar>{defaultSlot?.()}</YyScrollbar>
      </aside>
    )
  }
})

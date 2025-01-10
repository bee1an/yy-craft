import { useTheme, useThemeProps } from '@yy-ui/composables'
import { CreateNamespace } from '@yy-ui/utils'
import {
  layoutFooterDark,
  layoutFooterLight,
  layoutFooterStyle,
  LayoutFooterThemeVars
} from '@yy-ui/theme-chalk'
import { computed, defineComponent, ExtractPropTypes } from 'vue'

export const layoutFooterProps = {
  ...useThemeProps<LayoutFooterThemeVars>()
}

export type LayoutFooterProps = ExtractPropTypes<typeof layoutFooterProps>

export default defineComponent({
  name: 'LayoutFooter',
  props: layoutFooterProps,
  setup(props) {
    const bem = new CreateNamespace('layout-footer')

    const lightVars = layoutFooterLight.vars()
    const darkVars = layoutFooterDark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars, {}),
        dark: Object.assign({}, darkVars, {})
      }
    })

    const { styleVars } = useTheme(
      theme,
      'layout-footer',
      layoutFooterStyle,
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
      <div style={styleVars} class={bem.b().value}>
        {defaultSlot?.()}
      </div>
    )
  }
})

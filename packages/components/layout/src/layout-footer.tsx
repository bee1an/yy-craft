import { useTheme, useThemeProps } from '@yy-ui/composables/use-theme'
import { CreateNamespace } from '@yy-ui/utils/src/create'
import {
  layoutFooterDark,
  layoutFooterLight,
  layoutFooterStyle,
  LayoutFooterThemeVars
} from '@yy-ui/theme-chalk/src/layout'
import { computed, defineComponent, ExtractPropTypes } from 'vue'

export const layoutFooterProps = {
  ...useThemeProps<LayoutFooterThemeVars>(),
  bordered: Boolean
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
      $props: { bordered },
      $slots: { default: defaultSlot }
    } = this

    return (
      <div
        style={styleVars}
        class={[bem.b().value, bem.m(bordered && 'bordered').value]}
      >
        {defaultSlot?.()}
      </div>
    )
  }
})

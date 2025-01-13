import { useTheme, useThemeProps } from '@yy-ui/composables'
import { CreateNamespace } from '@yy-ui/utils'
import {
  layoutHeaderDark,
  layoutHeaderLight,
  layoutHeaderStyle,
  LayoutHeaderThemeVars
} from '@yy-ui/theme-chalk'
import { computed, defineComponent, ExtractPropTypes } from 'vue'

export const layoutHeaderProps = {
  ...useThemeProps<LayoutHeaderThemeVars>(),
  bordered: Boolean
}

export type LayoutHeaderProps = ExtractPropTypes<typeof layoutHeaderProps>

export default defineComponent({
  name: 'LayoutHeader',
  props: layoutHeaderProps,
  setup(props) {
    const bem = new CreateNamespace('layout-header')

    const lightVars = layoutHeaderLight.vars()
    const darkVars = layoutHeaderDark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars, {}),
        dark: Object.assign({}, darkVars, {})
      }
    })

    const { styleVars } = useTheme(
      theme,
      'layout-header',
      layoutHeaderStyle,
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

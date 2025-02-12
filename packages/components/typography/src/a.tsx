import { CreateNamespace } from '@yy-ui/utils/src/create'
import { computed, defineComponent, type ExtractPropTypes } from 'vue'
import { useTheme, useThemeProps } from '@yy-ui/composables/use-theme'
import {
  type AThemeVars,
  aDark,
  aLight,
  aStyle
} from '@yy-ui/theme-chalk/src/typography'

export const aProps = {
  ...useThemeProps<AThemeVars>()
}

export type AProps = ExtractPropTypes<typeof aProps>

export default defineComponent({
  name: 'A',
  props: aProps,
  setup(props) {
    const bem = new CreateNamespace('a')

    const lightVars = aLight.vars()
    const darkVars = aDark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars),
        dark: Object.assign({}, darkVars)
      }
    })

    const { styleVars } = useTheme(theme, 'a', aStyle, props)

    return { bem, styleVars }
  },
  render() {
    const { bem, styleVars } = this

    return (
      <a style={styleVars} class={bem.b().value}>
        {this.$slots.default?.()}
      </a>
    )
  }
})

import type { AThemeVars } from '@yy-craft/theme-chalk/src/typography'
import type { ExtractPropTypes } from 'vue'
import { useTheme, useThemeProps } from '@yy-craft/composables/use-theme'
import { aDark, aLight, aStyle } from '@yy-craft/theme-chalk/src/typography'
import { CreateNamespace } from '@yy-craft/utils/src/create'
import { computed, defineComponent } from 'vue'

export const aProps = {
  ...useThemeProps<AThemeVars>(),
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
        dark: Object.assign({}, darkVars),
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
  },
})

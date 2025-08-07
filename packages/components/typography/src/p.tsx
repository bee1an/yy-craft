import type { PThemeVars } from '@yy-craft/theme-chalk/src/typography'
import type { ExtractPropTypes, PropType } from 'vue'
import { useTheme, useThemeProps } from '@yy-craft/composables/use-theme'
import { pDark, pLight, pStyle } from '@yy-craft/theme-chalk/src/typography'
import { CreateNamespace } from '@yy-craft/utils/src/create'
import { createKey } from '@yy-craft/utils/src/tools'
import { computed, defineComponent } from 'vue'

export const Pprops = {
  ...useThemeProps<PThemeVars>(),
  /** 文字深度 */
  depth: {
    type: [Number, String] as PropType<1 | 2 | 3 | '1' | '2' | '3'>,
    default: '1',
  },
}

export type PProps = ExtractPropTypes<typeof Pprops>

export default defineComponent({
  name: 'P',
  props: Pprops,
  setup(props) {
    const bem = new CreateNamespace('p')

    const lightVars = pLight.vars()
    const darkVars = pDark.vars()

    const theme = computed(() => {
      const textColorKey = createKey(
        'textColor',
        props.depth.toString() as '1' | '2' | '3',
      )

      return {
        light: Object.assign({}, lightVars, {
          textColor: lightVars[textColorKey],
        }),
        dark: Object.assign({}, darkVars, {
          textColor: darkVars[textColorKey],
        }),
      }
    })

    const { styleVars } = useTheme(theme, 'p', pStyle, props, pLight.exclude)

    return { bem, styleVars }
  },
  render() {
    const { bem, styleVars } = this

    return (
      <p style={styleVars} class={bem.b().value}>
        {this.$slots.default?.()}
      </p>
    )
  },
})

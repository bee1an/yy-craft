import { useTheme } from '@yy-ui/composables'
import { PDark, pLight, pStyle } from '@yy-ui/theme-chalk/src/p'
import { createKey, CreateNamespace } from '@yy-ui/utils'
import { computed, defineComponent, ExtractPropTypes, PropType } from 'vue'

export const props = {
  /** 文字深度 */
  depth: {
    type: [Number, String] as PropType<1 | 2 | 3 | '1' | '2' | '3'>,
    default: '1'
  }
}

export type PProps = ExtractPropTypes<typeof props>

export default defineComponent({
  name: 'P',
  props,
  setup(props) {
    const bem = new CreateNamespace('p')

    const lightVars = pLight.vars()
    const darkVars = PDark.vars()

    const theme = computed(() => {
      const textColorKey = createKey(
        'textColor',
        props.depth.toString() as '1' | '2' | '3'
      )

      return {
        light: Object.assign({}, lightVars, {
          textColor: lightVars[textColorKey]
        }),
        dark: Object.assign({}, darkVars, {
          textColor: darkVars[textColorKey]
        })
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
  }
})

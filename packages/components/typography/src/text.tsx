import { CreateNamespace } from '@yy-ui/utils/src/create'
import { createKey } from '@yy-ui/utils/src/tools'
import {
  computed,
  defineComponent,
  type ExtractPropTypes,
  h,
  type PropType
} from 'vue'
import { useTheme, useThemeProps } from '@yy-ui/composables/use-theme'
import {
  type TextThemeVars,
  textDark,
  textLight,
  textStyle
} from '@yy-ui/theme-chalk/src/typography'

export const textProps = {
  ...useThemeProps<TextThemeVars>(),
  /** 文字类型 */
  type: {
    type: String as PropType<
      'default' | 'success' | 'warning' | 'error' | 'info'
    >,
    default: 'default'
  },
  /** 文字深度 */
  depth: {
    type: [Number, String] as PropType<1 | 2 | 3 | '1' | '2' | '3'>
  },
  /** 文字加粗 */
  strong: {
    type: Boolean
  },
  /** 文字倾斜 */
  italic: {
    type: Boolean
  },
  /** 下划线 */
  underline: {
    type: Boolean
  },
  /** 删除线 */
  delete: {
    type: Boolean
  },
  /** 代码模式 */
  code: {
    type: Boolean
  },
  /** 标签 */
  tag: {
    type: String,
    default: 'span'
  }
}

export type TextProps = ExtractPropTypes<typeof textProps>

export default defineComponent({
  name: 'Text',
  props: textProps,
  setup(props) {
    const bem = new CreateNamespace('text')

    const lightVars = textLight.vars()
    const darkVars = textDark.vars()

    const theme = computed(() => {
      const textColorKey = createKey(
        'textColor',
        props.type === 'default'
          ? (props.depth?.toString() as '1' | '2' | '3') ?? props.type
          : props.type
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

    const { styleVars } = useTheme(
      theme,
      'text',
      textStyle,
      props,
      textLight.exclude
    )

    return { bem, styleVars }
  },
  render() {
    const {
      bem,
      styleVars,
      $slots: { default: defaultSlot },
      $props: { tag, strong, italic, underline, delete: del, code }
    } = this

    return h(
      code ? 'code' : tag,
      {
        style: styleVars,
        class: [
          bem.b().value,
          bem.b().m(strong && 'strong').value,
          bem.b().m(italic && 'italic').value,
          bem.b().m(underline && 'underline').value,
          bem.b().m(del && 'delete').value,
          bem.b().m(code && 'code').value
        ]
      },
      defaultSlot?.()
    )
  }
})

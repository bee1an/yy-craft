import { useThemeProps } from '@yy-ui/composables'
import { FlexThemeVars } from '@yy-ui/theme-chalk'
import { ExtractPropTypes, PropType } from 'vue'

export const flexProps = {
  ...useThemeProps<FlexThemeVars>(),
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/align-items) */
  align: {
    type: String
  },
  /** 是否为行内元素 */
  inline: {
    type: Boolean
  },
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/justify-content) */
  justify: {
    type: String,
    default: 'flex-start'
  },
  /** gap大小 */
  size: {
    type: [String, Number, Array] as PropType<
      'small' | 'medium' | 'large' | number | [number, number]
    >,
    default: 'medium'
  },
  /** 是否垂直显示 */
  vertical: {
    type: Boolean,
    default: false
  },
  /** 超出是否换行 */
  wrap: {
    type: Boolean,
    default: true
  }
}

export type FlexProps = ExtractPropTypes<typeof flexProps>

import { useThemeProps } from '@yy-ui/composables'
import { DividerThemeVars } from '@yy-ui/theme-chalk'
import { ExtractPropTypes, PropType } from 'vue'

export const dividerProps = {
  ...useThemeProps<DividerThemeVars>(),
  /** 是否使用虚线 */
  borderStyle: {
    type: String as PropType<
      | 'none'
      | 'hidden'
      | 'dotted'
      | 'dashed'
      | 'solid'
      | 'double'
      | 'groove'
      | 'ridge'
      | 'inset'
      | 'outset'
    >
  },
  /** 内容位置 */
  contentPosition: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'center'
  },
  /** 是否垂直 */
  vertical: {
    type: Boolean
  }
}

export type DividerProps = ExtractPropTypes<typeof dividerProps>

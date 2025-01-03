import { useThemeProps } from '@yy-ui/composables'
import { CheckboxTheme } from '@yy-ui/theme-chalk'
import { ExtractPropTypes } from 'vue'

export const checkboxProps = {
  ...useThemeProps<CheckboxTheme['vars']>(),
  /** value */
  modelValue: {
    type: Boolean,
    required: true
  },
  /** 显示的内容 */
  label: {
    type: String
  },
  /** 是否部分选中 */
  indeterminate: {
    type: Boolean
  }
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export type CheckboxEmits = {
  'update:modelValue': [boolean]
}

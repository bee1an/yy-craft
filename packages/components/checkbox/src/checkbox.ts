import type { CheckboxThemeVars } from '@yy-craft/theme-chalk'
import type { ExtractPropTypes } from 'vue'
import { useThemeProps } from '@yy-craft/composables'

export const checkboxProps = {
  ...useThemeProps<CheckboxThemeVars>(),
  /** value */
  modelValue: {
    type: Boolean,
    required: true,
  },
  /** 显示的内容 */
  label: {
    type: String,
  },
  /** 是否部分选中 */
  indeterminate: {
    type: Boolean,
  },
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export const checkboxEmits = {
  'update:modelValue': (() => true) as (value: boolean) => void,
}

export type CheckboxEmits = typeof checkboxEmits

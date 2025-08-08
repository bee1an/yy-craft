import type { SliderThemeVars } from '@yy-craft/theme-chalk/src/slider'
import type { ExtractPropTypes } from 'vue'
import { useThemeProps } from '@yy-craft/composables/use-theme'

export const sliderProps = {
  ...useThemeProps<SliderThemeVars>(),

  modelValue: {
    type: Number,
    default: 0,
  },

  min: {
    type: Number,
    default: 0,
  },

  max: {
    type: Number,
    default: 100,
  },
}

export type SliderProps = ExtractPropTypes<typeof sliderProps>

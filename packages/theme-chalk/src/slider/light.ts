import type { ExtractThemeVars, ThemeConfig } from '../common'
import { commonLight } from '../common'
import _common from './_common'

const vars = {
  ..._common,
  bgColor: commonLight.bgColor5,
  barBgColor: commonLight.primaryColor,
  triggerBgColor: commonLight.bgColor1,
  triggerBoxShadow: commonLight.boxShadow4,
}

export const sliderLight: ThemeConfig<typeof vars> = {
  name: 'slider',
  vars: () => ({ ...vars }),
  exclude: Object.keys({}),
}

export type SliderThemeVars = ExtractThemeVars<typeof sliderLight>

import {
  commonLight,
  type ExtractThemeVars,
  type ThemeConfig
} from '../../common'
import _common, { commonVars } from './_common'

const vars = {
  ..._common,
  ...commonVars,
  prefixColor: commonLight.primaryColor,
  textColor: commonLight.textColor1,
  textColorSuccess: commonLight.successColor,
  textColorWarning: commonLight.warningColor,
  textColorError: commonLight.errorColorPressed,
  textColorInfo: commonLight.infoColor
}

export const headlineLight: ThemeConfig<typeof vars> = {
  name: 'headline',
  vars: () => ({ ...vars }),
  exclude: [
    ...Object.keys(_common),
    'textColorSuccess',
    'textColorWarning',
    'textColorError',
    'textColorInfo'
  ]
}

export type HeadlineThemeVars = ExtractThemeVars<typeof headlineLight>

import { commonLight, ExtractThemeVars, ThemeConfig } from '../../common'
import _common, { commonVars } from './_common'

export const headlineLight = {
  name: 'headline',
  vars: () => ({
    ..._common,
    ...commonVars,
    prefixColor: commonLight.primaryColor,
    textColor: commonLight.textColor1,
    textColorSuccess: commonLight.successColor,
    textColorWarning: commonLight.warningColor,
    textColorError: commonLight.errorColorPressed,
    textColorInfo: commonLight.infoColor
  }),
  exclude: [
    ...Object.keys(_common),
    'textColorSuccess',
    'textColorWarning',
    'textColorError',
    'textColorInfo'
  ]
} satisfies ThemeConfig

export type HeadlineThemeVars = ExtractThemeVars<typeof headlineLight>

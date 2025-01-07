import commonVars from './_common'
import { commonLight, ExtractThemeVars, ThemeConfig } from '../../common'

export const textLight: ThemeConfig = {
  name: 'text',
  vars: () => ({
    ...commonVars,
    textColor: commonLight.textColor1,
    textColorSuccess: commonLight.successColor,
    textColorWarning: commonLight.warningColor,
    textColorError: commonLight.errorColorPressed,
    textColorInfo: commonLight.infoColor,
    textColor1: commonLight.textColor1,
    textColor2: commonLight.textColor2,
    textColor3: commonLight.textColor3,
    codeTextColor: commonLight.textColor2,
    codeBackgroundColor: commonLight.codeBackgroundColor
  }),
  exclude: [
    'textColorSuccess',
    'textColorWarning',
    'textColorError',
    'textColorInfo',
    'textColor1',
    'textColor2',
    'textColor3'
  ]
}

export type TextThemeVars = ExtractThemeVars<typeof textLight>

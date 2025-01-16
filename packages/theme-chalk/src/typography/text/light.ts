import commonVars from './_common'
import { commonLight, ExtractThemeVars, ThemeConfig } from '../../common'

const vars = {
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
}

export const textLight: ThemeConfig<typeof vars> = {
  name: 'text',
  vars: () => ({ ...vars }),
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

import { commonLight, type ExtractThemeVars, type ThemeConfig } from '../common'
import { commonVars } from './_common'

const vars = {
  ...commonVars,
  textColor: commonLight.textColor2,
  backgroundColor: commonLight.bodyColor,
  boxShadow: commonLight.boxShadow2,
  successIconColor: commonLight.successColor,
  warningIconColor: commonLight.warningColor,
  errorIconColor: commonLight.errorColor,
  infoIconColor: commonLight.infoColor
}

export const messageLight: ThemeConfig<typeof vars> = {
  name: 'message',
  vars: () => ({ ...vars })
}

export type MessageThemeVars = ExtractThemeVars<typeof messageLight>

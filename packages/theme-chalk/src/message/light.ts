import { commonLight, ExtractThemeVars, ThemeConfig } from '../common'
import { commonVars } from './_common'

export const messageLight: ThemeConfig = {
  name: 'message',
  vars: () => ({
    ...commonVars,
    textColor: commonLight.textColor2,
    backgroundColor: commonLight.bodyColor,
    boxShadow: commonLight.boxShadow2,
    successIconColor: commonLight.successColor,
    warningIconColor: commonLight.warningColor,
    errorIconColor: commonLight.errorColor,
    infoIconColor: commonLight.infoColor
  })
}

export type MessageThemeVars = ExtractThemeVars<typeof messageLight>

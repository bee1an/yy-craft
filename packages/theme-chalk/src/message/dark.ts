import { commonDark, ThemeConfig } from '../common'
import { commonVars } from './_common'

export const messageDark: ThemeConfig = {
  name: 'message',
  vars: () => ({
    ...commonVars,
    textColor: commonDark.textColor2,
    backgroundColor: commonDark.bodyColor,
    boxShadow: commonDark.boxShadow2,
    successIconColor: commonDark.successColor,
    warningIconColor: commonDark.warningColor,
    errorIconColor: commonDark.errorColor,
    infoIconColor: commonDark.infoColor
  })
}

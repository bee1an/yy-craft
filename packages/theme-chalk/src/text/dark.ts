import commonVars from './_common'
import { commonDark, ThemeConfig } from '../common'

export const textDark: ThemeConfig = {
  name: 'text',
  vars: () => ({
    ...commonVars,
    textColor: commonDark.textColor1,
    textColorSuccess: commonDark.successColor,
    textColorWarning: commonDark.warningColor,
    textColorError: commonDark.errorColorPressed,
    textColorInfo: commonDark.infoColor,
    textColor1: commonDark.textColor1,
    textColor2: commonDark.textColor2,
    textColor3: commonDark.textColor3,
    codeTextColor: commonDark.textColor2,
    codeBackgroundColor: commonDark.codeBackgroundColor
  })
}

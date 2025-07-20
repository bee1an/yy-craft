import { type ThemeConfig, commonDark } from '../common'
import { commonVars } from './_common'

export const messageDark: ThemeConfig = {
	name: 'message',
	vars: () => ({
		...commonVars,
		textColor: commonDark.textColor1,
		backgroundColor: commonDark.bgColor3,
		boxShadow: commonDark.boxShadow2,
		successIconColor: commonDark.successColor,
		warningIconColor: commonDark.warningColor,
		errorIconColor: commonDark.errorColor,
		infoIconColor: commonDark.infoColor
	})
}

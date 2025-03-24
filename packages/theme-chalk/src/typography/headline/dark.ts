import { commonDark, type ThemeConfig } from '../../common'
import _common, { commonVars } from './_common'

export const headlineDark: ThemeConfig = {
	name: 'headline',
	vars: () => ({
		..._common,
		...commonVars,
		prefixColor: commonDark.primaryColor,
		textColor: commonDark.textColor1,
		textColorSuccess: commonDark.successColor,
		textColorWarning: commonDark.warningColor,
		textColorError: commonDark.errorColorPressed,
		textColorInfo: commonDark.infoColor
	})
}

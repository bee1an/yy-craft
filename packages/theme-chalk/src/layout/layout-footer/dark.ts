import { commonDark, type ThemeConfig } from '../../common'
import { commonVars } from './_common'

export const layoutFooterDark = {
	name: 'layoutFooter',
	vars: () => ({
		...commonVars,
		textColor: commonDark.layoutTextColor,
		backgroundColor: commonDark.layoutFooterBg,
		borderColor: commonDark.layoutBorderColor
	})
} satisfies ThemeConfig

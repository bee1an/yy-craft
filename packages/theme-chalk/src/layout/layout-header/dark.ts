import { commonDark, type ThemeConfig } from '../../common'
import { commonVars } from './_common'

export const layoutHeaderDark = {
	name: 'layout-header',
	vars: () => ({
		...commonVars,
		textColor: commonDark.layoutTextColor,
		backgroundColor: commonDark.layoutHeaderBg,
		borderColor: commonDark.layoutBorderColor
	})
} satisfies ThemeConfig

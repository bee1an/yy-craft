import { rgba } from '@yy-ui/utils'
import { commonDark, type ThemeConfig } from '../common'
import _common, { commonVars } from './_common'

export const menuDark = {
	name: 'menu',
	vars: () => ({
		...commonVars,
		..._common,
		backgroundColor: commonDark.bodyColor,
		backgroundColorHover: commonDark.hoverColor,
		backgroundColorSelected: rgba(commonDark.primaryColor, 0.1),
		textColor: commonDark.textColor2,
		textColorSelected: commonDark.primaryColor,
		groupTextColor: commonDark.textColor3
	})
} satisfies ThemeConfig

import { rgba } from '@yy-craft/utils'
import { type ThemeConfig, commonDark } from '../common'
import _common, { commonVars } from './_common'

export const menuDark = {
	name: 'menu',
	vars: () => ({
		...commonVars,
		..._common,
		backgroundColorHover: commonDark.bgColor2,
		backgroundColorSelected: rgba(commonDark.primaryColor, 0.3),
		textColor: commonDark.textColor1,
		textColorSelected: commonDark.primaryColor,
		groupTextColor: commonDark.textColor5
	})
} satisfies ThemeConfig

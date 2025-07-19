import { rgba } from '@yy-craft/utils'
import { type ThemeConfig, commonDark } from '../common'
import { commonVars } from './_common'

const vars = {
	...commonVars,
	boxShadow:
		'0 3px 6px -4px rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .16), 0 9px 18px 8px rgba(0, 0, 0, .10)',
	backgroundColor: commonDark.bgColor3,
	backgroundColorHover: commonDark.bgColor2,
	backgroundColorSelected: rgba(commonDark.primaryColor, 0.1),
	textColor: commonDark.textColor1,
	textColorSelected: commonDark.primaryColor,
	groupTextColor: commonDark.textColor5
}

export const dropdownDark: ThemeConfig<typeof vars> = {
	name: 'dropdown',
	vars: () => ({ ...vars })
}

import { rgba } from '@yy-ui/utils'
import { commonDark, type ThemeConfig } from '../common'
import { commonVars } from './_common'

const vars = {
	...commonVars,
	boxShadow:
		'0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)',
	backgroundColor: commonDark.bodyColor,
	backgroundColorHover: commonDark.hoverColor,
	backgroundColorSelected: rgba(commonDark.primaryColor, 0.1),
	textColor: commonDark.textColor1,
	textColorSelected: commonDark.primaryColor,
	groupTextColor: commonDark.textColor3
}

export const dropdownDark: ThemeConfig<typeof vars> = {
	name: 'dropdown',
	vars: () => ({ ...vars })
}

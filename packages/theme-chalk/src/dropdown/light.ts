import { rgba } from '@yy-ui/utils'
import { commonLight, type ExtractThemeVars, type ThemeConfig } from '../common'
import { commonVars } from './_common'

const vars = {
	...commonVars,
	boxShadow:
		'0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)',
	backgroundColor: commonLight.bodyColor,
	backgroundColorHover: commonLight.hoverColor,
	backgroundColorSelected: rgba(commonLight.primaryColor, 0.1),
	textColor: commonLight.textColor1,
	textColorSelected: commonLight.primaryColor,
	groupTextColor: commonLight.textColor3
}

export const dropdownLight: ThemeConfig<typeof vars> = {
	name: 'dropdown',
	vars: () => ({ ...vars })
}

export type DropdownThemeVars = ExtractThemeVars<typeof dropdownLight>

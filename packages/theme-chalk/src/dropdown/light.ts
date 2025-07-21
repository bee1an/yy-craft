import { rgba } from '@yy-craft/utils'
import { type ExtractThemeVars, type ThemeConfig, commonLight } from '../common'
import { commonVars } from './_common'

const vars = {
	...commonVars,
	boxShadow: commonLight.boxShadow2,
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

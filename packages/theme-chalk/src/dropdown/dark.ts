import { rgba } from '@yy-craft/utils'
import { type ThemeConfig, commonDark } from '../common'
import { commonVars } from './_common'

const vars = {
	...commonVars,
	boxShadow: commonDark.boxShadow2,
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

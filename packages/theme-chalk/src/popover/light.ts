import { type ExtractThemeVars, type ThemeConfig, commonLight } from '../common'
import { commonVars } from './_common'

const vars = {
	...commonVars,
	boxShadow: commonLight.boxShadow2,
	backgroundColor: commonLight.bodyColor,
	textColor: commonLight.textColor1
}

export const popoverLight: ThemeConfig<typeof vars> = {
	name: 'popover',
	vars: () => ({ ...vars })
}

export type PopoverThemeVars = ExtractThemeVars<typeof popoverLight>

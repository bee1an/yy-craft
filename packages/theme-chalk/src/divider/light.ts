import { commonLight, type ExtractThemeVars, type ThemeConfig } from '../common'

const vars = {
	dividerBorderStyle: '',
	borderColor: commonLight.borderColor,
	fontSize: commonLight.fontSize
}

export const dividerLight: ThemeConfig<typeof vars> = {
	name: 'divider',
	vars: () => ({ ...vars })
}

export type DividerThemeVars = ExtractThemeVars<typeof dividerLight>

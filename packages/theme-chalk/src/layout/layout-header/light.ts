import { commonLight, type ExtractThemeVars, type ThemeConfig } from '../../common'
import { commonVars } from './_common'

const vars = {
	...commonVars,
	textColor: commonLight.textColor2,
	backgroundColor: commonLight.bodyColor,
	borderColor: commonLight.borderColor1
}

export const layoutHeaderLight: ThemeConfig<typeof vars> = {
	name: 'layoutHeader',
	vars: () => ({ ...vars })
}

export type LayoutHeaderThemeVars = ExtractThemeVars<typeof layoutHeaderLight>

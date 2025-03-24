import { type ExtractThemeVars, type ThemeConfig } from '../common'
import commonVars from './_common'

const vars = { ...commonVars }

export const flexTheme: ThemeConfig<typeof vars> = {
	name: 'flex',
	vars: () => ({ ...vars }),
	exclude: ['gapLarge', 'gapMedium', 'gapSmall']
}

export type FlexThemeVars = ExtractThemeVars<typeof flexTheme>

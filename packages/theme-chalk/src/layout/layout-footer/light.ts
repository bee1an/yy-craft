import { commonLight, type ExtractThemeVars, type ThemeConfig } from '../../common'
import { commonVars } from '../layout/_common'

const vars = {
	...commonVars,
	textColor: commonLight.textColor2,
	backgroundColor: commonLight.layoutFooterBg,
	borderColor: commonLight.borderColor1
}

export const layoutFooterLight: ThemeConfig<typeof vars> = {
	name: 'layoutFooter',
	vars: () => ({ ...vars })
}

export type LayoutFooterThemeVars = ExtractThemeVars<typeof layoutFooterLight>

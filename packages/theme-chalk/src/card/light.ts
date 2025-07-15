import { type ExtractThemeVars, type ThemeConfig, commonLight } from '../common'
import commonVars from './_common'

const vars = {
	...commonVars,
	transitionTime: '0.3s',
	boxShadow:
		'0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)',
	cubicBezierEaseInOut: commonLight.cubicBezierEaseInOut,
	borderColor: commonLight.borderColor,
	borderRadius: commonLight.borderRadius,
	cardFontSize: commonLight.fontSize,
	titleFontWeight: commonLight.fontWeightStrong,
	actionBackgroundColor: '#fafafc'
}

export const cardLight: ThemeConfig<typeof vars> = {
	name: 'card',
	vars: () => ({ ...vars }),
	exclude: Object.keys(commonVars)
}

export type CardThemeVars = ExtractThemeVars<typeof cardLight>

import { type ExtractThemeVars, type ThemeConfig, commonLight } from '../common'

const vars = {
	scrollbarBackgroundColor: 'rgba(0, 0, 0, 0.25)',
	scrollbarBackgroundColorHover: 'rgba(0, 0, 0, 0.4)',
	scrollbarBorderRadius: '5px',
	scrollbarTransitionTime: '0.2s',
	cubicBezierEaseInOut: commonLight.cubicBezierEaseInOut,
	scrollbarSize: '5px'
}

export const scrollbarLight: ThemeConfig<typeof vars> = {
	name: 'scrollbar',
	vars: () => ({ ...vars })
}

export type ScrollbarThemeVars = ExtractThemeVars<typeof scrollbarLight>

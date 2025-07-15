import { commonDark } from '../common'
import commonVars from './_common'

export const cardDark = {
	name: 'card',
	vars: () => ({
		...commonVars,
		transitionTime: '0.3s',
		boxShadow:
			'0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)',
		cubicBezierEaseInOut: commonDark.cubicBezierEaseInOut,
		borderColor: commonDark.borderColor,
		borderRadius: commonDark.borderRadius,
		cardFontSize: commonDark.fontSize,
		titleFontWeight: commonDark.fontWeightStrong,
		actionBackgroundColor: '#fafafc'
	}),
	exclude: Object.keys(commonVars)
}

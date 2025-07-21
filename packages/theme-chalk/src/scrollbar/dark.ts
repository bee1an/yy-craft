import { commonVars } from './_common'

export const scrollbarDark = {
	name: 'scrollbar',
	vars: () => ({
		scrollbarBackgroundColor: 'rgba(255, 255, 255, 0.25)',
		scrollbarBackgroundColorHover: 'rgba(255, 255, 255, 0.4)',
		...commonVars
	})
}

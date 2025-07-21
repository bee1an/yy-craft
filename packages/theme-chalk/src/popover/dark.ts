import { commonDark, type ThemeConfig } from '../common'
import { commonVars } from './_common'

const vars = {
	...commonVars,
	boxShadow: commonDark.boxShadow2,
	backgroundColor: commonDark.bgColor3,
	textColor: commonDark.textColor1
}

export const popoverDark: ThemeConfig<typeof vars> = {
	name: 'popover',
	vars: () => ({
		...vars
	})
}

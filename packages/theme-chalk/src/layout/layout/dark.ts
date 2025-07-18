import { type ThemeConfig } from '../../common'
import { commonVars } from './_common'

export const layoutDark: ThemeConfig = {
	name: 'layout',
	vars: () => ({ ...commonVars })
}

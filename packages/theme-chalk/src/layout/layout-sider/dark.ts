import { commonDark, type ThemeConfig } from '../../common'
import { commonVars } from './_common'

export const layoutSiderDark = {
	name: 'layout-sider',
	vars: () => ({
		...commonVars,
		textColor: commonDark.layoutTextColor,
		backgroundColor: commonDark.layoutSidebarBg,
		borderColor: commonDark.layoutBorderColor,
		collapsedTriggerBackgroundColor: commonDark.layoutToggleButtonBg,
		collapsedTriggerBorderColor: '#ffffff17'
	})
} satisfies ThemeConfig

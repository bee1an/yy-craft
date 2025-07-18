import { type ExtractThemeVars, type ThemeConfig, commonLight } from '../../common'
import { commonVars } from './_common'

const vars = {
	...commonVars,
	textColor: commonLight.textColor2,
	backgroundColor: commonLight.layoutSidebarBg,
	borderColor: commonLight.borderColor1,
	collapsedTriggerBackgroundColor: commonLight.layoutSidebarBg,
	collapsedTriggerBorderColor: commonLight.borderColor1
}

export const layoutSiderLight: ThemeConfig<typeof vars> = {
	name: 'layout-sider',
	vars: () => ({ ...vars })
}

export type LayoutSiderThemeVars = ExtractThemeVars<typeof layoutSiderLight>

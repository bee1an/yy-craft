import { commonLight, ExtractThemeVars, ThemeConfig } from '../../common'
import { commonVars } from './_common'

export const layoutSiderLight = {
  name: 'layout-sider',
  vars: () => ({
    ...commonVars,
    textColor: commonLight.textColor2,
    backgroundColor: commonLight.bodyColor,
    borderColor: commonLight.borderColor1,
    collapsedTriggerBackgroundColor: commonLight.bodyColor,
    collapsedTriggerBorderColor: commonLight.borderColor1
  })
} satisfies ThemeConfig

export type LayoutSiderThemeVars = ExtractThemeVars<typeof layoutSiderLight>

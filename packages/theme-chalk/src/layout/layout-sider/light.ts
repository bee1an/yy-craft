import { commonLight, ExtractThemeVars, ThemeConfig } from '../../common'

export const layoutSiderLight = {
  name: 'layout-sider',
  vars: () => ({
    textColor: commonLight.textColor2,
    backgroundColor: commonLight.bodyColor,
    borderColor: commonLight.borderColor1
  })
} satisfies ThemeConfig

export type LayoutSiderThemeVars = ExtractThemeVars<typeof layoutSiderLight>

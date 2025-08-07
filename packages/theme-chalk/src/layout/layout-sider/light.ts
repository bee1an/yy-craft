import type { ExtractThemeVars, ThemeConfig } from '../../common'
import { commonLight } from '../../common'
import { commonVars } from './_common'

const vars = {
  ...commonVars,
  textColor: commonLight.textColor2,
  backgroundColor: commonLight.bodyColor,
  borderColor: commonLight.borderColor1,
  collapsedTriggerBackgroundColor: commonLight.bodyColor,
  collapsedTriggerBorderColor: commonLight.borderColor1,
}

export const layoutSiderLight: ThemeConfig<typeof vars> = {
  name: 'layout-sider',
  vars: () => ({ ...vars }),
}

export type LayoutSiderThemeVars = ExtractThemeVars<typeof layoutSiderLight>

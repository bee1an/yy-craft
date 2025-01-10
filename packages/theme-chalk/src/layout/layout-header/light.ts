import { commonLight, ExtractThemeVars, ThemeConfig } from '../../common'
import { commonVars } from './_common'

export const layoutHeaderLight = {
  name: 'layoutHeader',
  vars: () => ({
    ...commonVars,
    textColor: commonLight.textColor2,
    backgroundColor: commonLight.bodyColor,
    borderColor: commonLight.borderColor1
  })
} satisfies ThemeConfig

export type LayoutHeaderThemeVars = ExtractThemeVars<typeof layoutHeaderLight>

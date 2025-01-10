import { ExtractThemeVars, ThemeConfig } from '../../common'
import { commonVars } from './_common'

export const layoutLight = {
  name: 'layout',
  vars: () => ({
    ...commonVars
  })
} satisfies ThemeConfig

export type LayoutThemeVars = ExtractThemeVars<typeof layoutLight>

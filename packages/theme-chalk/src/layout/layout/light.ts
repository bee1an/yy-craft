import { ExtractThemeVars, ThemeConfig } from '../../common'
import { commonVars } from './_common'

const vars = { ...commonVars }

export const layoutLight: ThemeConfig<typeof vars> = {
  name: 'layout',
  vars: () => ({ ...vars })
}

export type LayoutThemeVars = ExtractThemeVars<typeof layoutLight>

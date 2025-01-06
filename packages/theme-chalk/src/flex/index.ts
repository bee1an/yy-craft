import { ExtractThemeVars, ThemeConfig } from '../common'
import commonVars from './_common'

export const flexTheme: ThemeConfig<typeof commonVars> = {
  name: 'flex',
  vars: () => ({ ...commonVars }),
  exclude: ['gapLarge', 'gapMedium', 'gapSmall']
}

export type FlexThemeVars = ExtractThemeVars<typeof flexTheme>

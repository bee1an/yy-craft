import type { ExtractThemeVars, ThemeConfig } from '../common'
import { commonVars } from './_common'

const vars = {
  scrollbarBackgroundColor: 'rgba(0, 0, 0, 0.25)',
  scrollbarBackgroundColorHover: 'rgba(0, 0, 0, 0.4)',
  ...commonVars,
}

export const scrollbarLight: ThemeConfig<typeof vars> = {
  name: 'scrollbar',
  vars: () => ({ ...vars }),
}

export type ScrollbarThemeVars = ExtractThemeVars<typeof scrollbarLight>

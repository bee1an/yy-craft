import { ExtractThemeVars, ThemeConfig } from '../common'

const vars = {}

export const popoverLight: ThemeConfig<typeof vars> = {
  name: 'popover',
  vars: () => ({ ...vars })
}

export type PopoverThemeVars = ExtractThemeVars<typeof popoverLight>

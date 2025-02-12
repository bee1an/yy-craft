import { commonLight, type ExtractThemeVars, type ThemeConfig } from '../common'
import { commonVars } from './_common'

const vars = {
  ...commonVars,
  boxShadow:
    '0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)',
  backgroundColor: commonLight.bodyColor,
  textColor: commonLight.textColor1
}

export const popoverLight: ThemeConfig<typeof vars> = {
  name: 'popover',
  vars: () => ({ ...vars })
}

export type PopoverThemeVars = ExtractThemeVars<typeof popoverLight>

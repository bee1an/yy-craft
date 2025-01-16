import { ExtractThemeVars, ThemeConfig } from '../common'

const vars = {}

export const dropdownLight: ThemeConfig<typeof vars> = {
  name: 'dropdown',
  vars: () => ({ ...vars })
}

export type DropdownThemeVars = ExtractThemeVars<typeof dropdownLight>

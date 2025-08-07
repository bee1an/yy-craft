import type { ExtractThemeVars, ThemeConfig } from '../../common'
import { commonLight } from '../../common'
import commonVars from './_common'

const vars = { ...commonVars, textColor: commonLight.primaryColor }

export const aLight: ThemeConfig<typeof vars> = {
  name: 'a',
  vars: () => ({ ...vars }),
}

export type AThemeVars = ExtractThemeVars<typeof aLight>

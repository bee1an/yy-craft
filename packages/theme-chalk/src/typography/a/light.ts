import commonVars from './_common'
import { commonLight, ExtractThemeVars, ThemeConfig } from '../../common'

export const aLight: ThemeConfig = {
  name: 'a',
  vars: () => ({ ...commonVars, textColor: commonLight.primaryColor })
}

export type AThemeVars = ExtractThemeVars<typeof aLight>

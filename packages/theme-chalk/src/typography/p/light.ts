import commonVars from './_common'
import { commonLight, ExtractThemeVars } from '@yy-ui/theme-chalk'

export const pLight = {
  name: 'p',
  vars: () => ({
    ...commonVars,
    textColor1: commonLight.textColor1,
    textColor2: commonLight.textColor2,
    textColor3: commonLight.textColor3
  }),
  exclude: ['textColor1', 'textColor2', 'textColor3']
}

export type PThemeVars = ExtractThemeVars<typeof pLight>

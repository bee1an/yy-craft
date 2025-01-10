import { commonLight, ExtractThemeVars, ThemeConfig } from '../../common'
import { commonVars } from '../layout/_common'

export const layoutFooterLight = {
  name: 'layoutFooter',
  vars: () => ({
    ...commonVars,
    textColor: commonLight.textColor2,
    backgroundColor: commonLight.layoutFooterBg,
    borderColor: commonLight.borderColor1
  })
} satisfies ThemeConfig

export type LayoutFooterThemeVars = ExtractThemeVars<typeof layoutFooterLight>

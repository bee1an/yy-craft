import type { ExtractThemeVars, ThemeConfig } from '../../common'
import { commonLight } from '../../common'
import { commonVars } from '../layout/_common'

const vars = {
  ...commonVars,
  textColor: commonLight.textColor2,
  backgroundColor: commonLight.bgColor1,
  borderColor: commonLight.borderColor1,
}

export const layoutFooterLight: ThemeConfig<typeof vars> = {
  name: 'layoutFooter',
  vars: () => ({ ...vars }),
}

export type LayoutFooterThemeVars = ExtractThemeVars<typeof layoutFooterLight>

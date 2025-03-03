import { rgba } from '@yy-ui/utils'
import { commonLight, type ExtractThemeVars, type ThemeConfig } from '../common'
import _common, { commonVars } from './_common'

const vars = {
  ...commonVars,
  ..._common,
  backgroundColor: commonLight.bodyColor,
  backgroundColorHover: commonLight.hoverColor,
  backgroundColorSelected: rgba(commonLight.primaryColor, 0.1),
  textColor: commonLight.textColor2,
  textColorSelected: commonLight.primaryColor,
  groupTextColor: commonLight.textColor3
}

export const menuLight: ThemeConfig<typeof vars> = {
  name: 'menu',
  vars: () => ({ ...vars }),
  exclude: Object.keys(_common)
}

export type MenuThemeVars = ExtractThemeVars<typeof menuLight>

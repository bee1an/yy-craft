import type { ExtractThemeVars, ThemeConfig } from '../common'
import { rgba } from '@yy-craft/utils'
import { commonLight } from '../common'
import _common, { commonVars } from './_common'

const vars = {
  ...commonVars,
  ..._common,
  backgroundColorHover: commonLight.hoverColor,
  backgroundColorSelected: rgba(commonLight.primaryColor, 0.1),
  textColor: commonLight.textColor2,
  textColorSelected: commonLight.primaryColor,
  groupTextColor: commonLight.textColor3,
}

export const menuLight: ThemeConfig<typeof vars> = {
  name: 'menu',
  vars: () => ({ ...vars }),
  exclude: Object.keys(_common),
}

export type MenuThemeVars = ExtractThemeVars<typeof menuLight>

import { rgba } from '@yy-ui/utils'
import { commonLight, ExtractThemeVars, ThemeConfig } from '../common'
import _common, { commonVars } from './_common'

export const menuLight = {
  name: 'menu',
  vars: () => ({
    ...commonVars,
    ..._common,
    backgroundColor: commonLight.bodyColor,
    backgroundColorHover: commonLight.hoverColor,
    backgroundColorSelected: rgba(commonLight.primaryColor, 0.1),
    textColor: commonLight.textColor2,
    textColorSelected: commonLight.primaryColor,
    groupTextColor: commonLight.textColor3
  }),
  exclude: Object.keys(_common)
} satisfies ThemeConfig

export type MenuThemeVars = ExtractThemeVars<typeof menuLight>

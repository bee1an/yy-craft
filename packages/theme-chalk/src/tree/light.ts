import type { ExtractThemeVars, ThemeConfig } from '../common'
import { rgba } from '@yy-craft/utils'
import { commonLight } from '../common'
import { commonVars } from './_common'

const vars = {
  ...commonVars,
  treeBackgroundColorHover: '#f5f5f5',
  treeBorder: `2px solid ${commonLight.primaryColor}`,
  treeBottomBorderBackgroundColor: commonLight.primaryColor,
  treeSelectedBackgroundColor: rgba(commonLight.primaryColor, 0.1),
}

export const treeLight: ThemeConfig<typeof vars> = {
  name: 'tree',
  vars: () => ({ ...vars }),
}

export type TreeThemeVars = ExtractThemeVars<typeof treeLight>

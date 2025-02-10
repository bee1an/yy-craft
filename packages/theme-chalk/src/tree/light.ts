import { rgba } from '@yy-ui/utils'
import { commonLight, ExtractThemeVars, ThemeConfig } from '../common'

const vars = {
  treeWrapperPadding: '2px 0',
  treePadding: '1px 0',
  treeBackgroundColorHover: '#f5f5f5',
  treeBorder: '2px solid ' + commonLight.primaryColor,
  treeBottomBorderPos: '-4px',
  treeBottomBorderHeight: '2px',
  treeBottomBorderBackgroundColor: commonLight.primaryColor,
  treeTextFontSize: '14px',
  treeExpandedIconRotate: '90deg',
  treeSelectedBackgroundColor: rgba(commonLight.primaryColor, 0.1),
  treeIndentSize: '21px',
  treeIconSize: '24px',
  treeIconTransitionTime: '0.3s'
}

export const treeLight: ThemeConfig<typeof vars> = {
  name: 'tree',
  vars: () => ({ ...vars })
}

export type TreeThemeVars = ExtractThemeVars<typeof treeLight>

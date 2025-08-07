import { rgba } from '@yy-craft/utils'
import { commonDark } from '../common'
import { commonVars } from './_common'

export const treeDark = {
  name: 'tree',
  vars: () => ({
    ...commonVars,
    treeBackgroundColorHover: commonDark.bgColor2,
    treeBorder: `2px solid ${commonDark.primaryColor}`,
    treeBottomBorderBackgroundColor: commonDark.primaryColor,
    treeSelectedBackgroundColor: rgba(commonDark.primaryColor, 0.3),
  }),
}

import type { ThemeConfig } from '../../common'
import { commonDark } from '../../common'
import { commonVars } from './_common'

export const layoutSiderDark = {
  name: 'layout-sider',
  vars: () => ({
    ...commonVars,
    textColor: commonDark.textColor6,
    backgroundColor: commonDark.bgColor1,
    borderColor: commonDark.borderColor2,
    collapsedTriggerBackgroundColor: commonDark.bgColor3,
    collapsedTriggerBorderColor: '#ffffff17',
  }),
} satisfies ThemeConfig

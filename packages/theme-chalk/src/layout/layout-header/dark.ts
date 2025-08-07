import type { ThemeConfig } from '../../common'
import { commonDark } from '../../common'
import { commonVars } from './_common'

export const layoutHeaderDark = {
  name: 'layout-header',
  vars: () => ({
    ...commonVars,
    textColor: commonDark.textColor6,
    backgroundColor: commonDark.bgColor1,
    borderColor: commonDark.borderColor2,
  }),
} satisfies ThemeConfig

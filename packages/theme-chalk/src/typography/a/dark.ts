import type { ThemeConfig } from '../../common'
import { commonDark } from '../../common'
import commonVars from './_common'

export const aDark: ThemeConfig = {
  name: 'a',
  vars: () => ({ ...commonVars, textColor: commonDark.primaryColor }),
}

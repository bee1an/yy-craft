import commonVars from './_common'
import { commonDark, ThemeConfig } from '../../common'

export const aDark: ThemeConfig = {
  name: 'a',
  vars: () => ({ ...commonVars, textColor: commonDark.primaryColor })
}

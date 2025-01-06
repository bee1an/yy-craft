import { commonDark } from '../common'
import commonVars from './_common'

export const PDark = {
  name: 'p',
  vars: () => ({
    ...commonVars,
    textColor1: commonDark.textColor1,
    textColor2: commonDark.textColor2,
    textColor3: commonDark.textColor3
  })
}

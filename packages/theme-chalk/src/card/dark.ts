import commonVars from './_common'
import { commonDark } from '../common'

export const cardDark = {
  name: 'card',
  vars: () => ({
    ...commonVars,
    borderColor: commonDark.borderColor,
    borderRadius: commonDark.borderRadius,
    cardFontSize: commonDark.fontSize,
    titleFontSize: '18px',
    titleFontWeight: commonDark.fontWeightStrong,
    actionBackgroundColor: '#fafafc'
  }),
  exclude: Object.keys(commonVars)
}

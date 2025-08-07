import { commonDark } from '../common'

export const checkboxDark = {
  name: 'checkbox',
  vars: () => ({
    checkboxBorderColorHover: commonDark.primaryColor,
    checkboxBoxShadow: `0 0 0 2px ${commonDark.checkboxShadowColor}`,
    checkboxSize: '14px',
    checkboxFontSize: '14px',
    checkboxLabelPadding: '0 5px',
    checkboxLabelFontSize: '14px',
    checkboxBorder: `1px solid ${commonDark.checkboxBorderColor}`,
    checkboxBorderRadius: commonDark.borderRadius,
    checkboxIconBgColor: commonDark.primaryColor,
    checkboxIconColor: commonDark.textColor4,
    transparent: commonDark.transparent,
    checkboxShadowTransitionTime: '0.3s',
    cubicBezierEaseInOut: commonDark.cubicBezierEaseInOut,
  }),
}

import type { ExtractThemeVars, ThemeConfig } from '../common'
import { commonLight } from '../common'

const vars = {
  checkboxBorderColorHover: commonLight.primaryColor,
  checkboxBoxShadow: `0 0 0 2px ${commonLight.checkboxShadowColor}`,
  checkboxSize: '14px',
  checkboxFontSize: '14px',
  checkboxLabelPadding: '0 5px',
  checkboxLabelFontSize: '14px',
  checkboxBorder: `1px solid ${commonLight.checkboxBorderColor}`,
  checkboxBorderRadius: commonLight.borderRadius,
  checkboxIconBgColor: commonLight.primaryColor,
  checkboxIconColor: commonLight.textColor4,
  checkboxIconTransitionTime: '0.3s',
  transparent: commonLight.transparent,
  checkboxShadowTransitionTime: '0.3s',
  cubicBezierEaseInOut: commonLight.cubicBezierEaseInOut,
}

export const checkboxLight: ThemeConfig<typeof vars> = {
  name: 'checkbox',
  vars: () => ({ ...vars }),
}

export type CheckboxThemeVars = ExtractThemeVars<typeof checkboxLight>

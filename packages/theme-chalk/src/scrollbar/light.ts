import { commonLight, ExtractThemeVars } from '@yy-ui/yy-ui/style'

export const scrollbarLight = {
  name: 'scrollbar',
  vars: () => ({
    scrollbarBackgroundColor: 'rgba(0, 0, 0, 0.25)',
    scrollbarBackgroundColorHover: 'rgba(0, 0, 0, 0.4)',
    scrollbarBorderRadius: '5px',
    scrollbarTransitionTime: '0.2s',
    cubicBezierEaseInOut: commonLight.cubicBezierEaseInOut,
    scrollbarSize: '5px'
  })
}

export type ScrollbarThemeVars = ExtractThemeVars<typeof scrollbarLight>

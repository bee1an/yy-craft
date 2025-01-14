import { commonDark } from '@yy-ui/theme-chalk'

export const scrollbarDark = {
  name: 'scrollbar',
  vars: () => ({
    scrollbarBackgroundColor: 'rgba(0, 0, 0, 0.25)',
    scrollbarBackgroundColorHover: 'rgba(0, 0, 0, 0.4)',
    scrollbarBorderRadius: '5px',
    scrollbarTransitionTime: '0.2s',
    cubicBezierEaseInOut: commonDark.cubicBezierEaseInOut,
    scrollbarSize: '5px'
  })
}

import { c, cB, cM } from '@yy-ui/utils'
import { commonBase, commonLight, ThemeType } from '@yy-ui/yy-ui/style'

export const waveTheme = {
  name: 'wave',
  vars: {
    waveAnimationDuration: '0.6s',
    cubicBezierEaseOut: commonBase.cubicBezierEaseOut,
    waveAnimationName: 'wave-spread, wave-opacity'
  }
}
export type WaveTheme = ThemeType<typeof waveTheme>

export default c([
  cB(
    'wave',
    {
      position: 'absolute',
      pointerEvents: 'none',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      animationIterationCount: '1',
      animationDuration: 'var(--y-wave-animation-duration)',
      animationTimingFunction: 'var(--y-cubic-bezier-ease-out)'
    },
    [
      cM('active', {
        zIndex: '1',
        animationName: 'var(--y-wave-animation-name)'
      })
    ]
  ),

  c('@keyframes wave-spread', {
    from: {
      boxShadow: '0 0 0.5px 0 ' + commonLight.primaryColor
    },
    to: {
      boxShadow: '0 0 0.5px 4.5px ' + commonLight.primaryColor
    }
  }),
  c('@keyframes wave-opacity', {
    from: {
      opacity: 0.6
    },
    to: {
      opacity: 0
    }
  })
])

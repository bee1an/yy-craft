import { cB, cVar } from '@yy-ui/utils'

export const pStyle = cB('p', {
  boxSizing: 'border-box',
  transition: `color ${cVar('transitionTime')} ${cVar('cubicBezierEaseInOut')}`,
  margin: cVar('margin'),
  fontSize: cVar('fontSize'),
  lineHeight: cVar('lineHeight'),
  color: cVar('textColor')
})

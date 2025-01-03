import { cB, cE, cM } from '@yy-ui/utils'

export const vlStyle = cB(
  'vl',
  {
    position: 'relative',
    maxWidth: 'inherit',
    maxHeight: 'inherit',
    overflow: 'auto',
    scrollbarWidth: 'none'
  },
  [
    cE('visible', [
      cM('horizontal', {
        display: 'inline-flex',
        flexDirection: 'row'
      })
    ])
  ]
)

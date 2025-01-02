import { cB, cE, cM } from '@yy-ui/utils'

export default cB(
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

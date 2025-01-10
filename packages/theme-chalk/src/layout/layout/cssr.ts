import { c, cB, cM, cVar } from '@yy-ui/utils'

export const layoutStyle = c(null, [
  cB(
    'layout',
    {
      position: 'relative',
      fontSize: cVar('fontSize'),
      flex: 'auto'
    },
    [
      cB('layout-scroll-container', {
        height: '100%'
      })
    ]
  )
])

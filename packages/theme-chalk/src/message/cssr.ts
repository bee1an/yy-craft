import { c, cB } from '@yy-ui/utils'

export const messageStyle = c(null, [
  cB('message-provider', {
    position: 'fixed',
    height: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: '6000',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    top: 0
  }),
  cB('message', [])
])

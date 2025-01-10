import { cB, cVar } from '@yy-ui/utils'

export const layoutSiderStyle = cB('layout-sider', {
  flexShrink: '0',
  boxSizing: 'border-box',
  position: 'relative',
  zIndex: '1',
  color: cVar('textColor'),
  backgroundColor: cVar('backgroundColor'),
  display: 'flex',
  justifyContent: 'flex-end'
})

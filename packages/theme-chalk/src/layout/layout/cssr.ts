import { c, cB, cVar } from '@yy-craft/utils'

export const layoutStyle = c(null, [
	cB('layout', {
		position: 'relative',
		fontSize: cVar('fontSize'),
		flex: 'auto'
	})
])

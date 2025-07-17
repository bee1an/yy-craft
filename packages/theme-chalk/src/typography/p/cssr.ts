import { c, cB, cVar } from '@yy-craft/utils'

export const pStyle = cB(
	'p',
	{
		boxSizing: 'border-box',
		transition: `color ${cVar('transitionTime')} ${cVar('cubicBezierEaseInOut')}`,
		margin: cVar('margin'),
		fontSize: cVar('fontSize'),
		lineHeight: cVar('lineHeight'),
		color: cVar('textColor')
	},
	[
		c('&:first-child', {
			marginTop: 0
		})
	]
)

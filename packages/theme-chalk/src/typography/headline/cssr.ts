import { c, cB, cM, cVar } from '@yy-craft/utils'

export const headlineStyle = cB(
	'h',
	{
		position: 'relative',
		fontSize: cVar('fontSize'),
		fontWeight: cVar('fontWeight'),
		margin: cVar('margin'),
		transition: `color ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')}`,
		color: cVar('textColor')
	},
	[
		cM('prefix', [
			c('&::before', {
				content: '""',
				width: cVar('prefixWidth'),
				borderRadius: `calc(${cVar('prefixWidth')}/2)`,
				transition: `background-color ${cVar('transitionDuration')} ${cVar(
					'transitionTimingFunction'
				)}`,
				position: 'absolute',
				left: `calc(-1 * ${cVar('prefixLeft')})`,
				top: 0,
				bottom: 0,
				backgroundColor: cVar('prefixColor')
			})
		]),

		cM(
			'prefix-align',
			{
				paddingLeft: cVar('prefixLeft')
			},
			[
				c('&::before', {
					left: 0
				})
			]
		)
	]
)

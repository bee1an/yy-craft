import { cB, cE, cM, cNotM } from '@yy-ui/utils'

export const dividerStyle = cB(
	'divider',
	{
		alignItems: 'center'
	},
	[
		cE('line', {
			flex: 1,
			borderTop: '1px var(--y-divider-border-style,solid) var(--y-border-color)'
		}),
		cE('text', {
			margin: '0 12px',
			fontSize: 'var(--y-font-size)'
		}),

		cNotM('vertical', {
			display: 'flex',
			width: '100%',
			margin: '24px 0'
		}),

		cM(
			'vertical',
			{
				display: 'inline-flex',
				flexDirection: 'column',
				height: '100%',
				margin: '0 8px'
			},
			[
				cE('line', {
					borderLeft: '1px var(--y-divider-border-style,solid) var(--y-border-color)'
				}),
				cE('text', {
					margin: '4px 0'
				})
			]
		),

		cM('left', [cE('line', [cM('left', { flex: 0.15 })])]),
		cM('right', [cE('line', [cM('right', { flex: 0.15 })])])
	]
)

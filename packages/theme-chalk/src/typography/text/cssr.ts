import { cB, cM, cVar } from '@yy-craft/utils'

export const textStyle = cB(
	'text',
	{
		transition: `color ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')}`,
		color: cVar('textColor')
	},
	[
		cM('strong', {
			fontWeight: cVar('fontWeightStrong')
		}),
		cM('italic', {
			fontStyle: 'italic'
		}),
		cM('underline', {
			textDecoration: 'underline'
		}),
		cM('delete', {
			textDecoration: 'line-through'
		}),
		cM('code', {
			lineHeight: '1.4',
			display: 'inline-block',
			transition: `
				color ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
				background-color ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
				border-color ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
			`,
			boxSizing: 'border-box',
			padding: '.05em .35em 0 .35em',
			borderRadius: `${cVar('codeBorderRadius')}`,
			fontSize: '.9em',
			color: cVar('codeTextColor'),
			backgroundColor: cVar('codeBackgroundColor'),
			border: cVar('codeBorder')
		})
	]
)

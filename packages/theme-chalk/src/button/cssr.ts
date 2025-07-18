import { c, cB, cE, cM } from '@yy-craft/utils'

export const buttonStyle = c([
	cB(
		'button',
		{
			all: 'unset',
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'relative',
			height: 'var(--y-button-height)',
			padding: 'var(--y-button-padding)',
			border: 'var(--y-button-border)',
			boxSizing: 'border-box',
			borderRadius: 'var(--y-button-border-radius)',
			fontSize: 'var(--y-button-font-size)',
			cursor: 'pointer',
			transition: `color var(--y-button-transition-time) var(--y-cubic-bezier-ease-in-out), 
				border-color var(--y-button-transition-time) var(--y-cubic-bezier-ease-in-out), 
				background-color var(--y-button-transition-time) var(--y-cubic-bezier-ease-in-out)`,
			color: 'var(--y-button-color)',
			borderColor: 'var(--y-button-border-color)',
			backgroundColor: 'var(--y-button-background-color)',
			borderStyle: 'var(--y-button-border-style)',
			whiteSpace: 'nowrap',
			userSelect: 'none'
		},
		[
			c('&:hover, &:focus', {
				color: 'var(--y-button-color-hover)',
				borderColor: 'var(--y-button-border-color-hover)',
				backgroundColor: 'var(--y-button-background-color-hover)'
			}),
			c('&:active', {
				color: 'var(--y-button-color-active)',
				borderColor: 'var(--y-button-border-color-active)',
				backgroundColor: 'var(--y-button-background-color-active)'
			}),

			cE('content', [
				cM('strong', {
					'font-weight': 'var(--y-button-font-weight-strong)'
				})
			])
		]
	),
	c([
		c('@keyframes button-wave-spread', {
			from: { boxShadow: 'var(--y-button-wave-spread-from)' },
			to: { boxShadow: 'var(--y-button-wave-spread-to)' }
		}),
		c('@keyframes button-wave-opacity', {
			from: { opacity: 'var(--y-button-wave-opacity-from)' },
			to: { opacity: 'var(--y-button-wave-opacity-to)' }
		})
	])
])

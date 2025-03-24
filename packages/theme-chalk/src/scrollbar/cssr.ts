import { c, cB, cE, cM } from '@yy-ui/utils'

export const scrollbarStyle = c([
	cB(
		'scrollbar',
		{
			position: 'relative',
			width: '100%',
			height: '100%',
			maxWidth: 'inherit',
			maxHeight: 'inherit'
		},
		[
			cM('display_controller', [
				c('>', [
					cB('scrollbar-rail', [
						cE('controller', {
							backgroundColor: 'var(--y-scrollbar-background-color)'
						})
					])
				])
			]),
			c('&:hover', [
				c('>', [
					cB('scrollbar-rail', [
						cE('controller', {
							backgroundColor: 'var(--y-scrollbar-background-color)'
						})
					])
				])
			]),
			cB('scrollbar-rail', [
				cE(
					'controller',
					{
						position: 'absolute',
						width: '100%',
						height: '100%',
						backgroundColor: 'transparent',
						borderRadius: 'var(--y-scrollbar-border-radius)',
						userSelect: 'none',
						transition:
							'background-color var(--y-scrollbar-transition-time) var(--y-cubic-bezier-ease-in-out)',
						cursor: 'pointer'
					},
					[
						c('&:hover', {
							backgroundColor: 'var(--y-scrollbar-background-color-hover)'
						}),

						cM('active', {
							backgroundColor: 'var(--y-scrollbar-background-color-hover)'
						})
					]
				)
			])
		]
	),
	cB('scrollbar-container', {
		position: 'relative',
		width: '100%',
		height: '100%',
		maxWidth: 'inherit',
		maxHeight: 'inherit',
		overflow: 'scroll',
		scrollbarWidth: 'none'
	}),

	cB('scrollbar-rail', [
		cM('vertical', {
			position: 'absolute',
			top: '0',
			right: '0',
			width: 'var(--y-scrollbar-size)',
			height: '100%'
		}),
		cM('horizontal', {
			position: 'absolute',
			bottom: '0',
			left: '0',
			width: '100%',
			height: 'var(--y-scrollbar-size)'
		})
	])
])

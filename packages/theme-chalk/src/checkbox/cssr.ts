import { c, cB, cE, cM, flexCenter } from '@yy-craft/utils'

export const checkboxStyle = cB(
	'checkbox',
	() => {
		return {
			display: 'inline-flex',
			alignItems: 'center',
			cursor: 'pointer',
			userSelect: 'none'
		}
	},
	[
		c('&:hover', [
			cB('checkbox-box', {
				borderColor: 'var(--y-checkbox-border-color-hover)'
			})
		]),
		c('&:focus', [
			cB('checkbox-box', {
				boxShadow: 'var(--y-checkbox-box-shadow)',
				borderColor: 'var(--y-checkbox-border-color-hover)'
			})
		]),

		cE('icon', {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontSize: 'var(--y-checkbox-font-size)',
			backgroundColor: 'var(--y-transparent)',
			color: 'var(--y-transparent)',
			transition:
				'background-color var(--y-checkbox-icon-transition-time) var(--y-cubic-bezier-ease-in-out), color var(--y-checkbox-icon-transition-time) var(--y-cubic-bezier-ease-in-out)'
		}),

		cM('checked', [
			cB('checkbox-box', {
				borderColor: 'var(--y-checkbox-border-color-hover)'
			}),
			cE('icon', {
				backgroundColor: 'var(--y-checkbox-icon-bg-color)',
				color: 'var(--y-checkbox-icon-color)'
			})
		]),

		cE('label', {
			padding: 'var(--y-checkbox-label-padding)',
			fontSize: 'var(--y-checkbox-label-font-size)',
			boxSizing: 'border-box'
		}),

		cB('checkbox-box', {
			...flexCenter(),
			overflow: 'hidden',
			width: 'var(--y-checkbox-size)',
			height: 'var(--y-checkbox-size)',
			border: 'var(--y-checkbox-border)',
			boxSizing: 'border-box',
			borderRadius: 'var(--y-checkbox-border-radius)',
			transition:
				'box-shadow var(--y-checkbox-shadow-transition-time) var(--y-cubic-bezier-ease-in-out), border-color var(--y-checkbox-shadow-transition-time) var(--y-cubic-bezier-ease-in-out)'
		})
	]
)

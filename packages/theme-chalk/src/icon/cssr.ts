import { cB } from '@yy-ui/utils/src/cssr'

export const iconStyle = cB('icon', () => {
	return {
		display: 'inline-flex',
		verticalAlign: 'middle',
		width: '1em',
		height: '1em',
		color: 'var(--y-icon-color)',
		fontSize: 'var(--y-icon-size)',
		fill: 'currentColor'
	}
})

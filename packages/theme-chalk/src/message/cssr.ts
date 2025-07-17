import { c, cB, cE, cM, cVar } from '@yy-craft/utils'
import { fadeInHeightExpandTransition } from '../transition'
import { iconSwitchTransition } from '../transition/icon-switch.cssr'

export const messageStyle = c(null, [
	c('@keyframes loading', {
		from: {
			transform: 'rotate(0deg)'
		},
		to: {
			transform: 'rotate(360deg)'
		}
	}),
	cB(
		'message-provider',
		{
			position: 'fixed',
			height: '0',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			zIndex: '6000',
			top: '12px',
			left: 0,
			right: 0
		},
		[
			cM('top-left', {
				left: '12px',
				alignItems: 'flex-start'
			}),

			cM('top-right', {
				right: '12px',
				alignItems: 'flex-end'
			}),

			cM('bottom', {
				top: 'unset',
				bottom: '12px',
				justifyContent: 'flex-end'
			}),

			cM('bottom-left', {
				top: 'unset',
				bottom: '12px',
				justifyContent: 'flex-end',
				left: '12px',
				alignItems: 'flex-start'
			}),
			cM('bottom-right', {
				top: 'unset',
				bottom: '12px',
				justifyContent: 'flex-end',
				left: '12px',
				alignItems: 'flex-end'
			})
		]
	),
	cB(
		'message',
		{
			display: 'flex',
			zIndex: '0',
			margin: cVar('margin'),
			transformOrigin: 'top center'
		},
		[
			fadeInHeightExpandTransition({
				overflow: 'visible',
				originalTransition: `transform ${cVar('transitionDuration')} ${cVar(
					'transitionTimingFuntion'
				)}`,
				enterToProps: {
					transform: 'scale(1)'
				},
				leaveToProps: {
					transform: 'scale(0.85)'
				}
			}),

			cB(
				'message-block',
				{
					boxSizing: 'border-box',
					display: 'flex',
					alignItems: 'center',
					transition: `color ${cVar('transitionDuration')} ${cVar('transitionTimingFuntion')},
					box-shadow ${cVar('transitionDuration')} ${cVar('transitionTimingFuntion')},
					background-color ${cVar('transitionDuration')} ${cVar('transitionTimingFuntion')},
					opacity ${cVar('transitionDuration')} ${cVar('transitionTimingFuntion')},
					transform ${cVar('transitionDuration')} ${cVar('transitionTimingFuntion')},
					margin-bottom ${cVar('transitionDuration')} ${cVar('transitionTimingFuntion')};`,
					padding: cVar('padding'),
					borderRadius: cVar('borderRadius'),
					flexWrap: 'nowrap',
					overflow: 'hidden',
					maxWidth: cVar('maxWidth'),
					color: cVar('textColor'),
					backgroundColor: cVar('backgroundColor'),
					boxShadow: cVar('boxShadow')
				},
				[
					cE(
						'icon',
						{
							position: 'relative',
							margin: cVar('iconMargin'),
							height: cVar('iconSize'),
							width: cVar('iconSize'),
							fontSize: cVar('iconSize'),
							flexShrink: 0
						},
						[
							cB(
								'icon',
								{
									position: 'absolute',
									top: '0',
									left: '0',
									bottom: '0',
									right: '0'
								},
								[c('> *', [iconSwitchTransition()])]
							),

							['success', 'warning', 'error', 'info'].map((type) => {
								return cM(type, [
									c('> *', {
										color: cVar(type + 'IconColor')
									})
								])
							}),

							cM('loading', [
								c('> *', {
									color: cVar('successIconColor')
								}),

								cB('icon', {
									animation: 'loading 1.5s linear infinite'
								})
							])

							// cM('warning', [
							//   c('> *', {
							//     color: cVar('warningIconColor')
							//   })
							// ]),

							// cM('error', [
							//   c('> *', {
							//     color: cVar('errorIconColor')
							//   })
							// ]),

							// cM('info', [
							//   c('> *', {
							//     color: cVar('infoIconColor')
							//   })
							// ])
						]
					),
					cE('content', {
						display: 'inline-block',
						lineHeight: cVar('lineHeight'),
						fontSize: cVar('fontSize')
					})
				]
			)
		]
	)
])

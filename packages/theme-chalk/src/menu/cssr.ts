import { c, cB, cE, cM, cNotM, cVar } from '@yy-craft/utils'
import { fadeInHeightExpandTransition } from '../transition'

export const menuStyle = c(null, [
	cB(
		'menu',
		{
			fontSize: cVar('fontSize'),
			transition: `width ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')}`
		},
		[
			cM('collapsed', [
				cB('menu-item', { paddingRight: '0px', boxSizing: 'border-box' }, [
					// cE('content-main', { opacity: 0 }),
					cE('content-expand', { opacity: 0 })
				])
			]),

			cB(
				'menu-item',
				{
					position: 'relative',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					backgroundColor: cVar('backgroundColor'),
					borderRadius: cVar('borderRadius'),
					marginTop: cVar('marginTop'),
					color: cVar('textColor'),
					transition: `color ${cVar('transitionDuration')} ${cVar(
						'transitionTimingFunction'
					)}, background-color ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')}`,
					height: cVar('itemHeight'),
					cursor: 'pointer',
					paddingRight: '18px',
					boxSizing: 'border-box'
				},
				[
					fadeInHeightExpandTransition(),

					cNotM('group-title', [
						c('&:hover', {
							backgroundColor: cVar('backgroundColorHover')
						}),

						cM('selected', {
							backgroundColor: cVar('backgroundColorSelected')
						}),

						cM('active', {
							color: cVar('textColorSelected')
						})
					]),

					cM('group-title', {
						fontSize: '.93em',
						color: cVar('groupTextColor'),
						cursor: 'default'
					}),

					cE(
						'indent',
						{
							display: 'flex'
						},
						[
							cE('indent-box', {
								width: '16px',
								transition: `width ${cVar('transitionDuration')} ${cVar(
									'transitionTimingFunction'
								)}`
							})
						]
					),

					cE(
						'content',
						{
							width: '100%',
							display: 'grid',
							gridTemplateAreas: '"icon main expand"',
							gridTemplateColumns: 'auto 1fr auto',
							alignItems: 'center',
							overflow: 'hidden'
						},
						[
							cE('content-icon', {
								gridArea: 'icon',
								marginRight: '8px',
								fontSize: '20px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transition: `font-size ${cVar('transitionDuration')} ${cVar(
									'transitionTimingFunction'
								)},margin-right ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')}`
							}),
							cE(
								'content-main',
								{
									gridArea: 'main',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
									lineHeight: '1.75',
									transition: `opacity ${cVar('transitionDuration')} ${cVar(
										'transitionTimingFunction'
									)}`
								},
								[
									c(
										'a',
										{
											outline: 'none',
											textDecoration: 'none',
											transition: `color ${cVar('transitionDuration')} ${cVar(
												'transitionTimingFunction'
											)}`,
											color: cVar('textColor')
										},
										[
											c('&::before', {
												content: '""',
												position: 'absolute',
												top: 0,
												left: 0,
												right: 0,
												bottom: 0
											})
										]
									)
								]
							),
							cE(
								'content-expand',
								{
									gridArea: 'expand',
									transition: `transform ${cVar('transitionDuration')} ${cVar(
										'transitionTimingFunction'
									)},opacity ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')}`,
									fontSize: '20px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									transform: 'rotate(-180deg)'
								},
								[
									cM('expanded', {
										transform: 'rotate(0)'
									})
								]
							)
						]
					)
				]
			)
		]
	)
])

import { c, cB, cM, cVar } from '@yy-ui/utils'

export const popoverStyle = cB(
  'popover',
  {
    position: 'fixed',
    zIndex: 2000,
    boxShadow: cVar('boxShadow'),
    borderRadius: cVar('borderRadius'),
    fontSize: cVar('fontSize'),
    color: cVar('textColor'),
    transition: `
		box-shadow ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
		background-color ${cVar('transitionDuration')} ${cVar(
      'transitionTimingFunction'
    )},
		color ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')}`
  },
  [
    cM('placement-top', [
      cB('popover-arrow', {
        bottom: '-5px',
        transform: 'translateX(-50%) rotate(45deg)'
      })
    ]),
    cM('placement-bottom', [
      cB('popover-arrow', {
        top: '-5px',
        transform: 'translateX(-50%) rotate(45deg)'
      })
    ]),
    cM('placement-left', [
      cB('popover-arrow', {
        right: '-5px',
        transform: 'translateY(-50%) rotate(45deg)'
      })
    ]),
    cM('placement-right', [
      cB('popover-arrow', {
        left: '-5px',
        transform: 'translateY(-50%) rotate(45deg)'
      })
    ]),
    cB('popover-arrow', {
      display: 'block',
      position: 'absolute',
      width: '10px',
      height: '10px',
      backgroundColor: cVar('backgroundColor'),
      boxShadow: cVar('boxShadow')
    }),

    cB('popover-content', {
      position: 'relative',
      padding: cVar('padding'),
      backgroundColor: cVar('backgroundColor'),
      borderRadius: cVar('borderRadius')
    }),

    c('&.popover-transition-enter-from, &.popover-transition-leave-to', {
      opacity: 0,
      transform: 'scale(.85)'
    }),
    c('&.popover-transition-enter-to, &.popover-transition-leave-from', {
      transform: ' scale(1)',
      opacity: 1
    }),
    c('&.popover-transition-enter-active', {
      transition: `
				box-shadow ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
				background-color ${cVar('transitionDuration')} ${cVar(
        'transitionTimingFunction'
      )},
				color ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
				opacity ${cVar('transitionDuration1')} ${cVar('transitionTimingFunction1')},
				transform ${cVar('transitionDuration1')} ${cVar('transitionTimingFunction1')}`
    }),
    c('&.popover-transition-leave-active', {
      transition: `
				box-shadow ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
				background-color ${cVar('transitionDuration')} ${cVar(
        'transitionTimingFunction'
      )},
				color ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
				opacity ${cVar('transitionDuration1')} ${cVar('transitionTimingFunction2')},
				transform ${cVar('transitionDuration1')} ${cVar('transitionTimingFunction2')}`
    })
  ]
)

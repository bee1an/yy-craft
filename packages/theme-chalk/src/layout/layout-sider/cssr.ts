import { cB, cE, cM, cVar } from '@yy-ui/utils'

export const layoutSiderStyle = cB(
  'layout-sider',
  {
    position: 'relative',
    flexShrink: '0',
    boxSizing: 'border-box',
    zIndex: '1',
    color: cVar('textColor'),
    backgroundColor: cVar('backgroundColor'),
    display: 'flex',
    justifyContent: 'flex-end',
    transition: `width ${cVar('transitionDuration')} ${cVar(
      'transitionTimingFunction'
    )},color ${cVar('transitionDuration')} ${cVar(
      'transitionTimingFunction'
    )},background-color ${cVar('transitionDuration')} ${cVar(
      'transitionTimingFunction'
    )},border-color ${cVar('transitionDuration')} ${cVar(
      'transitionTimingFunction'
    )},min-width ${cVar('transitionDuration')} ${cVar(
      'transitionTimingFunction'
    )},max-width ${cVar('transitionDuration')} ${cVar(
      'transitionTimingFunction'
    )}`
  },
  [
    cM('bordered', {
      borderRight: '1px solid ' + cVar('borderColor')
    }),

    cE(
      'content',
      {
        transition: `opacity ${cVar('transitionDuration')} ${cVar(
          'transitionTimingFunction'
        )}`
      },
      [cM('hide', { opacity: '0' })]
    ),

    cE(
      'collapsed-trigger',
      {
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translate(50%, -50%)',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: cVar('collapsedTriggerBackgroundColor'),
        border: '1px solid ' + cVar('collapsedTriggerBorderColor'),
        cursor: 'pointer',
        transformOrigin: 'center center',
        transition: `transform ${cVar('transitionDuration')} ${cVar(
          'transitionTimingFunction'
        )},color ${cVar('transitionDuration')} ${cVar(
          'transitionTimingFunction'
        )},background-color ${cVar('transitionDuration')} ${cVar(
          'transitionTimingFunction'
        )},border-color ${cVar('transitionDuration')} ${cVar(
          'transitionTimingFunction'
        )},right ${cVar('transitionDuration')} ${cVar(
          'transitionTimingFunction'
        )}`
      },
      [
        cM('collapsed', {
          transform: 'translate(50%, -50%) rotate(-180deg)'
        })
      ]
    )
  ]
)

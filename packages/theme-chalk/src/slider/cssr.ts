import { cB, cE, cVar } from '@yy-craft/utils'

export const sliderStyle = cB('slider', [
  cE('track', {
    position: 'relative',
    width: '100%',
    height: cVar('height'),
    borderRadius: cVar('borderRadius'),
    backgroundColor: cVar('bgColor'),
    cursor: 'pointer',
    transition: `height ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
    border-radius ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
    background-color ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')}`,
  }, [
    cE('bar', {
      height: '100%',
      borderRadius: cVar('borderRadius'),
      backgroundColor: cVar('barBgColor'),
      transition: `border-radius ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
      background-color ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')}`,
    }),

    cE('trigger', {
      position: 'absolute',
      width: cVar('triggerWidth'),
      height: cVar('triggerHeight'),
      top: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor: cVar('triggerBgColor'),
      boxShadow: cVar('triggerBoxShadow'),
      cursor: 'pointer',
      transition: `width ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
      height ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
      background-color ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
      box-shadow ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')}`,
    }),
  ]),
])

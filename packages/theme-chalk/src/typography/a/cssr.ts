import { cB, cVar } from '@yy-craft/utils'

export const aStyle = cB('a', {
  cursor: 'pointer',
  transition: `
    color ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')},
    text-decoration-color ${cVar('transitionDuration')} ${cVar('transitionTimingFunction')}
  `,
  color: cVar('textColor'),
  textDecorationColor: cVar('textColor'),
})

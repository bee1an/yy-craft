import { c, cB, cE, cM, cVar } from '@yy-craft/utils'

export const cardStyle = cB(
  'card',
  {
    width: '100%',
    borderRadius: cVar('borderRadius'),
    fontSize: cVar('cardFontSize'),
    transition: `
      color ${cVar('transitionTime')} ${cVar('cubicBezierEaseInOut')}, 
      background-color ${cVar('transitionTime')} ${cVar('cubicBezierEaseInOut')}, 
      box-shadow ${cVar('transitionTime')} ${cVar('cubicBezierEaseInOut')}, 
      border-color ${cVar('transitionTime')} ${cVar('cubicBezierEaseInOut')}
    `,
    boxSizing: 'border-box',
  },
  [
    cM('bordered', {
      border: `1px solid ${cVar('borderColor')}`,
      boxSizing: 'border-box',
    }),

    cM('hoverable', [
      c('&:hover', {
        boxShadow: cVar('boxShadow'),
      }),
    ]),

    cM('content-soft-segmented', [
      c('>', [
        cB('card-content', {
          paddingTop: cVar('paddingTop'),
          paddingLeft: 0,
          paddingRight: 0,
          margin: `0 ${cVar('paddingRight')}0 ${cVar('paddingLeft')}`,
          borderTop: `1px solid ${cVar('borderColor')}`,
          boxSizing: 'border-box',
        }),
      ]),
    ]),
    cM('content-segmented', [
      c('>', [
        cB('card-content', {
          paddingTop: cVar('paddingTop'),
          borderTop: `1px solid ${cVar('borderColor')}`,
          boxSizing: 'border-box',
        }),
      ]),
    ]),
    cM('footer-soft-segmented', [
      c('>', [
        cB('card-footer', {
          paddingTop: cVar('paddingTop'),
          paddingLeft: 0,
          paddingRight: 0,
          margin: `0 ${cVar('paddingRight')}0 ${cVar('paddingLeft')}`,
          borderTop: `1px solid ${cVar('borderColor')}`,
          boxSizing: 'border-box',
        }),
      ]),
    ]),
    cM('footer-segmented', [
      c('>', [
        cB('card-footer', {
          paddingTop: cVar('paddingTop'),
          borderTop: `1px solid ${cVar('borderColor')}`,
          boxSizing: 'border-box',
        }),
      ]),
    ]),
    cM('action-segmented', [
      c('>', [
        cB('card-action', {
          borderTop: `1px solid ${cVar('borderColor')}`,
          boxSizing: 'border-box',
        }),
      ]),
    ]),

    c('>', [
      cB('card-cover', {
        overflow: 'hidden',
        width: '100%',
        borderRadius: `${cVar('borderRadius')} ${cVar('borderRadius')} 0 0`,
      }),

      cB(
        'card-header',
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `${cVar('paddingTop')} ${cVar('paddingRight')} ${cVar(
            'paddingBottom',
          )} ${cVar('paddingLeft')}`,
          boxSizing: 'border-box',
        },
        [
          cE('title', {
            fontSize: cVar('titleFontSize'),
            fontWeight: cVar('titleFontWeight'),
          }),
        ],
      ),

      cB('card-content', {
        padding: `0 ${cVar('paddingRight')} ${cVar('paddingBottom')} ${cVar('paddingLeft')}`,
        boxSizing: 'border-box',
      }),

      cB('card-footer', {
        padding: `0 ${cVar('paddingRight')} ${cVar('paddingBottom')} ${cVar('paddingLeft')}`,
        boxSizing: 'border-box',
      }),

      cB('card-action', {
        padding: `${cVar('paddingTop')} ${cVar('paddingRight')} ${cVar(
          'paddingBottom',
        )} ${cVar('paddingLeft')}`,
        backgroundColor: cVar('actionBackgroundColor'),
        boxSizing: 'border-box',
      }),
    ]),
  ],
)

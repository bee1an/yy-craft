import { c, cB, cE, cM, cVar } from '@yy-ui/utils'
import { fadeInHeightExpandTransition } from '@yy-ui/theme-chalk'

export const menuStyle = cB(
  'menu',
  {
    fontSize: cVar('fontSize')
  },
  [
    fadeInHeightExpandTransition({
      duration: '.2s'
    }),

    cB(
      'menu-item',
      {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: cVar('backgroundColor'),
        borderRadius: cVar('borderRadius'),
        marginTop: cVar('marginTop'),
        color: cVar('textColor'),
        // transition: `color ${cVar('transitionDuration')} ${cVar(
        //   'transitionTimingFunction'
        // )}, background-color ${cVar('transitionDuration')} ${cVar(
        //   'transitionTimingFunction'
        // )}`,
        height: cVar('itemHeight'),
        cursor: 'pointer',
        paddingRight: '18px',
        boxSizing: 'border-box'
      },
      [
        c('&:hover', {
          backgroundColor: cVar('backgroundColorHover')
        }),

        cM('selected', {
          backgroundColor: cVar('backgroundColorSelected')
        }),

        cM('active', {
          color: cVar('textColorSelected')
        }),

        cE(
          'indent',
          {
            display: 'flex'
          },
          [
            cE('indent-box', {
              width: '16px'
            })
          ]
        ),

        cE(
          'content',
          {
            width: '100%',
            display: 'grid',
            gridTemplateAreas: '"icon main expand"',
            gridTemplateColumns: 'auto 1fr auto'
          },
          [
            cE('content-icon', {
              gridArea: 'icon',
              marginRight: '8px'
            }),
            cE('content-main', {
              gridArea: 'main'
            }),
            cE(
              'content-expand',
              {
                gridArea: 'expand',
                transition: `transform ${cVar('transitionDuration')} ${cVar(
                  'transitionTimingFunction'
                )}`,
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
    ),

    cB('menu-group', {
      display: 'flex',
      alignItems: 'center',
      marginTop: cVar('marginTop'),
      fontSize: '.93em',
      color: cVar('groupTextColor'),
      cursor: 'default',
      height: cVar('itemHeight')
    })
  ]
)

import { cB, cM } from '@yy-ui/utils'

export const popoverStyle = cB(
  'popover',
  {
    position: 'fixed',
    zIndex: 2000,
    boxShadow: '0 2px 12px 0 rgba(0, 0, 0, .2)',
    borderRadius: '4px'
  },
  [
    cM('placement-top', [
      cB('popover-arrow', {
        bottom: '-5px',
        left: '50%',
        transform: 'translateX(-50%) rotate(45deg)'
      })
    ]),
    cM('placement-bottom', [
      cB('popover-arrow', {
        top: '-5px',
        left: '50%',
        transform: 'translateX(-50%) rotate(45deg)'
      })
    ]),
    cM('placement-left', [
      cB('popover-arrow', {
        right: '-5px',
        top: '50%',
        transform: 'translateY(-50%) rotate(45deg)'
      })
    ]),
    cM('placement-right', [
      cB('popover-arrow', {
        left: '-5px',
        top: '50%',
        transform: 'translateY(-50%) rotate(45deg)'
      })
    ]),
    cB('popover-arrow', {
      display: 'block',
      position: 'absolute',
      width: '10px',
      height: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 12px 0 rgba(0, 0, 0, .2)'
    }),

    cB('popover-content', {
      position: 'relative',
      left: 0,
      top: 0,
      padding: '10px',
      backgroundColor: '#fff',
      borderRadius: '4px',
      fontSize: '14px'
    })
  ]
)

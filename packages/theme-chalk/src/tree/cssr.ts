import { c, cB, cE, cM } from '@yy-craft/utils'

export const treeStyle = c([
  c('@keyframes rotate', {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  }),
  cB('tree-node-wrapper', {
    padding: 'var(--y-tree-wrapper-padding)',
    boxSizing: 'border-box',
  }),
  cB(
    'tree-node',
    {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      padding: 'var(--y-tree-padding)',
      boxSizing: 'border-box',
      cursor: 'pointer',
    },
    [
      c('&:hover, &:active', {
        backgroundColor: 'var(--y-tree-background-color-hover)',
      }),
      cE(
        'border',
        {
          position: 'absolute',
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
          border: 'var(--y-tree-border)',
          boxSizing: 'border-box',
        },
        [
          cM('bottom', {
            position: 'absolute',
            bottom: 'var(--y-tree-bottom-border-pos)',
            right: '0',
            height: 'var(--y-tree-bottom-border-height)',
            border: 'unset',
            boxSizing: 'border-box',
            backgroundColor: 'var(--y-tree-bottom-border-background-color)',
          }),
        ],
      ),
      cE('text', {
        flex: 1,
        fontSize: 'var(--y-tree-text-font-size)',
      }),
      cM('expanded', [
        cB('tree-node-switcher', [
          cE('icon', [
            c('i', {
              transform: 'rotate(var(--y-tree-expanded-icon-rotate))',
            }),
          ]),
        ]),
      ]),
      cM('leaf', [
        cB('tree-node-switcher', [
          cE('icon', {
            color: 'transparent',
          }),
        ]),
      ]),
      cM('loading', [
        cB('tree-node-switcher', [
          cE('icon', {
            animation: 'rotate 2s linear infinite',
          }),
        ]),
      ]),
      cM('selected', {
        backgroundColor: 'var(--y-tree-selected-background-color)',
      }),
    ],
  ),
  cB('tree-node-indent', {
    width: 'var(--y-tree-indent-size)',
  }),
  cB('tree-node-switcher', [
    cE(
      'icon',
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'var(--y-tree-icon-size)',
        height: 'var(--y-tree-icon-size)',
        userSelect: 'none',
      },
      [
        c('i', {
          transition: 'transform var(--y-tree-icon-transition-time)',
        }),
      ],
    ),
  ]),
])

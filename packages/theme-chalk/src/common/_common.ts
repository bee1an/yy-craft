export default {
  fontWeight: '400',
  fontWeightStrong: '600',

  cubicBezierEaseInOut: 'cubic-bezier(.4, 0, .2, 1)',
  cubicBezierEaseOut: 'cubic-bezier(0, 0, .2, 1)',
  cubicBezierEaseIn: 'cubic-bezier(.4, 0, 1, 1)',

  borderRadius: '3px',
  borderRadiusSmall: '2px',

  fontSize: '14px',
  fontSizeMini: '12px',
  fontSizeTiny: '12px',
  fontSizeSmall: '14px',
  fontSizeMedium: '14px',
  fontSizeLarge: '15px',
  fontSizeHuge: '16px',

  lineHeight: '1.6',

  heightMini: '16px', // private now, it's too small
  heightTiny: '22px',
  heightSmall: '28px',
  heightMedium: '34px',
  heightLarge: '40px',
  heightHuge: '46px',
  transparent: 'transparent'
}

export type ThemeType<
  T extends {
    name: string
    vars: () => Record<string, string>
  } = {
    name: string
    vars: () => Record<string, string>
  }
> = ReturnType<T['vars']>

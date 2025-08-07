import commonVar from './_common'

const base = {
  neutralTextBase: '#000',
  neutralBody: '#fff',

  // primary
  primaryHover: '#c99b31',
  primaryDefault: '#b8860b',
  primaryActive: '#a3760d',

  // info
  infoHover: '#4098fc',
  infoDefault: '#2080f0',
  infoActive: '#1060c9',

  // error
  errorHover: '#de576d',
  errorDefault: '#d03050',
  errorActive: '#ab1f3f',

  // warning
  warningHover: '#fcb040',
  warningDefault: '#f0a020',
  warningActive: '#c97c10',

  // success
  successHover: '#36ad6a',
  successDefault: '#18a058',
  successActive: '#0c7a43',
}

const derived = {
  ...commonVar,

  // primary color
  primaryColor: base.primaryDefault,
  primaryColorHover: base.primaryHover,
  primaryColorPressed: base.primaryActive,
  // info color
  infoColor: base.infoDefault,
  infoColorHover: base.infoHover,
  infoColorPressed: base.infoActive,
  // success color
  successColor: base.successDefault,
  successColorHover: base.successHover,
  successColorPressed: base.successActive,
  // warning color
  warningColor: base.warningDefault,
  warningColorHover: base.warningHover,
  warningColorPressed: base.warningActive,
  // error color
  errorColor: base.errorDefault,
  errorColorHover: base.errorHover,
  errorColorPressed: base.errorActive,
  // text color
  textColorBase: base.neutralTextBase,
  textColor1: '#1F2225', // 31,34,37
  textColor2: '#333639', // 51,54,57
  textColor3: '#767C82', // 118,124,130
  textColor4: '#ffffff',

  bodyColor: base.neutralBody,
  hoverColor: '#f3f3f5',

  bgColor1: '#fafafc',

  codeBackgroundColor: '#F4F4F8', // 244, 244, 248

  buttonColor2: 'rgba(46, 51, 56, .05)',
  buttonColor2Hover: 'rgba(46, 51, 56, .09)',
  buttonColor2Pressed: 'rgba(46, 51, 56, .13)',

  borderColor: '#e0e0e6',
  borderColor1: '#efeff5',

  boxShadow1:
    '0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)',
  boxShadow2:
    '0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)',
  boxShadow3:
    '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)',

  cardActionBg: '#fafafc',
  checkboxBorderColor: '#dcdfe6',
  checkboxShadowColor: 'rgb(255, 165, 0, 0.3)',
}

export default derived

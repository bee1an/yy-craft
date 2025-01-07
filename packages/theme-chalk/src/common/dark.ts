import commonVar from './_common'

const base = {
  neutralTextBase: '#000',
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
  successActive: '#0c7a43'
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
  textColor1: '#1F2225',
  textColor2: '#333639',
  textColor3: '#767C82',
  codeBackgroundColor: '#F4F4F8', // 244, 244, 248
  buttonColor2: 'rgba(46, 51, 56, .05)',
  buttonColor2Hover: 'rgba(46, 51, 56, .09)',
  buttonColor2Pressed: 'rgba(46, 51, 56, .13)',

  borderColor: '#e0e0e6'
}

export default derived

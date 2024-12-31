import commonVar from './_common'

const base = {
  neutralTextBase: '#000',
  // primary
  primaryHover: '#7fe7c4',
  primaryDefault: '#63e2b7',
  primaryActive: '#5acea7',
  primarySuppl: 'rgb(42, 148, 125)',

  // info
  infoHover: '#8acbec',
  infoDefault: '#70c0e8',
  infoActive: '#66afd3',
  infoSuppl: 'rgb(56, 137, 197)',

  // error
  errorHover: '#e98b8b',
  errorDefault: '#e88080',
  errorActive: '#e57272',
  errorSuppl: 'rgb(208, 58, 82)',

  // warning
  warningHover: '#f5d599',
  warningDefault: '#f2c97d',
  warningActive: '#e6c260',
  warningSuppl: 'rgb(240, 138, 0)',

  // success
  successHover: '#7fe7c4',
  successDefault: '#63e2b7',
  successActive: '#5acea7',
  successSuppl: 'rgb(42, 148, 125)'
}

const derived = {
  ...commonVar,

  // primary color
  primaryColor: base.primaryDefault,
  primaryColorHover: base.primaryHover,
  primaryColorPressed: base.primaryActive,
  primaryColorSuppl: base.primarySuppl,
  // info color
  infoColor: base.infoDefault,
  infoColorHover: base.infoHover,
  infoColorPressed: base.infoActive,
  infoColorSuppl: base.infoSuppl,
  // success color
  successColor: base.successDefault,
  successColorHover: base.successHover,
  successColorPressed: base.successActive,
  successColorSuppl: base.successSuppl,
  // warning color
  warningColor: base.warningDefault,
  warningColorHover: base.warningHover,
  warningColorPressed: base.warningActive,
  warningColorSuppl: base.warningSuppl,
  // error color
  errorColor: base.errorDefault,
  errorColorHover: base.errorHover,
  errorColorPressed: base.errorActive,
  errorColorSuppl: base.errorSuppl,
  // text color
  textColorBase: base.neutralTextBase
}

export default derived

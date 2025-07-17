import commonVar from './_common'
import lightDerived from './light'

const base = {
	neutralTextBase: '#000',
	neutralBody: '#fff',
	// primary
	primaryHover: '#ffdd75',
	primaryDefault: '#ffd25a',
	primaryActive: '#e9b94c',
	// info
	infoHover: '#82baff',
	infoDefault: '#67aaff',
	infoActive: '#4f90e0',

	// error
	errorHover: '#f27a89',
	errorDefault: '#ea5a70',
	errorActive: '#d3445f',

	// warning
	warningHover: '#ffd97a',
	warningDefault: '#ffca55',
	warningActive: '#f0ad3a',

	// success
	successHover: '#73d395',
	successDefault: '#52ca8a',
	successActive: '#2eaa6a'
}

const derived = {
	...commonVar,
	...lightDerived,

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
	textColor1: '#D1D4D7',
	textColor2: '#767C82',
	textColor3: '#B9BFC4',
	textColor4: '#000000',

	bodyColor: base.neutralBody,
	hoverColor: '#0c0c0e',
	layoutFooterBg: '#121214',

	codeTextColor: 'rgba(255, 255, 255, 0.82)',
	codeBackgroundColor: 'rgba(255, 255, 255, 0.12)',

	buttonColor2: 'rgba(230, 235, 240, 0.08)',
	buttonColor2Hover: 'rgba(230, 235, 240, 0.12)',
	buttonColor2Pressed: 'rgba(230, 235, 240, 0.16)',

	borderColor: '#2d2d33',

	cardActionBg: '#2a2a2c',
	checkboxBorderColor: '#3a3d44',
	checkboxShadowColor: 'rgba(255, 200, 100, 0.25)'
}

export default derived

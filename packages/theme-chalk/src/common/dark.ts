import commonVar from './_common'
import lightDerived from './light'

// const base = {
// 	neutralTextBase: '#000',
// 	neutralBody: '#fff',
// 	// primary
// 	primaryHover: '#c99b31',
// 	primaryDefault: '#b8860b',
// 	primaryActive: '#a3760d',
// 	// info
// 	infoHover: '#4098fc',
// 	infoDefault: '#2080f0',
// 	infoActive: '#1060c9',

// 	// error
// 	errorHover: '#de576d',
// 	errorDefault: '#d03050',
// 	errorActive: '#ab1f3f',

// 	// warning
// 	warningHover: '#fcb040',
// 	warningDefault: '#f0a020',
// 	warningActive: '#c97c10',

// 	// success
// 	successHover: '#36ad6a',
// 	successDefault: '#18a058',
// 	successActive: '#0c7a43'
// }

const derived = {
	...commonVar,
	...lightDerived,
	textColor1: '#D1D4D7',
	textColor2: '#767C82',
	textColor3: '#B9BFC4',

	codeBackgroundColor: '#0B0B0F'
}

export default derived

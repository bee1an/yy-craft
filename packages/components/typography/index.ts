import { withInstall } from '@yy-craft/utils/src/with-install'
import A from './src/a'
import { H1, H2, H3, H4, H5, H6 } from './src/headlines'
import P from './src/p'
import Text from './src/text'

const aWithIntall = withInstall(A)
const h1WithIntall = withInstall(H1)
const h2WithIntall = withInstall(H2)
const h3WithIntall = withInstall(H3)
const h4WithIntall = withInstall(H4)
const h5WithIntall = withInstall(H5)
const h6WithIntall = withInstall(H6)
const pWithIntall = withInstall(P)
const textWithIntall = withInstall(Text)

export * from './src/a'
export * from './src/headlines'
export * from './src/p'
export * from './src/text'
export {
	aWithIntall,
	A,
	h1WithIntall,
	H1,
	h2WithIntall,
	H2,
	h3WithIntall,
	H3,
	h4WithIntall,
	H4,
	h5WithIntall,
	H5,
	h6WithIntall,
	H6,
	pWithIntall,
	P,
	textWithIntall,
	Text
}

declare module 'vue' {
	export interface GlobalComponents {
		YyA: typeof A
		YyH1: typeof H1
		YyH2: typeof H2
		YyH3: typeof H3
		YyH4: typeof H4
		YyH5: typeof H5
		YyH6: typeof H6
		YyP: typeof P
		YyText: typeof Text
	}
}

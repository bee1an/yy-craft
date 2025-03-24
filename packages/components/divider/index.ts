import { withInstall } from '@yy-ui/utils/src/with-install'
import Divider from './src/divider.vue'

const dividerWithInstall = withInstall(Divider)
export * from './src/divider'
export { Divider, dividerWithInstall }
export default Divider

declare module 'vue' {
	export interface GlobalComponents {
		YyDivider: typeof Divider
	}
}

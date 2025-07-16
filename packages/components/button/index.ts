import { withInstall } from '@yy-ui/utils/src/with-install'
import Button from './src/button.vue'

const buttonWithInstall = withInstall(Button)

export * from './src/button'
export { buttonWithInstall, Button }
export default Button

declare module 'vue' {
	export interface GlobalComponents {
		YyButton: typeof Button
	}
}

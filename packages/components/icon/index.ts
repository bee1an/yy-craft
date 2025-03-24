import { withInstall } from '@yy-ui/utils/src/with-install'
import Icon from './src/icon.vue'

const iconWithInstall = withInstall(Icon)

export * from './src/icon'
export { iconWithInstall, Icon }
export default Icon

declare module 'vue' {
	export interface GlobalComponents {
		YyIcon: typeof Icon
	}
}

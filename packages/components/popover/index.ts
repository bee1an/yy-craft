import { withInstall } from '@yy-craft/utils/src/with-install'
import Popover from './src/popover'

const popoverWithInstall = withInstall(Popover)
export * from './src/popover'
export { popoverWithInstall, Popover }
export default Popover

declare module 'vue' {
	export interface GlobalComponents {
		YyPopover: typeof Popover
	}
}

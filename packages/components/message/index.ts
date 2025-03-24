import type { App } from 'vue'
import { useMessage } from './src/use-message'

export * from './src/message'

export * from './src/use-message'

export const withInstall = () => {
	return {
		install: (app: App) => {
			useMessage._context = app._context
		}
	}
}
withInstall.useInstall = true
export { useMessage }

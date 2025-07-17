import { withInstall } from '@yy-craft/utils/src/with-install'
import ConfigProvider from './src/config-provider'

const configProviderWithInstall = withInstall(ConfigProvider)

export * from './src/config-provider'
export { configProviderWithInstall, ConfigProvider }
export default ConfigProvider

declare module 'vue' {
	export interface GlobalComponents {
		YyConfigProvider: typeof ConfigProvider
	}
}

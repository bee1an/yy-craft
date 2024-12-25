import { withInstall } from '@yy-ui/utils'
import Icon from './src/icon.vue'

const IconWithInstall = withInstall(Icon)

export * from './src/icon'
export { IconWithInstall, Icon }
export default Icon

declare module 'vue' {
  export interface GlobalComponents {
    YyIcon: typeof Icon
  }
}

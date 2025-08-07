import { withInstall } from '@yy-craft/utils/src/with-install'
import Icon from './src/icon.vue'

const iconWithInstall = withInstall(Icon)

export * from './src/icon'
export { Icon, iconWithInstall }
export default Icon

declare module 'vue' {
  export interface GlobalComponents {
    YyIcon: typeof Icon
  }
}

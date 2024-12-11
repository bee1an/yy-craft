import { withInstall } from '@yy-ui/utils'
import _Icon from './src/icon.vue'

const Icon = withInstall(_Icon)

export default Icon

declare module 'vue' {
  export interface GlobalComponents {
    YyIcon: typeof _Icon
  }
}

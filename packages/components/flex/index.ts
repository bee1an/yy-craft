import { withInstall } from '@yy-craft/utils/src/with-install'
import Flex from './src/flex.vue'

const flexWithInstall = withInstall(Flex)

export * from './src/flex'
export { Flex, flexWithInstall }
export default Flex

declare module 'vue' {
  export interface GlobalComponents {
    YyFlex: typeof Flex
  }
}

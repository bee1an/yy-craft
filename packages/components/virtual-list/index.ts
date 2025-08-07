import { withInstall } from '@yy-craft/utils/src/with-install'
import VirtualList from './src/virtual-list'

const virtualListWithInstall = withInstall(VirtualList)

export * from './src/virtual-list'
export { VirtualList, virtualListWithInstall }
export default VirtualList

declare module 'vue' {
  export interface GlobalComponents {
    YyVirtualList: typeof VirtualList
  }
}

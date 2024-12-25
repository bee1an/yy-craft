import { withInstall } from '@yy-ui/utils'
import VirtualList from './src/virtual-list'

const VirtualListWithInstall = withInstall(VirtualList)

export * from './src/virtual-list'
export { VirtualListWithInstall, VirtualList }
export default VirtualList

declare module 'vue' {
  export interface GlobalComponents {
    YyVirtualList: typeof VirtualList
  }
}

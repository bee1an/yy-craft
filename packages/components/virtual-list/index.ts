import { withInstall } from '@yy-ui/utils'
import VirtualList from './src/virtual-list'

const virtualListWithInstall = withInstall(VirtualList)

export * from './src/virtual-list'
export { virtualListWithInstall, VirtualList }
export default VirtualList

declare module 'vue' {
  export interface GlobalComponents {
    YyVirtualList: typeof VirtualList
  }
}

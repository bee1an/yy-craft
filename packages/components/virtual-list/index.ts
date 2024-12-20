import { withInstall } from '@yy-ui/utils'
import _VirtualList from './src/virtual-list'

const VirtualList = withInstall(_VirtualList)

export * from './src/virtual-list'
export default VirtualList

declare module 'vue' {
  export interface GlobalComponents {
    YyVirtualList: typeof _VirtualList
  }
}

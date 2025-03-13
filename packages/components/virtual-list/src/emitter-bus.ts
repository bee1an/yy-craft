import { EventEmitter } from '@yy-ui/utils/src/eventEmitter'

export type VirtualListEvents = {
  /** 渲染完成 */
  renderComplete: []
  /** 触发滚动 */
  scroll: [
    {
      scrollSize: number
      maxScrollSize: number
    }
  ]
  /** 数据变化 */
  dataChange: [any[]]
}

export const emitter = new EventEmitter<VirtualListEvents>()

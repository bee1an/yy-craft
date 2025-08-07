import { EventEmitter } from '@yy-craft/utils/src/eventEmitter'

export interface VirtualListEvents {
  /** 渲染完成 */
  renderComplete: []
  /** 触发滚动 */
  scroll: [
    {
      scrollSize: number
      maxScrollSize: number
    },
  ]
  /** 数据变化 */
  dataChange: [any[]]
}

export const emitter = new EventEmitter<VirtualListEvents>()

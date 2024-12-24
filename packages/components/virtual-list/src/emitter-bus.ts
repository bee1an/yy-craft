import { EventEmitter } from '@yy-ui/utils'

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
}

export const emitter = new EventEmitter<VirtualListEvents>()

import { h, nextTick, render, VNode } from 'vue'
import MessageProvider from './message-provider'
import Message from './message'

export type MessagePlacement =
  | 'top'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

// 位置
const placementsVnode: Record<MessagePlacement, null | VNode> = {
  top: null,
  bottom: null,
  'top-left': null,
  'top-right': null,
  'bottom-left': null,
  'bottom-right': null
}

export type MessageOptions = {
  type?: 'success' | 'warning' | 'info' | 'error'
  placement?: MessagePlacement
}

export const useMessage = () => {
  const message = (content: string, options?: MessageOptions) => {
    const { placement = 'top' } = options || {}
    const container = document.createElement('div')

    const placementVnode = placementsVnode[placement]

    if (!placementVnode) {
      placementsVnode[placement] = h(
        MessageProvider,
        {
          onVnodeBeforeMount() {}
        },
        {
          default: () => h(Message)
        }
      )
      /* 
				FIXME: https://github.com/vuejs/core/pull/12195
				跟踪这个问题，如果修复了，就可以直接使用 render(vnode, document.body)
			*/
      nextTick(() => {
        render(placementsVnode[placement], container)
        document.body.appendChild(container.firstElementChild!)
      })
    } else {
      nextTick(() => {
        render(h(Message), container)
        placementVnode.el!.appendChild(container.firstElementChild!)
      })
    }
  }

  return {
    message
  }
}

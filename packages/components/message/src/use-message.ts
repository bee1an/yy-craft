import { AppContext, h, reactive, render, VNode } from 'vue'
import MessageProvider from './message-provider'
import Message, { MessageProps } from './message'
import { createId } from '@yy-ui/utils'

export type MessagePlacement =
  | 'top'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

type MessageProviderRecorder = {
  borrower: HTMLDivElement
  children: (() => VNode)[]
  vNode: VNode
}

const providersRecorder: Partial<
  Record<MessagePlacement, MessageProviderRecorder>
> = {}

export type MessageOptions = {
  placement?: MessagePlacement
} & Partial<Omit<MessageProps, 'content'>>

export type MessageReturn = {
  destroy: () => void
  content: MessageProps['content']
  type: MessageProps['type']
}

export const useMessage = (_context?: AppContext) => {
  const message = (
    content: MessageProps['content'],
    options?: MessageOptions,
    __context?: AppContext
  ): MessageReturn => {
    const { placement = 'top', ..._props } = options || {}

    const placementVnode = providersRecorder[placement]

    const props = { content, ..._props }
    props.id ??= createId()

    const messageVNode = () =>
      h(Message, {
        ...props,
        key: props.id,
        onDestroy: () => {
          const provider = providersRecorder[placement]!

          const idx = provider.children.indexOf(messageVNode)

          if (idx !== -1) {
            provider.children.splice(idx, 1)

            if (provider.children.length === 0) {
              render(null, provider.borrower)

              Reflect.deleteProperty(providersRecorder, placement)
            }
          }
        }
      })

    if (!placementVnode) {
      const borrower = document.createElement('div')
      const children = reactive([messageVNode])
      const providerVNode = h(MessageProvider, { children })
      const context = __context || _context || useMessage._context
      context && (providerVNode.appContext = context)
      providersRecorder[placement] = {
        children,
        vNode: providerVNode,
        borrower
      }

      render(providerVNode, borrower)
      document.body.appendChild(borrower.firstElementChild as HTMLElement)
    } else {
      placementVnode.children.push(messageVNode)
    }

    const findMessageVNode = () => {
      if (!providersRecorder[placement]) return
      const children = providersRecorder[placement].vNode.component!.exposed!
        .childrenCpt.value as VNode[]

      return children.find(item => item.props!.id === props.id)
    }

    return {
      /** 销毁 */
      destroy: () => {
        findMessageVNode()!.component!.exposed!.visible.value = false
      },
      /** 消息内容 */
      get content() {
        return findMessageVNode()!.component!.exposed!.content.value
      },
      set content(val) {
        findMessageVNode()!.component!.exposed!.content.value = val
      },
      /** 消息类型 */
      get type() {
        return findMessageVNode()!.component!.exposed!.type.value
      },
      set type(val) {
        findMessageVNode()!.component!.exposed!.type.value = val
      }
    }
  }

  message.success = (...args: Parameters<typeof message>) =>
    message(args[0], { ...args[1], type: 'success' }, args[2])

  message.error = (...args: Parameters<typeof message>) =>
    message(args[0], { ...args[1], type: 'error' }, args[2])

  message.warning = (...args: Parameters<typeof message>) =>
    message(args[0], { ...args[1], type: 'warning' }, args[2])

  message.info = (...args: Parameters<typeof message>) =>
    message(args[0], { ...args[1], type: 'info' }, args[2])

  message.loading = (...args: Parameters<typeof message>) =>
    message(args[0], { ...args[1], type: 'loading' }, args[2])

  return { message }
}
useMessage._context = null as null | AppContext

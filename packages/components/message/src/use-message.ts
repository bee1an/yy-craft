import { type AppContext, h } from 'vue'
import Message, { type MessageProps } from './message'
import { CreateNamespace } from '@yy-ui/utils/src/create'
import { createId } from '@yy-ui/utils/src/tools'
import { useVNodeProvider, type VNodeProviderInstance } from '@yy-ui/composables'
import { YProvider } from '../../_internal/provider'

export type MessagePlacement =
	| 'top'
	| 'bottom'
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right'

const providersRecorder: Partial<Record<MessagePlacement, VNodeProviderInstance>> = {}

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

					const surplusChildren = provider.unmountChild(messageVNode)

					if (surplusChildren.length === 0) {
						provider.unmount()
						Reflect.deleteProperty(providersRecorder, placement)
					}
				}
			})

		if (!placementVnode) {
			const bem = new CreateNamespace('message-provider')

			const provider = useVNodeProvider(
				YProvider,
				{ class: [bem.b().value, bem.m(placement).value] },
				__context || _context || useMessage._context
			)

			providersRecorder[placement] = provider

			document.body.appendChild(provider.el)
		}

		providersRecorder[placement]!.mountChild(messageVNode)

		const findMessageVNode = () => {
			const provider = providersRecorder[placement]

			if (!provider) return
			const children = provider.children

			return children.find((item) => item.props!.id === props.id)
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

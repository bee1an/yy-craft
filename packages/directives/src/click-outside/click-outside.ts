import type { AnyFn } from '@yy-ui/utils/src/types'
import type { Directive } from 'vue'
import { useEventListener } from '@yy-ui/composables/use-event-listener'

const nodeList = new Map<
	HTMLElement,
	{
		handler: () => void
		cleanup?: () => void
	}
>()

export const clickOutside: Directive<HTMLElement, AnyFn> = {
	beforeMount(el, binding) {
		let startClick: any
		const stopHandler1 = useEventListener(document, 'mousedown', (event) => (startClick = event))
		const stopHandler2 = useEventListener(document, 'mouseup', (event) => {
			nodeList.forEach(({ handler }, el) => {
				const mouseUpTarget = event.target as Node
				const mouseDownTarget = startClick?.target as Node

				// 鼠标按下与鼠标抬起都不是目标元素子元素，则触发事件
				if (el.contains(mouseUpTarget) || el.contains(mouseDownTarget)) {
					return
				}

				handler()
			})
		})

		nodeList.set(el, {
			handler: binding.value,
			cleanup: () => {
				stopHandler1()
				stopHandler2()
			}
		})
	},
	updated: (el, binding) => {
		const { cleanup } = nodeList.get(el) || {}
		nodeList.set(el, {
			handler: binding.value,
			cleanup
		})
	},
	unmounted: (el) => {
		nodeList.get(el)?.cleanup?.()
		nodeList.delete(el)
	}
}

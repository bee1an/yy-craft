import { useEventListener } from '@yy-ui/composables/use-event-listener'
import type { AnyFn } from '@yy-ui/utils/src/types'
import type { Directive } from 'vue'

const nodeList = new Map<
	HTMLElement,
	{
		handler: () => void
	}
>()

let startClick: any
useEventListener(document, 'mousedown', (event) => (startClick = event))
useEventListener(document, 'mouseup', (event) => {
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

export const clickOutside: Directive<HTMLElement, AnyFn> = {
	beforeMount(el, binding) {
		nodeList.set(el, {
			handler: binding.value
		})
	},
	updated: (el, binding) => {
		nodeList.set(el, {
			handler: binding.value
		})
	},
	unmounted: (el) => {
		nodeList.delete(el)
	}
}

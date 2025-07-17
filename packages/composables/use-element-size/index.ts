import type { ElRef } from '@yy-craft/utils/src/types'
import { ref } from 'vue'
import { type UseResizeObserverOptions, useResizeObserver } from '../use-resize-observer'

export const useElementSize = (target: ElRef, options: UseResizeObserverOptions = {}) => {
	const width = ref(0),
		height = ref(0)

	const stop = useResizeObserver(
		target,
		() => {
			width.value = target.value!.offsetWidth
			height.value = target.value!.offsetHeight
		},
		options
	)

	return { width, height, stop }
}

import type { ElRef } from '@yy-craft/utils/src/types'
import type { UseResizeObserverOptions } from '../use-resize-observer'
import { ref } from 'vue'
import { useResizeObserver } from '../use-resize-observer'

export function useElementSize(
  target: ElRef,
  options: UseResizeObserverOptions = {},
) {
  const width = ref(0)
  const height = ref(0)

  const stop = useResizeObserver(
    target,
    () => {
      width.value = target.value!.offsetWidth
      height.value = target.value!.offsetHeight
    },
    options,
  )

  return { width, height, stop }
}

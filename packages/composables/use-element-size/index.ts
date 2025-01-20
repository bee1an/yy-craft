import { ElRef } from '@yy-ui/utils/src/types'
import {
  useResizeObserver,
  UseResizeObserverOptions
} from '../use-resize-observer'
import { ref } from 'vue'

export const useElementSize = (
  target: ElRef,
  options: UseResizeObserverOptions = {}
) => {
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

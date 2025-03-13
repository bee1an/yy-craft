import { ref } from 'vue'
import { useEventListener } from '../use-event-listener'

export const useWindowSize = () => {
  const width = ref(Number.POSITIVE_INFINITY)
  const height = ref(Number.POSITIVE_INFINITY)

  const update = () => {
    if (window) {
      width.value = window.document.documentElement.clientWidth
      height.value = window.document.documentElement.clientHeight
    }
  }

  update()

  useEventListener(window, 'resize', update)

  return { width, height }
}

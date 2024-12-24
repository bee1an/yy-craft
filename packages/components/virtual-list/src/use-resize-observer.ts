import { onMounted, onUnmounted, Ref } from 'vue'

/** unuse */
export const useResizeObserver = (
  visibleZone: Ref<HTMLDivElement | null>,
  onResize: (entry: ResizeObserverEntry[]) => void
) => {
  const resizeObserver = new ResizeObserver(onResize)

  onMounted(() => resizeObserver.observe(visibleZone.value!))

  onUnmounted(resizeObserver.disconnect)
}

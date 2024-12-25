import { onMounted, onUnmounted, Ref } from 'vue'

/** 监听尺寸变化 */
export const useResizeObserver = (
  visibleZone: Ref<HTMLDivElement | null>,
  onResize: (entry: ResizeObserverEntry[]) => void
) => {
  const resizeObserver = new ResizeObserver(onResize)

  onMounted(() => resizeObserver.observe(visibleZone.value!))

  onUnmounted(resizeObserver.disconnect)
}

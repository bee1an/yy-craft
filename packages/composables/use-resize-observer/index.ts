import { onMounted, onUnmounted, ShallowRef } from 'vue'

/** 监听尺寸变化 */
export const useResizeObserver = (
  target: Readonly<ShallowRef<Element | null>>,
  onResize: (entry: ResizeObserverEntry[]) => void
) => {
  const resizeObserver = new ResizeObserver(onResize)

  onMounted(() => resizeObserver.observe(target.value!))

  onUnmounted(resizeObserver.disconnect)
}

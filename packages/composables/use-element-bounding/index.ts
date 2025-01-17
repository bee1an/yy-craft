import { ref, ShallowRef } from 'vue'
import { useResizeObserver } from '../use-resize-observer'
import { useMutationObserver } from '../use-mutation-observer'
import { useEventListener } from '../use-event-listener'

/** 参考: https://github.com/vueuse/vueuse/blob/main/packages/core/useElementBounding/index.ts */

export type UseElementBoundingOptions = {
  /**
   * Listen to window resize event
   *
   * @default true
   */
  windowResize?: boolean
  /**
   * Listen to window scroll event
   *
   * @default true
   */
  windowScroll?: boolean
}

export const useElementBounding = (
  /** 监听对象 */
  target: Readonly<ShallowRef<HTMLElement | null>>,
  /** 参数 */
  options?: UseElementBoundingOptions
) => {
  const { windowResize = true, windowScroll = true } = options || {}

  const width = ref(0)
  const height = ref(0)
  const top = ref(0)
  const left = ref(0)
  const right = ref(0)
  const bottom = ref(0)
  const x = ref(0)
  const y = ref(0)

  const recalculate = () => {
    if (!target.value) return

    const rect = target.value.getBoundingClientRect()
    width.value = rect.width
    height.value = rect.height
    top.value = rect.top
    left.value = rect.left
    right.value = rect.right
    bottom.value = rect.bottom
    x.value = rect.x
    y.value = rect.y
  }

  const update = () => {
    recalculate()
  }

  useResizeObserver(target, update)
  useMutationObserver(target, update, { attributeFilter: ['class', 'style'] })

  windowScroll && useEventListener(window, 'scroll', update, true)
  windowResize && useEventListener(window, 'resize', update, true)

  return {
    width,
    height,
    top,
    left,
    right,
    bottom,
    x,
    y,
    update
  }
}

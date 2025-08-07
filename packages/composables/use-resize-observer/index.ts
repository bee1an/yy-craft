import type { AnyFn } from '@yy-craft/utils/src/types'
import type { ShallowRef } from 'vue'
import { tryOnScopeDispose } from '@yy-craft/utils/src/vue'
import { watch } from 'vue'

export type UseResizeObserverOptions = ResizeObserverOptions

export type UseResizeObserverReturn = ReturnType<typeof useResizeObserver>

/**
 * @description 监听尺寸变化
 */
export function useResizeObserver(
  target: Readonly<ShallowRef<Element | null>>,
  /** 尺寸变化时回调 */
  onResize: (entry: ResizeObserverEntry[]) => void,
  /**  */
  options: UseResizeObserverOptions = {},
) {
  if (import.meta.env.SSR)
    return () => null

  const resizeObserver = new ResizeObserver(onResize)

  const cleanups: AnyFn[] = []
  const cleanup = () => {
    cleanups.forEach(fn => fn())
    cleanups.length = 0
  }

  const observe = () => {
    resizeObserver.observe(target.value!, options)
    return () => resizeObserver.disconnect()
  }

  const unwatch = watch(
    target,
    (el) => {
      cleanup()
      if (!el)
        return
      cleanups.push(observe())
    },
    {
      immediate: true,
    },
  )

  const stop = () => {
    unwatch()
    cleanup()
  }

  tryOnScopeDispose(stop)

  return stop
}

import type { AnyFn } from '@yy-craft/utils/src/types'
import type { ShallowRef } from 'vue'
import { tryOnScopeDispose } from '@yy-craft/utils/src/vue'
import { watch } from 'vue'

export function useMutationObserver(
  target: Readonly<ShallowRef<Element | null>>,
  /** 回调函数 */
  callback: (mutations: MutationRecord[], observer: MutationObserver) => void,
  /** 参数 */
  options?: MutationObserverInit,
) {
  const mutationObserver = new MutationObserver(callback)

  const observe = () => {
    mutationObserver.observe(target.value!, options)
    return () => mutationObserver.disconnect()
  }

  const cleanups: AnyFn[] = []
  const cleanup = () => {
    cleanups.forEach(fn => fn())
    cleanups.length = 0
  }

  const unwatch = watch(target, (val) => {
    cleanup()
    val && cleanups.push(observe())
  })

  const stop = () => {
    unwatch()
    cleanup()
  }

  tryOnScopeDispose(stop)

  return stop
}

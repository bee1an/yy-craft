import { tryOnScopeDispose } from '@yy-ui/utils/src/vue'
import { type ShallowRef, watch } from 'vue'

export const useMutationObserver = (
  /** 监听对象 */
  target: Readonly<ShallowRef<Element | null>>,
  /** 回调函数 */
  callback: (mutations: MutationRecord[], observer: MutationObserver) => void,
  /** 参数 */
  options?: MutationObserverInit
) => {
  const mutationObserver = new MutationObserver(callback)

  const observe = () => {
    mutationObserver.observe(target.value!, options)
    return () => mutationObserver.disconnect()
  }

  const cleanups: Function[] = []
  const cleanup = () => {
    cleanups.forEach((fn) => fn())
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

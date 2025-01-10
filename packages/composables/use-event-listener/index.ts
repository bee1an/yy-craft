import { onScopeDispose, ShallowRef, toValue, watch } from 'vue'

export type UseEventListenerReturn = ReturnType<typeof useEventListener>

export function useEventListener<K extends keyof WindowEventMap>(
  target: Readonly<ShallowRef<HTMLElement | null>> | Window | Document,
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): () => void
export function useEventListener(
  target: Readonly<ShallowRef<HTMLElement | null>> | Window | Document,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) {
  const cleanups: Function[] = []
  const cleanup = () => {
    cleanups.forEach(fn => fn())
    cleanups.length = 0
  }

  const register = (el: any, event: string, listener: any, options: any) => {
    el.addEventListener(event, listener, options)
    return () => el.removeEventListener(event, listener, options)
  }

  const watchCallback = () => {
    cleanup()

    const element = toValue(target as any)

    if (!element) return

    cleanups.push(register(element, type, listener, options))
  }

  const stopWatcher = watch(() => toValue(target as any), watchCallback, {
    immediate: true,
    flush: 'post'
  })

  const stop = () => {
    stopWatcher()
    cleanup()
  }

  onScopeDispose(stop, true)

  return stop
}

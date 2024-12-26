import { isRef, onUnmounted, ShallowRef, watch } from 'vue'

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
  watch(
    target,
    () => {
      const element = isRef(target) ? target.value : target
      element?.addEventListener(type, listener, options)
    },
    { immediate: true }
  )

  const stopListenHandler = () => {
    const element = isRef(target) ? target.value : target
    element?.removeEventListener(type, listener, options)
  }

  onUnmounted(() => stopListenHandler())

  return stopListenHandler
}

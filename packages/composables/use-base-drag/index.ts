import { onUnmounted, type ShallowRef } from 'vue'
import { useEventListener } from '../use-event-listener'

/**
 * @description 基础拖拽
 */
export const useBaseDrag = (
  /** 拖拽对象 */
  target: Readonly<ShallowRef<HTMLElement | null>>,
  cb: {
    down?: (e: MouseEvent) => any
    move?: (e: {
      /** move 事件对象 */
      event: MouseEvent
      /** 当前drag移动的距离 */
      moveX: number
      moveY: number
      /** 当前move移动的距离 */
      stepX: number
      stepY: number
      /** mousedown的返回值 */
      downReturnVal: any
    }) => void
    up?: (e: MouseEvent) => void
  }
): void => {
  let downX = 0,
    downY = 0
  let lastClientX = 0,
    lastClientY = 0

  let downReturnVal: any

  const mousedownHandler = (e: MouseEvent) => {
    downReturnVal = cb.down?.(e)
    lastClientX = downX = e.clientX
    lastClientY = downY = e.clientY
    document.addEventListener('mousemove', mousemoveHandler)
    document.addEventListener('mouseup', mouseupHandler)
  }

  const mousemoveHandler = (e: MouseEvent) => {
    const moveX = e.clientX - downX
    const moveY = e.clientY - downY

    const stepX = e.clientX - lastClientX
    lastClientX = e.clientX

    const stepY = e.clientY - lastClientY
    lastClientY = e.clientY

    cb.move?.({ event: e, moveX, moveY, stepX, stepY, downReturnVal })
  }

  const mouseupHandler = (e: MouseEvent) => {
    cb.up?.(e)
    document.removeEventListener('mousemove', mousemoveHandler)
    document.removeEventListener('mouseup', mouseupHandler)
  }

  useEventListener(target, 'mousedown', mousedownHandler)

  onUnmounted(() => {
    document.removeEventListener('mousemove', mousemoveHandler)
    document.removeEventListener('mouseup', mouseupHandler)
  })
}

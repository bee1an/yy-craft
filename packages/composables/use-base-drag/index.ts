import { onUnmounted, ShallowRef, watch } from 'vue'

export const useBaseDrag = (
  target: Readonly<ShallowRef<HTMLElement | null>>,
  cb: {
    down?: (e: MouseEvent) => void
    move?: (e: {
      event: MouseEvent
      moveX: number
      moveY: number
      stepX: number
      stepY: number
      downReturnVal: any
    }) => void
    up?: (e: MouseEvent) => void
  }
) => {
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

  watch(
    target,
    () => {
      if (target.value) {
        target.value.addEventListener('mousedown', mousedownHandler)
      }
    },
    { immediate: true }
  )

  onUnmounted(() => {
    document.removeEventListener('mousemove', mousemoveHandler)
    document.removeEventListener('mouseup', mouseupHandler)
  })
}

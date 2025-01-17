import { computed, ShallowRef } from 'vue'
import { useElementBounding } from '../use-element-bounding'
import { useWindowSize } from '../use-window-size'

export type DefaultPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end'

export type PlacementOptions = {
  placement: DefaultPlacement
}

export const usePlacement = (
  trigger: Readonly<ShallowRef<HTMLElement | null>>,
  content: Readonly<ShallowRef<HTMLElement | null>>,
  options: PlacementOptions
) => {
  const {
    width: triggerWidth,
    height: triggerHeight,
    top: triggerTop,
    left: triggerLeft
  } = useElementBounding(trigger)

  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const { width: contentWidth, height: contentHeight } =
    useElementBounding(content)

  const primePlacement = computed(() => {
    return options.placement.split('-')[0] as
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
  })

  const secondPlacement = computed(() => {
    return options.placement.split('-')[1] as 'start' | 'end' | undefined
  })

  function getPosition(placement: 'top' | 'bottom' | 'left' | 'right') {
    if (placement === 'top') {
      return triggerTop.value - contentHeight.value - 10
    }
    if (placement === 'bottom') {
      return triggerTop.value + triggerHeight.value + 10
    }
    if (placement === 'left') {
      return triggerLeft.value - contentWidth.value - 10
    }
    if (placement === 'right') {
      return triggerLeft.value + triggerWidth.value + 10
    }

    return null as never
  }

  function getSecondPosition(
    placement: 'start' | 'end' | undefined,
    triggerPos: number,
    triggerSize: number,
    contentSize: number
  ) {
    if (placement === 'start') {
      return triggerPos
    }
    if (placement === 'end') {
      return triggerPos + triggerSize - contentSize
    }

    return triggerPos + triggerSize / 2 - contentSize / 2
  }

  const unregulatedTop = computed(() => {
    if (primePlacement.value === 'top') {
      return getPosition('top')
    }
    if (primePlacement.value === 'bottom') {
      return getPosition('bottom')
    }
    return getSecondPosition(
      secondPlacement.value,
      triggerTop.value,
      triggerHeight.value,
      contentHeight.value
    )
  })

  const overViewport = (
    direction: 'vertical' | 'horizontal',
    posValue?: number
  ) => {
    const payload = { overStart: false, overEnd: false }

    const endLimit =
      direction === 'vertical'
        ? windowHeight.value - contentHeight.value
        : windowWidth.value - contentWidth.value

    payload.overStart =
      (posValue ?? getPosition(direction === 'vertical' ? 'top' : 'left')) < 0

    payload.overEnd =
      (posValue ?? getPosition(direction === 'vertical' ? 'bottom' : 'right')) >
      endLimit

    return payload
  }

  const resolveTop = computed(() => {
    if (['top', 'bottom'].includes(primePlacement.value)) {
      const { overStart, overEnd } = overViewport('vertical')
      if (overStart && !overEnd) {
        return getPosition('bottom')
      }

      if (overEnd && !overStart) {
        return getPosition('top')
      }
    } else {
      const { overStart, overEnd } = overViewport(
        'vertical',
        unregulatedTop.value
      )
      if (overStart && !overEnd) {
        return triggerTop.value + triggerHeight.value > 0
          ? 0
          : triggerTop.value + triggerHeight.value
      }
      if (overEnd && !overStart) {
        return triggerTop.value < windowHeight.value
          ? windowHeight.value - contentHeight.value
          : triggerTop.value - contentHeight.value
      }
    }

    return unregulatedTop.value
  })

  const unregulatedLeft = computed(() => {
    if (primePlacement.value === 'left') {
      return getPosition('left')
    }
    if (primePlacement.value === 'right') {
      return getPosition('right')
    }
    return getSecondPosition(
      secondPlacement.value,
      triggerLeft.value,
      triggerWidth.value,
      contentWidth.value
    )
  })
  const resolveLeft = computed(() => {
    if (['left', 'right'].includes(primePlacement.value)) {
      const { overStart, overEnd } = overViewport('horizontal')
      if (overStart && !overEnd) {
        return getPosition('right')
      }

      if (overEnd && !overStart) {
        return getPosition('left')
      }
    } else {
      const { overStart, overEnd } = overViewport(
        'horizontal',
        unregulatedLeft.value
      )
      if (overStart && !overEnd) {
        return triggerLeft.value + triggerWidth.value > 0
          ? 0
          : triggerLeft.value + triggerWidth.value
      }
      if (overEnd && !overStart) {
        return triggerLeft.value < windowWidth.value
          ? windowWidth.value - contentWidth.value
          : triggerLeft.value - contentWidth.value
      }
    }

    return unregulatedLeft.value
  })

  return { top: resolveTop, left: resolveLeft }
}

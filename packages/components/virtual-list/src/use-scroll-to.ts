import { Overload } from '@yy-ui/utils'
import { Ref } from 'vue'
import { VirtualListProps } from './virtual-list'
import { emitter, VirtualListEvents } from './emitter-bus'

interface ScrollToExtraOptions extends ScrollOptions {}

export interface ScrollTo {
  (xCoord: number, yCoord: number): void
  (options?: ScrollToOptions): void
  (options: { distance: number } & ScrollToExtraOptions): void
  (options: { index: number } & ScrollToExtraOptions): void
  (options: { key: string | number } & ScrollToExtraOptions): void
  (
    options: {
      position: 'top' | 'bottom' | 'left' | 'right'
    } & ScrollToExtraOptions
  ): void
}

export const useScrollTo = (
  warpper: Ref<HTMLDivElement | null>,
  props: VirtualListProps,
  sizeGather: Ref<number[]>
) => {
  const overload = new Overload()

  // xCoord: number, yCoord: number
  overload.add((xCoord: number, yCoord: number) => {
    console.log('xCoord: number, yCoord: number')
    warpper.value?.scrollTo(xCoord, yCoord)
  })

  // options?: ScrollToOptions
  overload.add(
    (options?: ScrollToOptions) => {
      console.log('options?: ScrollToOptions')
      warpper.value?.scrollTo(options)
    },
    (options?: ScrollToOptions) => {
      if (typeof options !== 'object') return false

      return (
        typeof options === 'undefined' || 'top' in options || 'left' in options
      )
    }
  )

  // options: { distance: number } & ScrollToExtraOptions
  overload.add(
    (options: { distance: number } & ScrollToExtraOptions) => {
      console.log('options: { distance: number } & ScrollToExtraOptions')
      warpper.value?.scrollTo({
        ...options,
        [props.vertical ? 'top' : 'left']: options.distance
      })
    },
    (options: { distance: number } & ScrollToExtraOptions) => {
      if (typeof options !== 'object') return false

      return 'distance' in options
    }
  )

  // 滚动到指定索引
  let scrollListener: any
  const scrollToIndex = (index: number, options: ScrollToExtraOptions = {}) => {
    if (index < 0) {
      index = 0
    }

    if (index >= props.data.length) {
      index = props.data.length - 1
    }

    // 注销之前的监听
    emitter.off('scroll', scrollListener)
    let size = 0
    for (let i = 0; i < index; i++) {
      size += sizeGather.value[i] || props.itemSize
    }

    if (!warpper.value) return

    const warpperVal = warpper.value

    const scrollPosKey = props.vertical ? 'scrollTop' : 'scrollLeft'

    if (warpperVal[scrollPosKey] === size) return

    warpperVal.scrollTo({
      ...options,
      [props.vertical ? 'top' : 'left']: size
    })

    const scrollSizeKey = props.vertical ? 'scrollHeight' : 'scrollWidth'
    const clientSizeKey = props.vertical ? 'clientHeight' : 'clientWidth'
    let minDistance =
      warpper.value![scrollSizeKey] - warpper.value![clientSizeKey]
    scrollListener = (event: VirtualListEvents['scroll'][0]) => {
      const { maxScrollSize, scrollSize } = event
      minDistance = Math.min(minDistance, maxScrollSize)

      if (size === scrollSize || scrollSize >= minDistance) {
        emitter.once('renderComplete', () => {
          const newMaxScrollSize =
            warpperVal[scrollSizeKey] - warpperVal[clientSizeKey]

          warpperVal[scrollPosKey] !== newMaxScrollSize && scrollToIndex(index)
        })

        emitter.off('scroll', scrollListener)
      }
    }

    emitter.on('scroll', scrollListener)
  }
  // options: { index: number } & ScrollToExtraOptions
  overload.add(
    (options: { index: number } & ScrollToExtraOptions) => {
      console.log('options: { index: number } & ScrollToExtraOptions')

      const { index } = options
      scrollToIndex(index, options)
    },
    (options: { index: number } & ScrollToExtraOptions) => {
      if (typeof options !== 'object') return false

      return 'index' in options
    }
  )

  // options: { key: string | number } & ScrollToExtraOptions
  overload.add(
    (options: { key: string | number } & ScrollToExtraOptions) => {
      console.log('options: { key: string | number } & ScrollToExtraOptions')

      const index = props.data.findIndex(
        item => item[props.keyField] === options.key
      )

      if (index !== -1) {
        scrollToIndex(index, options)
      }
    },
    (options: { key: string | number } & ScrollToExtraOptions) => {
      if (typeof options !== 'object') return false

      return 'key' in options
    }
  )

  // options: {
  //   position: 'top' | 'bottom' | 'left' | 'right'
  // } & ScrollToExtraOptions
  overload.add(
    (
      options: {
        position: 'top' | 'bottom' | 'left' | 'right'
      } & ScrollToExtraOptions
    ) => {
      console.log(
        "options: { position: 'top' | 'bottom' | 'left' | 'right' } & ScrollToExtraOptions"
      )

      const { position } = options

      let index = 0
      if (position === 'bottom' || position === 'right') {
        index = sizeGather.value.length - 1
      }

      scrollToIndex(index, options)
    },
    (
      options: {
        position: 'top' | 'bottom' | 'left' | 'right'
      } & ScrollToExtraOptions
    ) => {
      if (typeof options !== 'object') return false

      return 'position' in options
    }
  )

  return { handler: overload.get().call }
}

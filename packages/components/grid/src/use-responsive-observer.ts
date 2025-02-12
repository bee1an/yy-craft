import {
  useEventListener,
  type UseEventListenerReturn
} from '@yy-ui/composables/use-event-listener'
import {
  useResizeObserver,
  type UseResizeObserverReturn
} from '@yy-ui/composables/use-resize-observer'
import { defaultBreakpoints } from '@yy-ui/constants'
import { computed, nextTick, ref, type ShallowRef, watch } from 'vue'

/**
 * @description
 * 	props[key]: '2 400:3 600:4' | '2 s:3 m:4 l:5'
 * 	将上面参数处理为 {defaultValue: 0, responsiveMap: {400:3,600:4}}
 * 	并返回在当前监控元素的宽度下使用的应该使用的key
 */

export const useResponsiveObserver = <T extends string>(
  elRef: Readonly<ShallowRef<HTMLDivElement | null>>,
  props: Record<T, any>,
  key: T
) => {
  // 参数是否是响应式参数
  const isResponsive = computed(() => {
    if (typeof props[key] === 'string') {
      const [, ...colsMapStr] = props[key].split(' ')
      return colsMapStr.length > 0
    }
    return false
  })
  // 是否是窗口响应式
  const isScreenResponsive = computed(() => {
    const colsMapKeys = Object.keys(responsiveConfig.value.responsiveMap)
    return Reflect.has(defaultBreakpoints, colsMapKeys[0])
  })

  const cleanups: (UseResizeObserverReturn | UseEventListenerReturn)[] = []
  const cleanup = () => {
    cleanups.splice(0, cleanups.length).forEach((callback) => callback())
  }
  const observerWidth = ref(0)
  // 切换监控的元素
  const toggleResizeObserver = () => {
    cleanup()

    let stopHandler

    if (isScreenResponsive.value) {
      stopHandler = useEventListener(window, 'resize', () => {
        console.log('windowresize')
        observerWidth.value = window.innerWidth
      })
      observerWidth.value = window.innerWidth
    } else {
      stopHandler = useResizeObserver(elRef, () => {
        console.log('resize')
        observerWidth.value = elRef.value!.offsetWidth
      })
      nextTick(() => {
        observerWidth.value = elRef.value?.offsetWidth || 0
      })
    }

    cleanups.push(stopHandler)
  }

  // 响应式配置
  const responsiveConfig = computed(() => {
    if (!isResponsive.value) {
      return { defaultValue: 0, responsiveMap: {} }
    }

    const [value, ...valueMapStr] = (props[key] as string).split(' ')

    const responsiveMap = valueMapStr.reduce((pre, valueStr) => {
      const [key, value] = valueStr.split(':')
      pre[key] = Number(value)
      return pre
    }, {} as Record<string, number>)

    return { defaultValue: Number(value), responsiveMap }
  })

  watch(
    () => props[key],
    () => {
      isResponsive.value ? toggleResizeObserver() : cleanup()
    },
    { immediate: true }
  )

  // 归一化尺寸映射
  const normalizedMap = () => {
    return Object.fromEntries(
      Object.entries(responsiveConfig.value.responsiveMap).map((item) => {
        const newMap = [...item]
        if (isScreenResponsive.value) {
          newMap[0] =
            defaultBreakpoints[item[0] as keyof typeof defaultBreakpoints]
        }

        return newMap
      })
    ) as Record<string, number>
  }

  // 获取最终使用的响应式key
  const getReolveKey = (responsiveMap: Record<string, number>) => {
    const mapKeys = Object.keys(responsiveMap)
    const meets = mapKeys
      .map((item) => Number(item))
      .filter((key) => key <= observerWidth.value)

    return Math.max(...meets)
  }

  return {
    isResponsive,
    responsiveConfig,
    normalizedMap,
    getReolveKey
  }
}

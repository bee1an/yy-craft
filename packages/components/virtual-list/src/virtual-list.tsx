import { CreateNamespace } from '@yy-ui/utils'
import {
  computed,
  defineComponent,
  ExtractPropTypes,
  nextTick,
  onMounted,
  PropType,
  reactive,
  ref,
  SlotsType,
  watch
} from 'vue'
import { ScrollTo, useScrollTo } from './use-scroll-to'
import { emitter } from './emitter-bus'
import { useResizeObserver, useTheme } from '@yy-ui/composables'
import { ScrollbarProps } from '@yy-ui/components'
import { YScrollbar } from '../../_internal'
import style from './style/index.cssr'

export const virtualListProps = {
  /** 滚动条配置 */
  scrollbarProps: Object as PropType<ScrollbarProps>,
  /** 是否使用虚拟滚动 */
  virtualScroll: {
    type: Boolean,
    default: true
  },
  /** 所有的渲染数据 */
  data: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  /** 滚动区域最大尺寸 */
  wrapperMaxSize: {
    type: Number,
    default: 500
  },
  /** 是否是垂直滚动 */
  vertical: {
    type: Boolean,
    default: true
  },
  /** 每一项的尺寸: 数值约接近, scrollTo的准确度越高 */
  itemSize: {
    type: Number,
    default: 27
  },
  /** 最小边界: 当元素最大位置大于最小边界时才会渲染 */
  minBound: {
    type: Number,
    default: -100,
    validator: (val: number) => val <= 0 // 最小边界必须小于等于0
  },
  /** 最大边界: 当元素最小位置小于最大边界时才会渲染 */
  maxBound: {
    type: Number,
    default: (props: { wrapperMaxSize: number }) => props.wrapperMaxSize,
    validator: (val: number, props: { wrapperMaxSize: number }) =>
      val >= props.wrapperMaxSize // 最大边界必须大于等于wrapperMaxSize
  },
  /** 每一项的key字段别名 */
  keyField: {
    type: String,
    default: 'key'
  }
}

export type VirtualListProps = ExtractPropTypes<typeof virtualListProps>

export interface VirtualListExposed {
  /** 滚动方法 */
  scrollTo: ScrollTo
  /** 重新渲染 */
  render: () => void
}

class VirtualListFactory<T = any> {
  define() {
    return defineComponent({
      name: 'VirtualList',
      props: {
        ...virtualListProps,
        data: { type: Array as PropType<T[]>, default: () => [] }
      },
      slots: Object as SlotsType<{
        default: { item: T }
      }>,
      setup(props, { slots, expose }) {
        if (!props.virtualScroll) {
          // 不使用虚拟滚动
          return () => props.data.map(item => slots.default?.({ item }))
        }

        const scrollPosKey = computed(() =>
          props.vertical ? 'scrollTop' : 'scrollLeft'
        )

        const scrollSizeKey = computed(() =>
          props.vertical ? 'scrollHeight' : 'scrollWidth'
        )
        const clientSizeKey = computed(() =>
          props.vertical ? 'clientHeight' : 'clientWidth'
        )

        const warpperSizeStyle = computed(() => {
          return {
            [props.vertical
              ? 'max-height'
              : 'max-width']: `${props.wrapperMaxSize}px`
          }
        })

        const bem = new CreateNamespace('vl')

        const warpper = ref<HTMLDivElement | null>(null)
        const visibleZone = ref<HTMLDivElement | null>(null)
        useResizeObserver(visibleZone, () => {
          updateItemSize() && render()
        })

        const virtualOption = reactive({
          start: 0,
          end: 0,
          lastStartKey: null as any,
          lastEndKey: null as any
        })

        // 隐藏元素后需要撑开的尺寸
        const offset = ref(0)
        const transformStyle = computed(() => {
          return {
            transform: `translate${props.vertical ? 'Y' : 'X'}(${
              offset.value
            }px)`
          }
        })
        // 最小滚动区域尺寸
        const minSize = ref(props.itemSize * props.data.length)
        const minSizeStyle = computed(() => {
          return {
            [props.vertical ? 'minHeight' : 'minWidth']: `${minSize.value}px`
          }
        })
        // 记录每个item的size
        const sizeGather = ref(new Array(props.data.length))
        // 更新元素尺寸
        const updateItemSize = () => {
          // 更新元素尺寸
          let hasChange = false
          Array.from(visibleZone.value!.children).forEach((child, _index) => {
            const index = virtualOption.start + _index
            const childSize = (child as HTMLElement)[
              props.vertical ? 'offsetHeight' : 'offsetWidth'
            ]
            if (
              !sizeGather.value[index] ||
              childSize !== sizeGather.value[index]
            ) {
              minSize.value +=
                childSize - (sizeGather.value[index] || props.itemSize) // 更新撑开滚动区域的元素尺寸
              sizeGather.value[index] = childSize

              hasChange = true
            }
          })

          return hasChange
        }
        const render = () => {
          updateItemSize()

          const scrollDistance = warpper.value![scrollPosKey.value]

          let start = 0
          offset.value = 0

          for (let index = 0; index < sizeGather.value.length; index++) {
            const size = sizeGather.value[index] || props.itemSize

            /*
							跟据滚动距离计算开始渲染的元素的索引
							条件: 当前元素的结尾大于最小边界时, 作为开始渲染的元素
						*/
            if (offset.value + size - scrollDistance >= props.minBound) {
              start = index
              break
            }
            offset.value += size
          }

          let size = 0
          let index = start
          const firstChildHiddenSize = scrollDistance - offset.value // 第一个元素被隐藏的部分

          while (true) {
            size += sizeGather.value[index] || 0
            /*
							条件1: 当下一个元素需要渲染但是没有记录他的size时, 需要执行渲染, 并在渲染后更新他的size(updateItemSize)
							条件2: 当下一个元素的结尾(size - firstChildHiddenSize)没有超出最大边界时, 继续渲染
						*/
            if (
              !sizeGather.value[index] ||
              size - firstChildHiddenSize >= props.maxBound
            ) {
              virtualOption.start = start
              virtualOption.end = index + 1
              const executed = sliceData() // executed防止溢栈

              executed ? nextTick(render) : emitter.emit('renderComplete')

              return
            }
            index++
          }
        }
        const currentData = ref<any[]>([])
        const sliceData = () => {
          const executed = true
          if (virtualOption.start < 0) {
            virtualOption.start = 0
          }
          if (virtualOption.end > props.data.length) {
            virtualOption.end = props.data.length
          }

          const startKey = (props.data[virtualOption.start] as any)[
            props.keyField
          ]
          const endKey = (props.data[virtualOption.end - 1] as any)[
            props.keyField
          ]

          if (
            startKey === virtualOption.lastStartKey &&
            endKey === virtualOption.lastEndKey
          ) {
            // 未更改不执行
            return
          }

          virtualOption.lastStartKey = startKey
          virtualOption.lastEndKey = endKey

          currentData.value = props.data.slice(
            virtualOption.start,
            virtualOption.end
          )

          emitter.emit('dataChange', currentData.value)

          return executed
        }

        // 初始化渲染
        onMounted(render)

        // 数据变化时，重新渲染
        watch(
          () => props.data,
          () => {
            nextTick(() => {
              const distance = warpper.value![scrollPosKey.value]
              warpper.value![scrollPosKey.value] = 0
              minSize.value = props.itemSize * props.data.length
              sizeGather.value = new Array(props.data.length)
              Object.assign(virtualOption, {
                start: 0,
                end: 0,
                lastStartKey: null,
                lastEndKey: null
              })

              // 渲染结束后移动到数据修改前的位置
              emitter.once('dataChange', () => scrollTo({ distance }))

              render()
            })
          }
        )

        const { handler } = useScrollTo(warpper, props, sizeGather)
        const scrollTo: ScrollTo = (...options: any[]) => {
          if (!warpper.value) return

          handler(...options)
        }

        expose({ scrollTo, render } satisfies VirtualListExposed)

        const scrollHandler = () => {
          emitter.emit('scroll', {
            scrollSize: warpper.value![scrollPosKey.value],
            maxScrollSize:
              warpper.value![scrollSizeKey.value] -
              warpper.value![clientSizeKey.value]
          })

          render()
        }

        function getContainer() {
          return warpper.value
        }

        useTheme('virtual-list', style, props)

        return () => {
          return (
            <YScrollbar
              container={getContainer}
              style={warpperSizeStyle.value}
              {...props.scrollbarProps}
            >
              <div class={bem.b().value} ref={warpper} onScroll={scrollHandler}>
                <div class={bem.e('view').value} style={minSizeStyle.value}>
                  <div
                    class={[
                      bem.e('visible').value,
                      bem.e('visible').m(!props.vertical && 'horizontal').value
                    ]}
                    ref={visibleZone}
                    style={transformStyle.value}
                  >
                    {currentData.value.map(item => slots.default?.({ item }))}
                  </div>
                </div>
              </div>
            </YScrollbar>
          )
        }
      }
    })
  }
}

const main = new VirtualListFactory().define()

// 支持slot泛型, 导入时传递泛型
export function GenericVirtualList<T>(): ReturnType<
  VirtualListFactory<T>['define']
> {
  return main
}

export default main

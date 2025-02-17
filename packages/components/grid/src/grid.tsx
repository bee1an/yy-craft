import { CreateNamespace } from '@yy-ui/utils/src/create'
import {
  computed,
  type ComputedRef,
  defineComponent,
  type ExtractPropTypes,
  type InjectionKey,
  type PropType,
  provide,
  ref
} from 'vue'
import { useResponsiveObserver } from './use-responsive-observer'

export const gridProps = {
  /** 间隔 */
  gap: {
    type: [Number, Array] as PropType<number | [number, number]>,
    default: 0
  },
  /** 栅格数量 */
  cols: {
    type: [String, Number],
    default: 12
  }
}

export type GridProps = ExtractPropTypes<typeof gridProps>

export const gridProviderKey = Symbol('GridProviderKey') as InjectionKey<{
  margin: ComputedRef<{ horizontal: number; vertical: number }>
}>

export default defineComponent({
  name: 'Grid',
  props: gridProps,
  setup(props) {
    const bem = new CreateNamespace('grid')

    const margin = computed<{ horizontal: number; vertical: number }>(() => {
      const { gap } = props

      if (Array.isArray(gap)) {
        return {
          horizontal: gap[0],
          vertical: gap[1]
        }
      }
      return {
        horizontal: gap,
        vertical: gap
      }
    })

    const gridContainer = ref<HTMLDivElement | null>(null)

    const { isResponsive, responsiveConfig, normalizedMap, getReolveKey } =
      useResponsiveObserver(gridContainer, props, 'cols')

    const resolveCols = computed(() => {
      let cols = responsiveConfig.value.defaultValue

      if (isResponsive.value) {
        const colsMap = normalizedMap()

        const resolveColsKey = getReolveKey(normalizedMap())

        cols = colsMap[resolveColsKey] ?? cols
      }

      return cols || props.cols
    })

    provide(gridProviderKey, { margin })

    return { bem, margin, resolveCols }
  },
  render() {
    const {
      bem,
      margin,
      resolveCols,
      $slots: { default: defaultSlot }
    } = this

    return (
      <div
        style={{
          display: 'grid',
          gap: `${margin.vertical}px ${margin.horizontal}px`,
          gridTemplateColumns: `repeat(${resolveCols}, minmax(0, 1fr))`
        }}
        class={bem.b().value}
        ref="gridContainer"
      >
        {defaultSlot?.()}
      </div>
    )
  }
})

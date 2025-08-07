import type { ExtractPropTypes } from 'vue'
import { CreateNamespace } from '@yy-craft/utils/src/create'
import { computed, defineComponent, inject, shallowRef } from 'vue'
import { gridProviderKey } from './grid'
import { useResponsiveObserver } from './use-responsive-observer'

export const gridItemProps = {
  /** 距离左侧的间隔数 */
  offset: { type: Number, default: 0 },
  /** 占据的列数 */
  span: { type: [String, Number], default: 1 },
  /** 占据的行数 */
  rowSpan: { type: Number, default: 1 },
}

export type GridItemProps = ExtractPropTypes<typeof gridItemProps>

export default defineComponent({
  name: 'GridItem',
  alias: ['Gi'],
  props: gridItemProps,
  setup(props) {
    const bem = new CreateNamespace('grid-item')

    const { margin } = inject(gridProviderKey)!

    const item = shallowRef<HTMLDivElement | null>(null)

    const { isResponsive, responsiveConfig, normalizedMap, getReolveKey }
      = useResponsiveObserver(item, props, 'span')

    const resolveSpan = computed(() => {
      let span = responsiveConfig.value.defaultValue

      if (isResponsive.value) {
        const spanMap = normalizedMap()

        const resolveColsKey = getReolveKey(normalizedMap())

        span = spanMap[resolveColsKey] ?? span
      }

      return Number(span || props.span)
    })

    return { bem, margin, item, resolveSpan }
  },
  render() {
    const {
      bem,
      margin,
      resolveSpan,
      $slots: { default: defaultSlot },
      $props: { rowSpan, offset },
    } = this

    return resolveSpan
      ? (
          <div
            ref="item"
            style={{
              gridColumn: `span ${resolveSpan + offset} / span ${resolveSpan + offset}`,
              gridRow: `span ${rowSpan} / span ${rowSpan}`,
              marginLeft: offset
                ? `calc(${offset * 50}% + ${margin.horizontal / 2}px)`
                : undefined,
            }}
            class={bem.b().value}
          >
            {defaultSlot?.()}
          </div>
        )
      : (
          <></>
        )
  },
})

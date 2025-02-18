import {
  computed,
  defineComponent,
  type ExtractPropTypes,
  inject,
  type PropType,
  ref,
  type StyleValue
} from 'vue'
import { popoverInjectKey } from './popover-inject-key'
import {
  type DefaultPlacement,
  usePlacement
} from '@yy-ui/composables/use-placement'
import { px } from '@yy-ui/utils/src/css'
import { getIntersection } from '@yy-ui/utils/src/tools'

export const popoverBodyProps = {
  /** 位置 */
  placement: { type: String as PropType<DefaultPlacement>, default: 'bottom' },

  /** 内容宽度, width=trigger时内容宽度与触发器宽度一致 */
  width: [Number, String] as PropType<number | 'trigger'>,

  /** 不要箭头 */
  showArrow: { type: Boolean, default: true },

  /** 不要样式 */
  row: Boolean,

  /** 内容类名 */
  contentClass: null as unknown as PropType<any>,

  /** 内容样式 */
  contentStyle: null as unknown as PropType<StyleValue>,

  /** 箭头类名 */
  arrowClass: null as unknown as PropType<any>,

  /** 箭头样式 */
  arrowStyle: null as unknown as PropType<StyleValue>,

  /** zIndex */
  zIndex: Number,

  /** 吸附元素距离触发器的距离 */
  distanceFromTrigger: { type: Number, default: 10 }
}

export type PopoverBodyProps = ExtractPropTypes<typeof popoverBodyProps>

export const popoverBodyEmits = {
  mouseenter: (() => true) as (event: MouseEvent) => void,
  mouseleave: (() => true) as (event: MouseEvent) => void
}

export type PopoverBodyEmits = typeof popoverBodyEmits

export default defineComponent({
  name: 'PopoverBody',
  props: popoverBodyProps,
  emits: popoverBodyEmits,
  // inheritAttrs: false,
  setup(props) {
    const { bem, styleVars, triggerRef, wrapper } = inject(popoverInjectKey)!

    const contentRef = ref<HTMLElement | null>(null)

    const {
      top: uncoresedTop,
      left: uncoredLeft,
      placementDirection,
      triggerTop,
      triggerLeft,
      triggerRight,
      triggerBottom,
      triggerWidth,
      triggerHeight,
      contentWidth,
      contentHeight,
      getOppositeDirection
    } = usePlacement(
      triggerRef,
      contentRef,
      computed(() => ({
        placement: props.placement,
        visibleAreaThreshold: 10,
        distanceFromTrigger: props.distanceFromTrigger
      }))
    )

    const top = computed(() => {
      return uncoresedTop.value - (wrapper.value ? triggerTop.value : 0)
    })
    const left = computed(() => {
      return uncoredLeft.value - (wrapper.value ? triggerLeft.value : 0)
    })

    const arrowPosition = computed(() => {
      if (['top', 'bottom'].includes(placementDirection.value)) {
        const [min, max] = getIntersection(
          [triggerLeft.value, triggerRight.value],
          [uncoredLeft.value, uncoredLeft.value + contentWidth.value]
        )!

        return { left: (min + max) / 2 - uncoredLeft.value + 'px' }
      }

      const [min, max] = getIntersection(
        [triggerTop.value, triggerBottom.value],
        [uncoresedTop.value, uncoresedTop.value + contentHeight.value]
      )!

      return { top: (min + max) / 2 - uncoresedTop.value + 'px' }
    })

    const oppositeDirection = computed(() =>
      getOppositeDirection(placementDirection.value)
    )

    return {
      bem,
      styleVars,
      contentRef,
      top,
      left,
      arrowPosition,
      oppositeDirection,
      triggerWidth,
      triggerHeight,
      placementDirection
    }
  },

  render() {
    const {
      bem,
      styleVars,
      top,
      left,
      arrowPosition,
      oppositeDirection,
      triggerWidth,
      placementDirection,
      $emit,
      $props: {
        width,
        showArrow,
        row,
        contentClass,
        contentStyle,
        arrowClass,
        arrowStyle,
        zIndex
      },
      $slots: { default: defaultSlot }
    } = this

    const wapperStyle = [
      styleVars,
      {
        zIndex: zIndex,
        top: px(top),
        left: px(left),
        transformOrigin: `${arrowPosition.left ?? oppositeDirection} ${
          arrowPosition.top ?? oppositeDirection
        }`,
        width: width && px(width === 'trigger' ? triggerWidth : width)
      } as const
    ]

    return (
      <div
        class={[
          bem.b().value,
          bem.m('placement-' + placementDirection).value,
          bem.m(row && 'row').value
        ]}
        style={wapperStyle}
        ref="contentRef"
        onMouseenter={(event: MouseEvent) => $emit('mouseenter', event)}
        onMouseleave={(event: MouseEvent) => $emit('mouseleave', event)}
      >
        {showArrow && (
          <div
            class={[bem.b('arrow').value, arrowClass]}
            style={[arrowPosition, arrowStyle!]}
          ></div>
        )}
        <div
          class={[bem.b('content').value, contentClass]}
          style={contentStyle}
        >
          {defaultSlot?.()}
        </div>
      </div>
    )
  }
})

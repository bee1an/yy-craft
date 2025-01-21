import {
  computed,
  defineComponent,
  ExtractPropTypes,
  inject,
  PropType,
  StyleValue,
  useTemplateRef
} from 'vue'
import { popoverInjectKey, PopoverPlacement } from './popover'
import { usePlacement } from '@yy-ui/composables'
import { getIntersection, px } from '@yy-ui/utils'

export const popoverBodyProps = {
  /** 位置 */
  placement: { type: String as PropType<PopoverPlacement>, default: 'bottom' },

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
  zIndex: Number
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
    const { bem, styleVars, triggerRef } = inject(popoverInjectKey)!

    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')

    const {
      top,
      left,
      placementDirection,
      triggerTop,
      triggerLeft,
      triggerRight,
      triggerBottom,
      triggerWidth,
      contentWidth,
      contentHeight,
      getOppositeDirection
    } = usePlacement(
      triggerRef,
      contentRef,
      computed(() => ({
        placement: props.placement,
        visibleAreaThreshold: 10
      }))
    )

    const arrowPosition = computed(() => {
      if (['top', 'bottom'].includes(placementDirection.value)) {
        const [min, max] = getIntersection(
          [triggerLeft.value, triggerRight.value],
          [left.value, left.value + contentWidth.value]
        )!

        return { left: (min + max) / 2 - left.value + 'px' }
      }

      const [min, max] = getIntersection(
        [triggerTop.value, triggerBottom.value],
        [top.value, top.value + contentHeight.value]
      )!

      return { top: (min + max) / 2 - top.value + 'px' }
    })

    const oppositeDirection = computed(() =>
      getOppositeDirection(placementDirection.value)
    )

    return {
      bem,
      styleVars,
      top,
      left,
      arrowPosition,
      oppositeDirection,
      triggerWidth,
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
        position: 'fixed',
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
            style={[arrowPosition, arrowStyle]}
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

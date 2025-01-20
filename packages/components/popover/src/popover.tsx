import { CreateNamespace, getIntersection, px } from '@yy-ui/utils'
import {
  computed,
  defineComponent,
  ExtractPropTypes,
  h,
  InjectionKey,
  PropType,
  provide,
  ref,
  Teleport,
  Transition,
  useTemplateRef,
  watch,
  withDirectives
} from 'vue'
import { usePlacement, useTheme, useThemeProps } from '@yy-ui/composables'
import {
  PopoverThemeVars,
  popoverDark,
  popoverLight,
  popoverStyle
} from '@yy-ui/theme-chalk'
import PopoverHijack, { popoverHijackProps } from './popover-hijack'
import { clickOutside } from '@yy-ui/directives'

export type PopoverPlacement =
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

export const popoverProps = {
  ...useThemeProps<PopoverThemeVars>(),

  ...popoverHijackProps,

  /** 位置 */
  placement: {
    type: String as PropType<PopoverPlacement>,
    default: 'bottom'
  },

  /** 手动控制显隐 */
  showPopover: {
    type: Boolean
  }
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export const popoverInjectKey = Symbol('PopoverInjectKey') as InjectionKey<{
  setTargetRef: (target: HTMLElement | null) => void
}>

export default defineComponent({
  name: 'Popover',
  props: popoverProps,
  setup(props) {
    const bem = new CreateNamespace('popover')

    const lightVars = popoverLight.vars()
    const darkVars = popoverDark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars, {}),
        dark: Object.assign({}, darkVars, {})
      }
    })

    const { styleVars } = useTheme(theme, 'popover', popoverStyle, props)

    watch(
      () => props.showPopover,
      () => {
        visible.value = !!props.showPopover
      }
    )
    const visible = ref(!!props.showPopover)
    const entireVisible = ref(false)
    const afterEnterHandler = () => {
      entireVisible.value = true
    }
    const afterLeaveHandler = () => {
      entireVisible.value = false
    }

    const show = () => {
      if (entireVisible.value) return
      visible.value = true
    }
    const hide = () => {
      visible.value = false
    }

    const triggerRef = ref<HTMLElement | null>(null)
    const setTargetRef = (target: HTMLElement | null) => {
      triggerRef.value = target
    }

    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')

    const {
      top,
      left,
      placementDirection,
      triggerTop,
      triggerLeft,
      triggerRight,
      triggerBottom,
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

    const oppositeDirection = computed(() =>
      getOppositeDirection(placementDirection.value)
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

    provide(popoverInjectKey, { setTargetRef })
    return {
      bem,
      styleVars,
      visible,
      afterEnterHandler,
      afterLeaveHandler,
      show,
      hide,
      top,
      left,
      placementDirection,
      oppositeDirection,
      arrowPosition
    }
  },
  render() {
    const {
      bem,
      styleVars,
      visible,
      afterEnterHandler,
      afterLeaveHandler,
      show,
      hide,
      top,
      left,
      placementDirection,
      oppositeDirection,
      arrowPosition,
      $props: { trigger },
      $slots: { trigger: triggerSlot, default: defaultSlot }
    } = this

    const contentStyle = [
      styleVars,
      {
        top: px(top),
        left: px(left),
        transformOrigin: `${arrowPosition.left ?? oppositeDirection} ${
          arrowPosition.top ?? oppositeDirection
        }`
      }
    ]

    return (
      <>
        <PopoverHijack trigger={trigger} onShow={show} onHide={hide}>
          {triggerSlot}
        </PopoverHijack>
        <Teleport to="body">
          <Transition
            name="popover-transition"
            onAfterEnter={afterEnterHandler}
            onAfterLeave={afterLeaveHandler}
            appear
          >
            {visible &&
              withDirectives(
                h(
                  <div
                    class={[
                      bem.b().value,
                      bem.m('placement-' + placementDirection).value
                    ]}
                    style={contentStyle}
                    ref="contentRef"
                  >
                    <div
                      class={bem.b('arrow').value}
                      style={[arrowPosition]}
                    ></div>
                    <div class={bem.b('content').value}>{defaultSlot?.()}</div>
                  </div>
                ),
                [trigger === 'click' ? [clickOutside, hide] : [undefined]]
              )}
          </Transition>
        </Teleport>
      </>
    )
  }
})

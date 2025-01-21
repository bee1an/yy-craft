import { CreateNamespace } from '@yy-ui/utils'
import {
  computed,
  ComputedRef,
  defineComponent,
  ExtractPropTypes,
  h,
  InjectionKey,
  PropType,
  provide,
  Ref,
  ref,
  RendererElement,
  Teleport,
  Transition,
  watch,
  withDirectives
} from 'vue'
import { useTheme, useThemeProps } from '@yy-ui/composables'
import {
  PopoverThemeVars,
  popoverDark,
  popoverLight,
  popoverStyle
} from '@yy-ui/theme-chalk'
import PopoverHijack, { popoverHijackProps } from './popover-hijack'
import PopoverBody, { popoverBodyProps } from './popover-body'
import { clickOutside, zindexable } from '@yy-ui/directives'

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

  ...popoverBodyProps,

  /** 手动控制显隐 */
  showPopover: Boolean,

  /** hover content 时不hide, 仅在trigger=hover时生效 */
  keepAliveOnHover: { type: Boolean, default: true },

  /** 延时触发, 仅在trigger=hover时生效 */
  delay: { type: Number, default: 100 },

  /** 延时隐藏, 仅在trigger=hover时生效 */
  duration: { type: Number, default: 200 },

  /** popover挂载位置 */
  to: {
    type: [String, Object, Boolean] as PropType<
      string | RendererElement | boolean
    >,
    default: 'body'
  }
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export const popoverEmits = {
  /** 显示 */
  show: () => true,
  /** 显示动画结束 */
  showed: () => true,
  /** 隐藏 */
  hide: () => true,
  /** 隐藏动画结束 */
  hid: () => true,
  /** 点击内容区域外 */
  clickoutside: () => true
}

export type PopoverEmits = typeof popoverEmits

export const popoverInjectKey = Symbol('PopoverInjectKey') as InjectionKey<{
  setTargetRef: (target: HTMLElement | null) => void
  bem: CreateNamespace
  styleVars: ComputedRef<Record<string, string>>
  triggerRef: Ref<HTMLElement | null>
}>

export default defineComponent({
  name: 'Popover',
  props: popoverProps,
  emits: popoverEmits,
  setup(props, { emit }) {
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
      if (entireVisible.value) return
      entireVisible.value = true
      emit('showed')
    }
    const afterLeaveHandler = () => {
      if (!entireVisible.value) return
      entireVisible.value = false
      emit('hid')
    }

    const show = () => {
      if (visible.value) return
      visible.value = true
      emit('show')
    }
    const hide = () => {
      if (!visible.value) return
      visible.value = false
      emit('hide')
    }

    const triggerRef = ref<HTMLElement | null>(null)
    const setTargetRef = (target: HTMLElement | null) => {
      triggerRef.value = target
    }

    const contentMouseenter = () => {
      if (
        props.trigger === 'hover' &&
        props.keepAliveOnHover &&
        visible.value // visible.value这个判断防止,在关闭动画时,hover到content,然后再次打开
      ) {
        triggerMouseenter()
      }
    }
    const contentMouseleave = () => {
      if (props.trigger === 'hover' && props.keepAliveOnHover) {
        triggerMouseleave()
      }
    }

    let showTimerId: number | null = null
    const clearShowTimer = () => {
      showTimerId && clearTimeout(showTimerId)
    }
    const triggerMouseenter = () => {
      if (props.trigger !== 'hover') return

      clearHideTimer()

      if (props.delay === 0) {
        show()
        return
      }

      showTimerId = window.setTimeout(show, props.delay)
    }
    let hideTimerId: number | null = null
    const clearHideTimer = () => {
      hideTimerId && clearTimeout(hideTimerId)
    }
    const triggerMouseleave = () => {
      if (props.trigger !== 'hover') return

      clearShowTimer()

      if (props.duration === 0) {
        hide()
        return
      }

      hideTimerId = window.setTimeout(hide, props.duration)
    }

    const triggerClick = () => {
      if (props.trigger !== 'click' || entireVisible.value) return // hide动画未结束不能通过点击重新打开

      show()
    }
    const contentClickOutside = () => {
      props.trigger === 'click' && hide()
      emit('clickoutside')
    }

    provide(popoverInjectKey, { setTargetRef, bem, styleVars, triggerRef })
    return {
      visible,
      afterEnterHandler,
      afterLeaveHandler,
      show,
      hide,
      contentMouseenter,
      contentMouseleave,
      triggerMouseenter,
      triggerMouseleave,
      triggerClick,
      contentClickOutside
    }
  },
  render() {
    const {
      visible,
      afterEnterHandler,
      afterLeaveHandler,
      show,
      hide,
      contentMouseenter,
      contentMouseleave,
      triggerMouseenter,
      triggerMouseleave,
      triggerClick,
      contentClickOutside,
      $attrs,
      $props: {
        to,
        trigger,
        placement,
        width,
        showArrow,
        row,
        contentClass,
        contentStyle,
        arrowClass,
        arrowStyle,
        zIndex
      },
      $slots: { trigger: triggerSlot, default: defaultSlot }
    } = this

    return (
      <>
        <PopoverHijack
          trigger={trigger}
          onClick={triggerClick}
          onShow={show}
          onHide={hide}
          onMouseenter={triggerMouseenter}
          onMouseleave={triggerMouseleave}
        >
          {triggerSlot}
        </PopoverHijack>
        <Teleport to={'body'} disabled={!to}>
          <Transition
            name="popover-transition"
            onAfterEnter={afterEnterHandler}
            onAfterLeave={afterLeaveHandler}
            appear
          >
            {visible &&
              withDirectives(
                h(
                  PopoverBody,
                  {
                    ...$attrs,
                    placement,
                    width,
                    showArrow,
                    row,
                    contentClass,
                    contentStyle,
                    arrowClass,
                    arrowStyle,
                    onMouseenter: contentMouseenter,
                    onMouseleave: contentMouseleave
                  },
                  defaultSlot
                ),
                [
                  [clickOutside, contentClickOutside],
                  typeof zIndex === 'undefined' ? [zindexable] : [undefined]
                ]
              )}
          </Transition>
        </Teleport>
      </>
    )
  }
})

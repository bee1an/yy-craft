import {
  defineComponent,
  ExtractPropTypes,
  h,
  inject,
  PropType,
  withDirectives
} from 'vue'
import { popoverInjectKey } from './popover'

export const popoverHijackProps = {
  /** 触发方式 */
  trigger: {
    type: String as PropType<'click' | 'hover' | 'focus' | 'manual'>,
    default: 'click'
  }
}

export type PopoverHijackProps = ExtractPropTypes<typeof popoverHijackProps>

export const popoverHijackEmits = {
  show: (() => true) as (event: MouseEvent | FocusEvent) => void,
  hide: (() => true) as (event: MouseEvent | FocusEvent) => void
}

export type PopoverHijackEmits = typeof popoverHijackEmits

export default defineComponent({
  name: 'PopoverHijack',
  props: popoverHijackProps,
  emits: popoverHijackEmits,
  setup(props, { emit }) {
    const { setTargetRef } = inject(popoverInjectKey)!

    const triggerClickHandler = (event: MouseEvent) => {
      if (props.trigger === 'click') {
        emit('show', event)
      }
    }

    // TODO: hover会触发多次
    const triggerHoverHandler = (
      event: MouseEvent,
      state: 'enter' | 'leave'
    ) => {
      if (props.trigger === 'hover') {
        if (state === 'enter') {
          emit('show', event)
        } else {
          emit('hide', event)
        }
      }
    }

    const triggerFocusHandler = (
      event: FocusEvent,
      state: 'focus' | 'blur'
    ) => {
      if (props.trigger === 'focus') {
        if (state === 'focus') {
          emit('show', event)
        } else {
          emit('hide', event)
        }
      }
    }

    return {
      setTargetRef,
      triggerClickHandler,
      triggerHoverHandler,
      triggerFocusHandler
    }
  },

  render() {
    const {
      setTargetRef,
      triggerClickHandler,
      triggerHoverHandler,
      triggerFocusHandler,
      $props: { trigger },
      $slots: { default: defaultSlot }
    } = this

    return defaultSlot!().map((child, index) => {
      if (index) {
        return h(child)
      }

      const childProps: any = {
        onClick: triggerClickHandler,
        onMouseenter: (event: MouseEvent) =>
          triggerHoverHandler(event, 'enter'),
        onMouseleave: (event: MouseEvent) =>
          triggerHoverHandler(event, 'leave'),
        onFocus: (event: FocusEvent) => triggerFocusHandler(event, 'focus'),
        onBlur: (event: FocusEvent) => triggerFocusHandler(event, 'blur')
      }

      if (trigger === 'focus') {
        childProps.tabIndex = '0'
      }

      /** 使用指令的方式获取slot的dom, naive ui作者真的是甜菜 */
      return withDirectives(h(child, childProps), [[setTargetRef]])
    })
  }
})

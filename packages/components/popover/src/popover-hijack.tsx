import {
  defineComponent,
  ExtractPropTypes,
  h,
  inject,
  withDirectives
} from 'vue'
import { popoverInjectKey } from './popover'

export const popoverHijackProps = {}

export type PopoverHijackProps = ExtractPropTypes<typeof popoverHijackProps>

export const popoverHijackEmits = {
  trigger: (() => true) as (event: MouseEvent) => void
}

export type PopoverHijackEmits = typeof popoverHijackEmits

export default defineComponent({
  name: 'PopoverHijack',
  emits: popoverHijackEmits,

  setup() {
    const { setTargetRef } = inject(popoverInjectKey)!

    const setTargetDirective = {
      mounted: setTargetRef,
      updated: setTargetRef
    }

    return { setTargetDirective }
  },

  render() {
    const {
      setTargetDirective,
      $emit,
      $slots: { default: defaultSlot }
    } = this

    return defaultSlot!().map((child, index) => {
      if (index) {
        return h(child)
      }

      /** 使用指令的方式获取slot的dom, naive ui作者真的是甜菜 */
      return withDirectives(
        h(child, {
          onClick: (event: MouseEvent) => $emit('trigger', event)
        }),
        [[setTargetDirective]]
      )
    })
  }
})

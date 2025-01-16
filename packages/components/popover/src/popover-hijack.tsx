import { defineComponent, ExtractPropTypes, h } from 'vue'

export const popoverHijackProps = {}

export type PopoverHijackProps = ExtractPropTypes<typeof popoverHijackProps>

export const popoverHijackEmits = {
  trigger: (() => true) as (event: MouseEvent) => void
}

export type PopoverHijackEmits = typeof popoverHijackEmits

export default defineComponent({
  name: 'PopoverHijack',
  emits: popoverHijackEmits,
  render() {
    const {
      $emit,
      $slots: { default: defaultSlot }
    } = this

    return defaultSlot!().map((child, index) => {
      if (index) {
        return h(child)
      }
      return h(child, {
        onClick: (event: MouseEvent) => $emit('trigger', event)
      })
    })
  }
})

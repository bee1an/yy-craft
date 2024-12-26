import { PropType } from 'vue'

export const scrollbarInternalProps = {
  container: {
    type: Function as PropType<() => HTMLElement | null>
  },

  trigger: {
    type: String as PropType<'none' | 'hover'>,
    default: 'hover'
  }
}

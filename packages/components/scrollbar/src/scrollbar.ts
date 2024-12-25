import { ExtractPropTypes, PropType } from 'vue'

export const scrollbarProps = {
  trigger: {
    type: String as PropType<'none' | 'hover'>,
    default: 'hover'
  }
}

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>

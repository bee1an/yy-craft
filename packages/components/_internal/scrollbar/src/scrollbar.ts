import { PropType } from 'vue'
import { useThemeProps } from '@yy-ui/composables'
import { ScrollbarTheme } from '../style'

export const scrollbarInternalProps = {
  ...useThemeProps<ScrollbarTheme['vars']>(),

  container: {
    type: Function as PropType<() => HTMLElement | null>
  },

  trigger: {
    type: String as PropType<'none' | 'hover'>,
    default: 'hover'
  }
}

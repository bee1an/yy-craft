import { PropType } from 'vue'
import { useThemeProps } from '@yy-ui/composables'
import { ScrollbarTheme } from '@yy-ui/theme-chalk'

export const scrollbarInternalProps = {
  ...useThemeProps<ScrollbarTheme>(),

  container: {
    type: Function as PropType<() => HTMLElement | null>
  },

  trigger: {
    type: String as PropType<'none' | 'hover'>,
    default: 'hover'
  }
}

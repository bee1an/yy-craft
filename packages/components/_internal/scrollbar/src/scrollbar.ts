import { PropType } from 'vue'
import { useThemeProps } from '@yy-ui/composables'
import { ScrollbarThemeVars } from '@yy-ui/theme-chalk'

export const scrollbarInternalProps = {
  ...useThemeProps<ScrollbarThemeVars>(),

  container: {
    type: Function as PropType<() => HTMLElement | null>
  },

  trigger: {
    type: String as PropType<'none' | 'hover'>,
    default: 'hover'
  }
}

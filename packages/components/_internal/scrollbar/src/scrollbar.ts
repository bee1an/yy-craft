import type { ScrollbarThemeVars } from '@yy-craft/theme-chalk/src/scrollbar'
import type { PropType, StyleValue } from 'vue'
import { useThemeProps } from '@yy-craft/composables/use-theme'

export const scrollbarInternalProps = {
  ...useThemeProps<ScrollbarThemeVars>(),

  container: {
    type: Function as PropType<() => HTMLElement | null>,
  },

  trigger: {
    type: String as PropType<'none' | 'hover'>,
    default: 'hover',
  },
  /** 内容类名 */
  contentClass: null as unknown as PropType<any>,

  /** 内容样式 */
  contentStyle: null as unknown as PropType<StyleValue>,
}

type ScrollHandlerType = {
  (options?: ScrollToOptions): void
  (x?: number, y?: number): void
}

export interface ScrollbarExpose {
  scrollTo: ScrollHandlerType
  scrollBy: ScrollHandlerType
}

import { withInstall } from '@yy-ui/utils'
import ScrollBar from './src/scrollbar.vue'

const ScrollBarWithInstall = withInstall(ScrollBar)

export * from './src/scrollbar'
export { ScrollBarWithInstall, ScrollBar }
export default ScrollBarWithInstall

declare module 'vue' {
  export interface GlobalComponents {
    YyScrollBar: typeof ScrollBar
  }
}

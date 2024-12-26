import { withInstall } from '@yy-ui/utils'
import Scrollbar from './src/scrollbar.vue'

const ScrollbarWithInstall = withInstall(Scrollbar)

export * from './src/scrollbar'
export { ScrollbarWithInstall, Scrollbar }
export default ScrollbarWithInstall

declare module 'vue' {
  export interface GlobalComponents {
    YyScrollbar: typeof Scrollbar
  }
}

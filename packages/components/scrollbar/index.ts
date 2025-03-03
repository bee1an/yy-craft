import { withInstall } from '@yy-ui/utils/src/with-install'
import Scrollbar from './src/scrollbar.vue'

const scrollbarWithInstall = withInstall(Scrollbar)

export * from './src/scrollbar'
export { scrollbarWithInstall, Scrollbar }
export default Scrollbar

declare module 'vue' {
  export interface GlobalComponents {
    YyScrollbar: typeof Scrollbar
  }
}

import { withInstall } from '@yy-craft/utils/src/with-install'
import Scrollbar from './src/scrollbar.vue'

const scrollbarWithInstall = withInstall(Scrollbar)

export * from './src/scrollbar'
export { Scrollbar, scrollbarWithInstall }
export default Scrollbar

declare module 'vue' {
  export interface GlobalComponents {
    YyScrollbar: typeof Scrollbar
  }
}

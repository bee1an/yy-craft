import { withInstall } from '@yy-ui/utils'
import _Tree from './src/tree.vue'

const Tree = withInstall(_Tree)

export default Tree

declare module 'vue' {
  export interface GlobalComponents {
    YyTree: typeof _Tree
  }
}

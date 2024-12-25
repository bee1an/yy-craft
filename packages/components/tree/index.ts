import { withInstall } from '@yy-ui/utils'
import Tree from './src/tree.vue'

const TreeWithInstall = withInstall(Tree)

export * from './src/tree'
export * from './src/tree-node'
export { TreeWithInstall, Tree }
export default Tree

declare module 'vue' {
  export interface GlobalComponents {
    YyTree: typeof Tree
  }
}

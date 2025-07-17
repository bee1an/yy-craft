import { withInstall } from '@yy-craft/utils/src/with-install'
import Tree from './src/tree.vue'

const treeWithInstall = withInstall(Tree)

export * from './src/tree'
export * from './src/tree-node'
export { treeWithInstall, Tree }
export default Tree

declare module 'vue' {
	export interface GlobalComponents {
		YyTree: typeof Tree
	}
}

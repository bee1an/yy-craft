import type { TreeData } from './tree'

/** 查找TreeNodeWrapper */
export const findTreeNodeWrapper = (
	target: HTMLElement,
	findedCondition: (target: HTMLElement) => boolean
): HTMLElement | null => {
	if (!target) return null
	if (!findedCondition(target)) {
		return findTreeNodeWrapper(target.parentElement!, findedCondition)
	}
	return target
}

/** 查找父元素 */
export const findParentNode = (tree: TreeData[], node: TreeData | null): TreeData | null => {
	if (!node) return null

	return tree.find((item) => item.children?.includes(node)) ?? null
}

/** 判断是否是祖先元素 */
export const isAncestorNode = (tree: TreeData[], node: TreeData, target: TreeData): boolean => {
	if (node === target) return false

	const parentNode = findParentNode(tree, target)

	if (!parentNode) return false

	if (parentNode === node) return true

	return isAncestorNode(tree, node, parentNode)
}

/** 获取子节点 */
export const getChildren = <T extends { children?: T[] }>(data: T[], treeNode?: T | null) => {
	return treeNode?.children ?? data
}

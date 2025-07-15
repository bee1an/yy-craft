import type { Ref } from 'vue'
import type { TreeData, TreeEmits, TreeProps } from './tree'
import { CreateNamespace } from '@yy-ui/utils/src/create'
import { findParentNode, findTreeNodeWrapper, getChildren, isAncestorNode } from './utils'

/** 缩进到内容的距离, 用于判断是否drag到缩进 */
const DISTANCE = 16
/** 主要区域的范围取值 */
const MAINZONERANGE = 0.7

const useDragNode = (
	tree: Ref<TreeData[]>,
	nameSpace: CreateNamespace,
	props: TreeProps,
	// FIXME: emits: TreeEmits
	emits: any
) => {
	let dragNode: TreeData | null = null
	const onDragstart = (e: DragEvent, node: TreeData) => {
		dragNode = node
	}

	let presentNode: TreeData | null = null
	const onDragenter = (e: DragEvent, node: TreeData) => {
		if (presentNode === node) return

		clearDragBorder()

		presentNode = node
	}

	/* 
		拖到节点上的判断
			# drag节点: 被拖动的节点
			# drop节点: 被拖放的节点
			# leaf节点: isLeaf属性为true(children属性不为undefined)的节点
			# branch节点: 有子节点或者将有子节点(children属性不为undefined)的节点
			# flat节点: leaf节点	或者没有展开的branch节点	或者展开但是没有子节点的branch节点

				1. drop位置在drop节点的主要区域(上方70%位置)
						drop节点是branch节点
							# drop节点不是flat节点, 长时间(3秒)未drop(为松开鼠标)则展开drop节点
							# drop直接添加到children开头
						drop节点是leaf节点
							# 拖动到drop节点所有区域都相当于 -> drop位置在drop节点底部边缘
				2. drop位置在drop节点底部边缘
						drop位置在drop节点底部边缘且在缩进上(拖拽到外部的逻辑)
								drop节点是他父元素的children的最后一个且drop节点是flat节点
									# 将darg节点添加到drop节点父元素的后面
								drop节点不是他父元素的children的最后一个或者drop节点不是flat节点, 则相当于 -> drop位置在drop节点底部边缘且不在缩进上
						drop位置在drop节点底部边缘且不在缩进上
								drop节点是branch节点
									# drop节点是flat节点, 添加到drop节点后
									# drop节点不是不是flat节点, 添加到drop节点的children开头
								drop节点是leaf节点
									# 添加到drop节点后
				3. drop节点为自身
							drop节点不是flat节点
								# 什么都不做
							drop节点是flat节点
								# 拖动到drop节点所有区域都相当于 -> drop位置在drop节点底部边缘
				4. 不能drop到自己的子节点
	*/
	let dropNode: TreeData | null = null
	let position: number = -1

	function onDragover(e: DragEvent, node: TreeData) {
		const target = e.target as HTMLElement

		clearDragBorder()

		// 如果drag节点是drop节点的祖先节点, 则不处理
		if (isAncestorNode(tree.value, dragNode!, node)) return

		const treeNodeWrapper = findTreeNodeWrapper(target as HTMLElement, (e) =>
			e.classList.contains(nameSpace.b('node').b('wrapper').value)
		)

		if (!treeNodeWrapper) return

		const { top, left, height, width } = treeNodeWrapper.getBoundingClientRect()

		const preSentIndentWidth = props.indentWidth * (node.level - 1)

		const offsetInWrapperX = e.clientX - left,
			offsetInWrapperY = e.clientY - top

		// 主要区域
		const mainZone = height * MAINZONERANGE

		const parentNode = findParentNode(tree.value, node)

		// 可以拖放进节点内部的条件
		const canAdd2Children =
			offsetInWrapperY <= mainZone && // 在节点主要区域
			!node.isLeaf && // 不是叶子节点
			dragNode !== node // 不是拖拽节点本身

		// 添加到子节点开头
		const add2ChildrenBeginning = () => {
			dropNode = node
			position = 0
		}

		// 添加到指定节点之后
		const add2NodeAfter = (presentParentNode: TreeData | null, presentNode: TreeData | null) => {
			dropNode = presentParentNode
			position =
				getChildren(props.data, presentParentNode).findIndex(
					(item) => item.key === presentNode?.key
				) + 1
		}

		// flat节点
		const isFlat = !node.isExpanded || !node.children?.length
		// drag节点为drop节点
		const dragIsDrop = dragNode === node

		const doNothing = dragIsDrop && !isFlat

		if (canAdd2Children || doNothing) {
			node.dragBorder = true

			if (!doNothing) {
				// 将drag节点添加到drop节点的children开头
				// console.log('canAdd2Children')
				// dropNode = node
				// position = 0
				add2ChildrenBeginning()
			} else {
				// console.log('doNothing')
				dropNode = null
				position = -1
			}
		} else {
			node.dragBorderBottom = width - preSentIndentWidth - DISTANCE

			if (!dragIsDrop && !isFlat) {
				// drag节点不是drop节点并且不是单层节点, 则选中当前节点
				// leaf节点不能展开，所以不需要判断
				node.dragBorder = true

				// 将drag节点添加到drop节点的children开头
				// console.log('canAdd2Children with dragBorderBottom')
				// dropNode = node
				// position = 0
				add2ChildrenBeginning()
			} else {
				const children = parentNode?.children ?? []

				const add2ParentAfter =
					children[children.length - 1] === node && // 当前drop节点为最后一个节点
					offsetInWrapperX < width - node.dragBorderBottom - DISTANCE // 当前拖动位置在缩进上
				if (add2ParentAfter) {
					node.dragBorderBottom += DISTANCE
					const ancestorNode = findParentNode(tree.value, parentNode)
					if (ancestorNode) {
						ancestorNode.dragBorder = true
					}

					// 将drag节点添加到drop节点的父节点的后面
					// console.log('canAdd2AncestorNode')
					// dropNode = ancestorNode
					// position =
					//   getChildren(props.data, ancestorNode).findIndex(
					//     item => item.key === parentNode?.key
					//   ) + 1
					add2NodeAfter(ancestorNode, parentNode)
				} else {
					if (parentNode) {
						parentNode.dragBorder = true
					}

					// 将drag节点添加到drop节点的后面
					// console.log('canAdd2AfterDrop')
					// dropNode = parentNode
					// position =
					//   getChildren(props.data, parentNode).findIndex(
					//     item => item.key === node.key
					//   ) + 1
					add2NodeAfter(parentNode, node)
				}
			}
		}
	}

	const onDrop = () => {
		if (dropNode === null && position === -1) {
			// do nothing
			return
		}

		const dragNodeParent = findParentNode(tree.value, dragNode)

		emits('drag', {
			dragNode: dragNode!.rawData,
			dragNodeParent: dragNodeParent?.rawData ?? null,
			dropNode: dropNode?.rawData ?? null,
			position
		})
	}

	const onDragend = () => clearDragBorder()

	const clearDragBorder = () => {
		tree.value.forEach((item) => {
			item.dragBorder = false
			item.dragBorderBottom = 0
		})
	}

	return {
		onDragstart,
		onDragenter,
		onDragover,
		onDrop,
		onDragend
	}
}

export default useDragNode

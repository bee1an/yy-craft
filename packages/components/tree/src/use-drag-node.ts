import { CreateNamespace } from '@yy-ui/utils'
import { TreeData } from './tree'
import { findParentNode, findTreeNodeWrapper, isAncestorNode } from './utils'
import { Ref } from 'vue'

const useDragNode = (
  tree: Ref<TreeData[]>,
  indentWidth: number,
  nameSpace: CreateNamespace,
  iconSize: number
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

  const onDragleave = (e: DragEvent) => {}

  /* 
		拖到节点上的判断
			# drag节点: 被拖动的节点
			# drop节点: 被拖放的节点

				drop位置在drop节点的主要区域(上方70%位置)
					drop节点是非leaf节点
						# drop节点未展开, 长时间未drop(松开鼠标)则展开drop节点
						# drop直接添加到children开头
					drop节点是leaf节点
						# 拖动到drop节点所有区域都相当于 -> drop位置在drop节点底部边缘
				drop位置在drop节点底部边缘
					drop节点是非leaf节点
						# drop节点未展开, 添加到drop节点后
						# drop节点展开, 添加到drop节点的children开头
					drop节点是leaf节点
						# 添加到drop节点后
					drop位置在drop节点缩进上(拖拽到外部的逻辑)
						drop节点是他父元素的children的最后一个
							# 将darg节点添加到drop节点父元素的后面
				drop节点为自身
					# 拖动到drop节点所有区域都相当于 -> drop位置在drop节点底部边缘
	*/
  let children: TreeData[] | null = null
  let position: number = 0

  function onDragover(e: DragEvent, node: TreeData) {
    const target = e.target as HTMLElement

    clearDragBorder()

    // 如果drag节点是drop节点的祖先节点, 则不处理
    if (isAncestorNode(tree.value, dragNode!, node)) return

    const treeNodeWrapper = findTreeNodeWrapper(target as HTMLElement, e =>
      e.classList.contains(nameSpace.b('node').b('warpper').value)
    )

    if (!treeNodeWrapper) return

    const { top, left, height, width } = treeNodeWrapper.getBoundingClientRect()

    const preSentIndentWidth = indentWidth * (node.level - 1)

    const offsetInWrapperX = e.clientX - left,
      offsetInWrapperY = e.clientY - top

    // 主要区域
    const mainZone = height * 0.7

    const parentNode = findParentNode(tree.value, node)

    // 可以拖放进节点内部的条件
    const canAdd2Children =
      offsetInWrapperY <= mainZone && // 在节点主要区域
      !node.isLeaf && // 不是叶子节点
      dragNode !== node // 不是拖拽节点本身

    // drop节点展开且drag节点等于drop节点, 则什么都不做
    const doNothing = node.isExpanded && dragNode === node

    if (canAdd2Children || doNothing) {
      node.dragBorder = true

      if (!doNothing) {
        // 将drag节点添加到drop节点的children开头
        children = parentNode?.children || tree.value
        position = 0
      }
    } else {
      node.dragBorderBottom = width - preSentIndentWidth - iconSize

      if (node.isExpanded) {
        // drop节点是展开的, 则选中当前节点
        // 将drag节点添加到drop节点的children开头
        // leaf节点不能展开，所以不需要判断
        node.dragBorder = true
      } else {
        if (parentNode) {
          const children = parentNode.children ?? []
          const isLastChild = children[children.length - 1] === node
          if (
            isLastChild &&
            offsetInWrapperX < width - node.dragBorderBottom - iconSize
          ) {
            // 如果当前节点是最后一个子节点，并且拖拽位置在节点的缩进上
            // 将drag节点添加到drop节点的父节点的后面
            node.dragBorderBottom += iconSize

            const ancestorNode = findParentNode(tree.value, parentNode)
            if (ancestorNode) {
              ancestorNode.dragBorder = true
            }
          } else {
            // 将drag节点添加到drop节点的后面
            parentNode.dragBorder = true
          }
        }
      }
    }
  }

  const onDrop = (e: DragEvent, node: TreeData) => {
    clearDragBorder()
  }

  const clearDragBorder = () => {
    tree.value.forEach(item => {
      item.dragBorder = false
      item.dragBorderBottom = 0
    })
  }

  return {
    onDragstart,
    onDragenter,
    onDragleave,
    onDragover,
    onDrop
  }
}

export default useDragNode

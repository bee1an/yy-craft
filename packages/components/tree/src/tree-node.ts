import { PropType } from 'vue'
import { TreeData } from './tree'

export const treeNodeProps = {
  /** TreeData */
  node: {
    type: Object as PropType<TreeData>,
    required: true
  },
  /** 缩进宽度 */
  indentWidth: {
    type: Number,
    default: 21
  },
  /** 是否可拖动 */
  draggable: {
    type: Boolean,
    default: false
  }
} as const

export type TreeNodeEmitsType = {
  /** 切换展开 */
  (e: 'toggleExpand', node: TreeData): void
  /** 切换选中 */
  (e: 'toggleSelect', node: TreeData): void
  /** dragstart */
  (e: 'dragstart', event: DragEvent, node: TreeData): void
  /** dragenter */
  (e: 'dragenter', event: DragEvent, node: TreeData): void
  /** dragover */
  (e: 'dragover', event: DragEvent, node: TreeData): void
  /** drop */
  (e: 'drop', event: DragEvent, node: TreeData): void
  /** dragend */
  (e: 'dragend', event: DragEvent, node: TreeData): void
}

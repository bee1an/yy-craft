import type { PropType } from 'vue'
import type { TreeData } from './tree'

export const treeNodeProps = {
  /** TreeData */
  node: {
    type: Object as PropType<TreeData>,
    required: true,
  },
  /** 缩进宽度 */
  indentWidth: {
    type: Number,
    default: 21,
  },
  /** 是否可拖动 */
  draggable: {
    type: Boolean,
    default: false,
  },
} as const

export const treeNodeEmits = {
  /** 切换展开 */
  toggleExpand: (() => true) as (node: TreeData) => void,
  /** 切换选中 */
  toggleSelect: (() => true) as (node: TreeData) => void,
  /** dragstart */
  dragstart: (() => true) as (event: DragEvent, node: TreeData) => void,
  /** dragenter */
  dragenter: (() => true) as (event: DragEvent, node: TreeData) => void,
  /** dragover */
  dragover: (() => true) as (event: DragEvent, node: TreeData) => void,
  /** drop */
  drop: (() => true) as (event: DragEvent, node: TreeData) => void,
  /** dragend */
  dragend: (() => true) as (event: DragEvent, node: TreeData) => void,
}

export type TreeNodeEmits = typeof treeNodeEmits

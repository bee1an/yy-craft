import { CreateNamespace } from '@yy-ui/utils'
import { ExtractPropTypes, InjectionKey, PropType, SetupContext } from 'vue'

/** inject Bem */
export const InjectBem = Symbol('InjectBem') as InjectionKey<CreateNamespace>

// key type
export type TreeKey = string

// value type
export type TreeValue = string | number

// transform tree data
export interface TreeData extends TreeOption {
  /** 原始数据 */
  rawData: TreeOption
  /** 等级 */
  level: number
  /** 子元素 */
  children?: TreeData[]
  /** 是否是叶子节点 */
  isLeaf: boolean
  /** 是否展开 */
  isExpanded: boolean
  /** 是否正在加载 */
  isLoading: boolean
  /** 是否选中 */
  isSelected: boolean
  /** 是否有节点被拖拽到当前节点上 */
  dragBorder?: boolean
  /** 是否有节点被拖拽到当前节点边缘 */
  dragBorderBottom?: number
}

export interface TreeOption {
  /** 对应的值 */
  value: TreeValue
  /** 唯一key */
  key: TreeKey
  /** 子元素 */
  children?: TreeOption[]
  /** 是否是叶子节点 */
  isLeaf?: boolean
  /** 允许其他名字 */
  [key: string]: unknown
}
export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    required: true
  },
  /** 值别名 */
  valueField: {
    type: String,
    default: 'value'
  },
  /** key别名 */
  keyField: {
    type: String,
    default: 'key'
  },
  /** 默认展开key */
  defaultExpandedKeys: {
    type: Array as PropType<TreeKey[]>
  },
  /** 异步加载子元素 */
  onLoad: {
    type: Function as PropType<(node: TreeOption) => Promise<any>>
  },
  /** 是否可以选中 */
  selectable: {
    type: Boolean,
    default: false
  },
  /** 是否可以多选 */
  multiple: {
    type: Boolean,
    default: false
  },
  /** 选中key */
  selectedKeys: {
    type: Array as PropType<TreeKey[]>
  },
  /** 缩进宽度 */
  indentWidth: {
    type: Number,
    default: 21
  }
} as const
export type TreeProps = ExtractPropTypes<typeof treeProps>

export type TreeEmitsType = {
  /** v-model */
  (e: 'update:selectedKeys', value: TreeKey[]): void
}

/** 传递插槽给后代组件 */
export const InjectSlots = Symbol('InjectSlots') as InjectionKey<{
  slots: SetupContext['slots']
}>

/************************************************************************* */
// export interface TreeNodeData {
//   /** 对应的值 */
//   value: TreeValue
//   /** 唯一key */
//   key: TreeKey
//   /** 等级 */
//   level: number
// }
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
}

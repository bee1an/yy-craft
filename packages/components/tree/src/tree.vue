<script setup lang="ts">
import { CreateNamespace } from '@yy-ui/utils/src/create'
import TreeNode from './tree-node.vue'
import { provide, ref, useSlots, type VNode, watch } from 'vue'
import {
  InjectBem,
  InjectSlots,
  treeEmits,
  type TreeData,
  type TreeKey,
  type TreeOption,
  treeProps,
  type TreeValue
} from './tree'
import useDragNode from './use-drag-node'
import { GenericVirtualList } from '@yy-ui/components/virtual-list'
// import { GenericVirtualList } from '../../virtual-list/src/virtual-list'
import { useTheme } from '@yy-ui/composables/use-theme'
import { treeDark, treeLight, treeStyle } from '@yy-ui/theme-chalk/src/tree'

const YyVirtualList = GenericVirtualList<TreeData>()

defineOptions({ name: 'Tree' })

const props = defineProps(treeProps)
const emits = defineEmits(treeEmits)

// 展开的节点
const expandedKeys = ref(new Set())
watch(
  () => props.defaultExpandedKeys,
  (newVal) => {
    newVal?.forEach((key) => expandedKeys.value.add(key))
  },
  { immediate: true }
)

const tree = ref<TreeData[]>([])
// 展开节点(数据扁平化)
const createTree = (data: TreeOption[], level = 0) => {
  if (!level) {
    console.log('createTree')
  }
  const flattenData: TreeData[] = []
  const treeData: TreeData[] = []
  const presentLevel = level + 1
  data.forEach((item) => {
    const isLeaf = item.isLeaf ?? !item.children
    const key = item[props.keyField] as TreeKey
    const node: TreeData = {
      value: item[props.valueField] as TreeValue,
      key,
      rawData: item,
      level: presentLevel,
      // 没有指定这个节点是不是叶子节点时，根据是否有子节点来判断
      isLeaf: item.isLeaf ?? !item.children,
      // 不是叶子节点时才可以展开
      isExpanded: !isLeaf && expandedKeys.value.has(key),
      isLoading: false,
      isSelected: !!(props.selectable && props.selectedKeys?.includes(key))
    }

    // 递归子节点
    const branch = createTree(item.children || [], presentLevel)
    // 有子节点则赋值
    branch.treeData.length && (node.children = branch.treeData)

    flattenData.push(node)
    treeData.push(node)

    node.isExpanded
      ? flattenData.push(...branch.flattenData)
      : expandedKeys.value.delete(key)
  })

  return { flattenData, treeData }
}
watch(
  () => props.data,
  () => {
    tree.value = createTree(props.data).flattenData
    // console.log('props.data changed', tree.value)
  },
  { immediate: true }
)

// 切换展开状态
const expand = async (node: TreeData) => {
  if (node.isLoading) {
    return
  }
  expandedKeys.value.add(node.key)

  // 如果节点没有子节点并且不是叶子节点时，则触发加载子节点
  if (typeof node.children === 'undefined' && !node.isLeaf && props.onLoad) {
    node.isLoading = true
    await props.onLoad(node.rawData)
    node.isLoading = false
  }

  tree.value = createTree(props.data).flattenData
}
const collapse = (node: TreeData) => {
  if (node.isLoading) {
    return
  }
  expandedKeys.value.delete(node.key)
  tree.value = createTree(props.data).flattenData
}
const toggleExpand = (node: TreeData) => {
  if (node.isLeaf) return
  node.isExpanded ? collapse(node) : expand(node)
}

// 选中的节点
const selectedKeys = ref(new Set(props.selectedKeys))
const clearSelected = () => {
  tree.value.forEach((item) => {
    item.isSelected = false
  })
  selectedKeys.value = new Set()
}
// 切换选中状态
const toggleSelect = (node: TreeData) => {
  if (!props.selectable) {
    return
  }

  if (node.isSelected) {
    selectedKeys.value.delete(node.key)
  } else {
    // 不能多选, 清空选中
    !props.multiple && clearSelected()
    selectedKeys.value.add(node.key)
  }
  node.isSelected = !node.isSelected

  emits('update:selectedKeys', Array.from(selectedKeys.value))
}

// bem
const nameSpace = new CreateNamespace('tree')
provide(InjectBem, nameSpace)

// 定义插槽
defineSlots<{ default(slotProps: { node: TreeData }): VNode[] }>()
// 将插槽传递给子组件
provide(InjectSlots, { slots: useSlots() })

const { onDragstart, onDragenter, onDragover, onDrop, onDragend } = useDragNode(
  tree,
  nameSpace,
  props,
  emits
)

const { styleVars } = useTheme(
  { light: treeLight.vars(), dark: treeDark.vars() },
  'tree',
  treeStyle,
  props
)
</script>

<template>
  <div :style="styleVars" :class="nameSpace.b().value">
    <yy-virtual-list
      :virtual-scroll="props.virtualScroll"
      :scrollbar-props="props.scrollbarProps"
      v-bind="props.virtualListProps"
      :data="tree"
    >
      <template #default="{ item }">
        <tree-node
          :data-set-key="item.key"
          :key="item.key"
          :node="item"
          :indent-width="indentWidth"
          @toggle-expand="toggleExpand"
          @toggle-select="toggleSelect"
          @dragenter="onDragenter"
          @dragover="onDragover"
          @drop="onDrop"
          @dragstart="onDragstart"
          @dragend="onDragend"
          :draggable="draggable"
        >
        </tree-node>
      </template>
    </yy-virtual-list>
  </div>
</template>

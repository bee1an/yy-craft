<script setup lang="ts">
import type { VNode } from 'vue'
import type { TreeData, TreeKey, TreeOption, TreeValue } from './tree'
import { GenericVirtualList } from '@yy-craft/components/virtual-list'
// import { GenericVirtualList } from '../../virtual-list/src/virtual-list'
import { useTheme } from '@yy-craft/composables/use-theme'
import { treeDark, treeLight, treeStyle } from '@yy-craft/theme-chalk/src/tree'
import { CreateNamespace } from '@yy-craft/utils/src/create'
import { provide, ref, useSlots, watch } from 'vue'
import { InjectBem, InjectSlots, treeEmits, treeProps } from './tree'
import TreeNode from './tree-node.vue'
import useDragNode from './use-drag-node'

defineOptions({ name: 'Tree' })

const props = defineProps(treeProps)

const emits = defineEmits(treeEmits)

// 定义插槽
defineSlots<{ default: (slotProps: { node: TreeData }) => VNode[] }>()

const YyVirtualList = GenericVirtualList<TreeData>()

// 展开的节点
const expandedKeys = ref(new Set())
watch(
  () => props.defaultExpandedKeys,
  (newVal) => {
    newVal?.forEach(key => expandedKeys.value.add(key))
  },
  { immediate: true },
)

const tree = ref<TreeData[]>([])
// 展开节点(数据扁平化)
function createTree(data: TreeOption[], level = 0) {
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
      isSelected: !!(props.selectable && props.selectedKeys?.includes(key)),
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
  },
  { immediate: true },
)

// 切换展开状态
async function expand(node: TreeData) {
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
function collapse(node: TreeData) {
  if (node.isLoading) {
    return
  }
  expandedKeys.value.delete(node.key)
  tree.value = createTree(props.data).flattenData
}
function toggleExpand(node: TreeData) {
  if (node.isLeaf)
    return
  node.isExpanded ? collapse(node) : expand(node)
}

// 选中的节点
const selectedKeys = ref(new Set(props.selectedKeys))
function clearSelected() {
  tree.value.forEach((item) => {
    item.isSelected = false
  })
  selectedKeys.value = new Set()
}
// 切换选中状态
function toggleSelect(node: TreeData) {
  if (!props.selectable) {
    return
  }

  if (node.isSelected) {
    selectedKeys.value.delete(node.key)
  }
  else {
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

// 将插槽传递给子组件
provide(InjectSlots, { slots: useSlots() })

const { onDragstart, onDragenter, onDragover, onDrop, onDragend } = useDragNode(
  tree,
  nameSpace,
  props,
  emits,
)

const { styleVars } = useTheme(
  { light: treeLight.vars(), dark: treeDark.vars() },
  'tree',
  treeStyle,
  props,
)
</script>

<template>
  <div :style="styleVars" :class="nameSpace.b().value">
    <YyVirtualList
      :virtual-scroll="props.virtualScroll"
      :scrollbar-props="props.scrollbarProps"
      v-bind="props.virtualListProps"
      :data="tree"
    >
      <template #default="{ item }">
        <TreeNode
          :key="item.key"
          :data-set-key="item.key"
          :node="item"
          :indent-width="indentWidth"
          :draggable="draggable"
          @toggle-expand="toggleExpand"
          @toggle-select="toggleSelect"
          @dragenter="onDragenter"
          @dragover="onDragover"
          @drop="onDrop"
          @dragstart="onDragstart"
          @dragend="onDragend"
        />
      </template>
    </YyVirtualList>
  </div>
</template>

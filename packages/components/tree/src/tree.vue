<script setup lang="ts">
import { CreateNamespace } from '@yy-ui/utils'
import TreeNode from './tree-node.vue'
import { provide, ref, useSlots, VNode, watch } from 'vue'
import {
  InjectBem,
  InjectSlots,
  TreeData,
  TreeEmitsType,
  TreeKey,
  TreeOption,
  treeProps,
  TreeValue
} from './tree'

defineOptions({ name: 'yy-tree' })

const props = defineProps(treeProps)
const emits = defineEmits<TreeEmitsType>()

// 展开的节点
const expandedKeys = ref(new Set())
watch(
  () => props.defaultExpandedKeys,
  newVal => {
    newVal?.forEach(key => expandedKeys.value.add(key))
  },
  { immediate: true }
)

const tree = ref<TreeData[]>([])
// 展开节点(数据扁平化)
const createTree = (data: TreeOption[], isExpanded = true, level = 0) => {
  if (!level) {
    console.log('createTree')
  }
  const flattenData: TreeData[] = []
  const treeData: TreeData[] = []
  const presentLevel = level + 1
  data.forEach(item => {
    const childrenLength = item.children && item.children.length !== 0

    const node: TreeData = {
      value: item[props.valueField] as TreeValue,
      key: item[props.keyField] as TreeKey,
      rawData: item,
      level: presentLevel,
      isLeaf: item.isLeaf ?? !childrenLength,
      isExpanded: !!(
        isExpanded &&
        childrenLength &&
        expandedKeys.value.has(item.key)
      ),
      isLoading: false,
      isSelected: !!(props.selectable && props.selectedKeys?.includes(item.key))
    }

    // 递归子节点
    const branch = createTree(
      item.children || [],
      node.isExpanded,
      presentLevel
    )
    // 有子节点则赋值
    branch.treeData.length && (node.children = branch.treeData)

    flattenData.push(node)
    treeData.push(node)

    node.isExpanded
      ? flattenData.push(...branch.flattenData)
      : expandedKeys.value.delete(item.key)
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
  if (typeof node.children === 'undefined' && !node.isLeaf) {
    node.isLoading = true
    await props.onLoad!(node.rawData)
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
  tree.value.forEach(item => {
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
</script>

<template>
  <div :class="nameSpace.b().value">
    <tree-node
      v-for="item in tree"
      :key="item.key"
      :node="item"
      @toggleExpand="toggleExpand"
      @toggleSelect="toggleSelect"
    >
    </tree-node>
  </div>
</template>

<script setup lang="ts">
import { TreeOption } from '@yy-ui/components/tree/src/tree'
import { getChildren } from '@yy-ui/components/tree/src/utils'
import { ref } from 'vue'

const texts = [
  '不要因为走得太远而忘记为什么出发',
  '生活就像海洋，只有意志坚强的人才能到达彼岸',
  '成功不是将来才有的，而是从现在开始努力，一步一步累积而成',
  '不要等待机会，而要创造机会',
  '只有不断学习，才能不断进步',
  '人生就像一场马拉松，不在乎速度，而在乎坚持'
]

const createData = (
  deep: number,
  count: number,
  prefix = ''
): any[] | undefined => {
  if (deep === 0) {
    return undefined
  }
  return Array(count)
    .fill(0)
    .map((_, i) => ({
      xx: `${
        texts[Math.floor(Math.random() * texts.length)]
      } label-${prefix}${i}`,
      key: `${prefix}${i}`,
      children: createData(deep - 1, count, `${prefix}${i}-`)
    }))
}

const data = ref<any[]>([])
data.value.push(...(createData(2, 10) as any[]))

// const createData = () => {
//   return [
//     {
//       xx: 'label-0',
//       key: '0',
//       isLeaf: false
//     }
//   ]
// }
// const data = ref<any[]>([])
// data.value.push(...createData())
// const onLoad = (treeNode: TreeOption) => {
//   return new Promise<void>(resolve => {
//     setTimeout(() => {
//       treeNode.children = [
//         {
//           xx: 'label-' + treeNode.key + '-0',
//           key: treeNode.key + '-0',
//           isLeaf: false
//         },
//         {
//           xx: 'label-' + treeNode.key + '-1',
//           key: treeNode.key + '-1',
//           isLeaf: false
//         }
//       ] as any[]
//       resolve()
//     }, 100)
//   })
// }

// ['0', '0-0', '0-0-0', '0-0-0-0']
const expandedKeys = ref([])

const selectedKeys = ref<string[]>([])

const onDrag = (value: {
  dragNode: TreeOption
  dragNodeParent: TreeOption | null
  dropNode: TreeOption | null
  position: number
}) => {
  const { dragNode, dragNodeParent, dropNode, position } = value

  // *切记先添加再删除
  const dropNodePool = getChildren(data.value, dropNode)
  const dragNodePool = getChildren(data.value, dragNodeParent)

  if (dropNodePool === dragNodePool) {
    // 同数组操作
    const index = dragNodePool.findIndex(item => item.key === dragNode.key)

    if (position - 1 === index) return

    dropNodePool.splice(position, 0, dragNode)
    // position - 1 > index向后拖动, 影响了原index位置
    dropNodePool.splice(position - 1 > index ? index : index + 1, 1)
  } else {
    dropNodePool.splice(position, 0, dragNode)
    const index = dragNodePool.findIndex(item => item.key === dragNode.key)
    dragNodePool.splice(index, 1)
  }

  data.value = [...data.value]
}
</script>

<template>
  <yy-tree
    v-model:selectedKeys="selectedKeys"
    :data="data"
    :default-expanded-keys="expandedKeys"
    value-field="xx"
    selectable
    multiple
    draggable
    @drag="onDrag"
  >
  </yy-tree>
</template>

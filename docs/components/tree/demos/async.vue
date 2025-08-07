<script setup lang="ts">
import type { TreeOption } from '@yy-craft/components/tree'
import { ref } from 'vue'

const data = ref([
  {
    value: '根节点',
    key: '0',
    isLeaf: false,
  },
] as TreeOption[])

function onLoad(node: TreeOption) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      const children = [
        {
          value: `节点 ${node.key}-0`,
          key: `${node.key}-0`,
          isLeaf: false,
        },
        {
          value: `节点 ${node.key}-1`,
          key: `${node.key}-1`,
          isLeaf: false,
        },
      ] as any[]
      node.children = children
      resolve()
    }, 1000)
  })
}
</script>

<template>
  <yy-tree :data="data" :on-load="onLoad" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createData } from './utils'

// 生成大量数据
const data = ref(createData(3, 10)!)

const defaultExpandedKeys = ref([] as string[])

function add(prefix?: string) {
  for (let i = 0; i < 10; i++) {
    defaultExpandedKeys.value.push(`${prefix ? `${prefix}-` : ''}${i}`)
    if (!prefix) {
      add(`${i}`)
    }
  }
}

add()
</script>

<template>
  <yy-tree
    :data="data"
    virtual-scroll
    :default-expanded-keys="defaultExpandedKeys"
    :virtual-list-props="{ wrapperMaxSize: 300 }"
  />
</template>

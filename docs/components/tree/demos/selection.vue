<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  {
    value: '选项1',
    key: '1',
    children: [
      {
        value: '选项1-1',
        key: '1-1',
      },
      {
        value: '选项1-2',
        key: '1-2',
        children: [
          {
            value: '选项1-2-1',
            key: '1-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '选项2',
    key: '2',
    children: [
      {
        value: '选项2-1',
        key: '2-1',
      },
    ],
  },
])

const selectedKeys = ref(['1'])
</script>

<template>
  <yy-flex vertical>
    <yy-p>单选模式：</yy-p>
    <yy-tree v-model:selected-keys="selectedKeys" :data="data" selectable />

    <yy-p>多选模式：</yy-p>
    <yy-tree :data="data" selectable multiple />
  </yy-flex>
</template>

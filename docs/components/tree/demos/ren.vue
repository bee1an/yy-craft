<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  {
    anyValue: '选项1',
    anyKey: '1',
    children: [
      {
        anyValue: '选项1-1',
        anyKey: '1-1',
      },
      {
        anyValue: '选项1-2',
        anyKey: '1-2',
        children: [
          {
            anyValue: '选项1-2-1',
            anyKey: '1-2-1',
          },
        ],
      },
    ],
  },
  {
    anyValue: '选项2',
    anyKey: '2',
    children: [
      {
        anyValue: '选项2-1',
        anyKey: '2-1',
      },
    ],
  },
] as any[])
</script>

<template>
  <yy-tree :data="data" key-field="anyKey" value-field="anyValue" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ref([
  { label: '选项1', key: '1' },
  { label: '选项2', key: '2' },
  { label: '选项3', key: '3' },
])
</script>

<template>
  <yy-dropdown :options="options">
    <yy-button>下拉菜单</yy-button>
  </yy-dropdown>
</template>

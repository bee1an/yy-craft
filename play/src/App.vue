<script setup lang="ts">
import IconTest from './components/icon-test.vue'
import TreeTest from './components/tree-test.vue'
import VirtualListTest from './components/virtual-list-test.vue'
import ScrollbarTest from './components/scrollbar-test.vue'
</script>

<template>
  <div class="padding"></div>
  <ScrollbarTest />
  <VirtualListTest />
  <TreeTest />
  <IconTest />
</template>

<style scoped>
.padding {
  padding-top: 100px;
}
</style>

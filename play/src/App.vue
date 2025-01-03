<script setup lang="ts">
import IconTest from './components/icon-test.vue'
import TreeTest from './components/tree-test.vue'
import VirtualListTest from './components/virtual-list-test.vue'
import ScrollbarTest from './components/scrollbar-test.vue'
import CheckboxTest from './components/checkbox-test.vue'
import ButtonTest from './components/button-test.vue'
</script>

<template>
  <!-- <div class="padding"></div> -->
  <yy-scrollbar trigger="none">
    <TreeTest />
    <ButtonTest />
    <CheckboxTest />
    <ScrollbarTest />
    <VirtualListTest />
    <IconTest />
  </yy-scrollbar>
</template>

<style>
.padding {
  padding-top: 100px;
}

#app {
  height: 100vh;
  overflow: hidden;
}

body {
  padding: 0;
  margin: 0;
}
</style>

<script setup lang="ts">
import IconTest from './components/icon-test.vue'
import TreeTest from './components/tree-test.vue'
import VirtualListTest from './components/virtual-list-test.vue'
import ScrollbarTest from './components/scrollbar-test.vue'
import CheckboxTest from './components/checkbox-test.vue'
import ButtonTest from './components/button-test.vue'
import DividerTest from './components/divider-test.vue'
import FlexTest from './components/flex-test.vue'
import CardTest from './components/card-test.vue'
import TypographyTest from './components/typography-test.vue'
</script>

<template>
  <yy-scrollbar trigger="none">
    <div class="container_padding">
      <yy-divider content-position="left">排版</yy-divider>
      <TypographyTest />
      <yy-divider content-position="left">卡片</yy-divider>
      <CardTest />
      <yy-divider content-position="left">按钮</yy-divider>
      <ButtonTest />
      <yy-divider content-position="left">弹性盒</yy-divider>
      <FlexTest />
      <yy-divider content-position="left">树</yy-divider>
      <TreeTest />
      <yy-divider content-position="left">复选框</yy-divider>
      <CheckboxTest />
      <yy-divider content-position="left">滚动条</yy-divider>
      <ScrollbarTest />
      <yy-divider content-position="left">虚拟列表</yy-divider>
      <VirtualListTest />
      <yy-divider content-position="left">字体图标</yy-divider>
      <IconTest />
      <yy-divider content-position="left">分割线</yy-divider>
      <DividerTest />
    </div>
  </yy-scrollbar>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  height: 100vh;
  overflow: hidden;
  font-size: 14px;
}

.container_padding {
  padding: 0 10px;
}

.padding {
  padding-top: 10px;
}
</style>

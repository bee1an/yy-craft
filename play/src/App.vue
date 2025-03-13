<script setup lang="ts">
// import IconTest from './components/icon-test.vue'
// import TreeTest from './components/tree-test.vue'
// import VirtualListTest from './components/virtual-list-test.vue'
// import ScrollbarTest from './components/scrollbar-test.vue'
// import CheckboxTest from './components/checkbox-test.vue'
// import ButtonTest from './components/button-test.vue'
// import DividerTest from './components/divider-test.vue'
// import FlexTest from './components/flex-test.vue'
// import CardTest from './components/card-test.vue'
// import TypographyTest from './components/typography-test.vue'
// import MessageTest from './components/message-test.vue'
// import GridTest from './components/grid-test.vue'
// import LayoutTest from './components/layout-test.vue'
</script>

<template>
  <yy-scrollbar trigger="none">
    <router-view></router-view>
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
}

.container_padding {
  padding: 4px 24px 56px 56px;
}

.flex {
  display: flex;
}

.f_column {
  flex-direction: column;
}

.j_center {
  justify-content: center;
}

.a_center {
  align-items: center;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.padding {
  padding-top: 10px;
}

#app .gray02 {
  background-color: rgba(128, 128, 128, 0.2);
}

#app .gray03 {
  background-color: rgba(128, 128, 128, 0.3);
}

#app .gray04 {
  background-color: rgba(128, 128, 128, 0.4);
}

.p5 {
  padding: 5px;
}

.p24 {
  padding: 24px;
}

.bbox {
  box-sizing: border-box;
}

.h100p {
  height: 100%;
}
</style>

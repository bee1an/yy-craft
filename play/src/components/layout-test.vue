<script setup lang="ts">
import { ref } from 'vue'

const unmount = ref(false)

// setTimeout(() => {
//   unmount.value = true
// }, 2000)
</script>

<template>
  <yy-flex vertical>
    <yy-card title="基础布局">
      <yy-flex vertical size="large">
        <yy-layout>
          <yy-layout-header>header</yy-layout-header>
          <yy-layout-content style="height: 360px">
            <div v-for="item in 100" :key="item">content</div>
          </yy-layout-content>
          <yy-layout-footer>footer</yy-layout-footer>
        </yy-layout>

        <yy-layout>
          <yy-layout-header>header</yy-layout-header>
          <yy-layout has-sider>
            <yy-layout-sider>sider</yy-layout-sider>
            <yy-layout-content>content </yy-layout-content>
          </yy-layout>
          <yy-layout-footer>footer</yy-layout-footer>
        </yy-layout>

        <yy-layout has-sider>
          <yy-layout-sider>sider</yy-layout-sider>
          <yy-layout>
            <yy-layout-header>header</yy-layout-header>
            <yy-layout-content>content</yy-layout-content>
            <yy-layout-footer>footer</yy-layout-footer>
          </yy-layout>
        </yy-layout>
      </yy-flex>
    </yy-card>
  </yy-flex>
</template>

<style scoped>
.yy-layout-header,
.yy-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.yy-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.yy-layout-content {
  background: rgba(128, 128, 128, 0.4);
}
</style>

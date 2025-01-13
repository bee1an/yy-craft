<script setup lang="ts">
import { ref } from 'vue'

const unmount = ref(false)

// setTimeout(() => {
//   unmount.value = true
// }, 2000)
</script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>布局</yy-h1>
    <yy-flex vertical>
      <yy-card title="设置边框">
        <yy-p
          >sider header,footer可以设置边框
          <yy-text code>bordered</yy-text></yy-p
        >

        <yy-layout has-sider>
          <yy-layout-sider bordered>sider</yy-layout-sider>
          <yy-layout>
            <yy-layout-header bordered class="p24">header</yy-layout-header>
            <yy-layout-content class="p24">content</yy-layout-content>
            <yy-layout-footer bordered class="p24">footer</yy-layout-footer>
          </yy-layout>
        </yy-layout>
      </yy-card>

      <yy-card title="基础布局">
        <yy-flex vertical size="large">
          <yy-layout>
            <yy-layout-header class="gray02 p24">header</yy-layout-header>
            <yy-layout-content class="gray04" style="height: 360px">
              <div v-for="item in 100" :key="item">content</div>
            </yy-layout-content>
            <yy-layout-footer class="gray02 p24">footer</yy-layout-footer>
          </yy-layout>

          <yy-layout>
            <yy-layout-header class="gray02 p24">header</yy-layout-header>
            <yy-layout has-sider>
              <yy-layout-sider class="gray03">sider</yy-layout-sider>
              <yy-layout-content class="gray04">content </yy-layout-content>
            </yy-layout>
            <yy-layout-footer class="gray02 p24">footer</yy-layout-footer>
          </yy-layout>

          <yy-layout has-sider>
            <yy-layout-sider class="gray03">sider</yy-layout-sider>
            <yy-layout>
              <yy-layout-header class="gray02 p24">header</yy-layout-header>
              <yy-layout-content class="gray04">content</yy-layout-content>
              <yy-layout-footer class="gray02 p24">footer</yy-layout-footer>
            </yy-layout>
          </yy-layout>
        </yy-flex>
      </yy-card>
    </yy-flex>
  </div>
</template>

<style scoped>
.gray02 {
  background: rgba(128, 128, 128, 0.2);
}

.p24 {
  padding: 24px;
}

.gray03 {
  background: rgba(128, 128, 128, 0.3);
}

.gray04 {
  background: rgba(128, 128, 128, 0.4);
}
</style>

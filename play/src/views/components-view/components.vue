<script setup lang="ts">
import { h } from 'vue'
import { components } from '../../router'
import { RouterLink, useRoute } from 'vue-router'

const renderRouterLink = (path: string, text: string) => {
  return () => h(RouterLink, { to: path }, () => text)
}
const options = components.map(item => {
  return {
    label: renderRouterLink(item.path, item.meta!.sider as string),
    key: item.name!
  }
})

const route = useRoute()

const defaultSelectedKeys = [route.name as string]
</script>

<template>
  <yy-layout
    :content-style="{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    }"
  >
    <yy-layout-header bordered>
      <yy-h2
        style="margin-left: 2px; user-select: none"
        class="title"
        prefix
        align-text
        :theme-overrides="{ fontWeight: 600 }"
        >Yy UI</yy-h2
      >
    </yy-layout-header>
    <yy-layout
      has-sider
      :style="{ overflow: 'hidden' }"
      content-style="height: 100%"
    >
      <yy-layout-sider
        bordered
        content-style="padding: 10px"
        width="240"
        collapsed-width="0"
      >
        <yy-menu
          :options="options"
          :defaultSelectedKeys="defaultSelectedKeys"
        ></yy-menu>
      </yy-layout-sider>
      <yy-layout-content>
        <router-view></router-view>
      </yy-layout-content>
    </yy-layout>
  </yy-layout>
</template>

<style scoped></style>

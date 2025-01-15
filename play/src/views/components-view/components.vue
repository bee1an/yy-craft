<script setup lang="ts">
import { h } from 'vue'
import { components } from '../../router'
import { RouterLink, useRoute } from 'vue-router'
import HeaderTitle from '../../components/header-title.vue'

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
      <HeaderTitle />
      <!-- <yy-h3 prefix align-text>这里要做点什么...</yy-h3> -->
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
        <!-- <div v-for="cmp in components" :key="cmp.path">
          <router-link :to="cmp.path">{{ cmp.meta!.sider }}</router-link>
        </div>  -->
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

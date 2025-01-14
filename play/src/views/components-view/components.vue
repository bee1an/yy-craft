<script setup lang="ts">
import { components } from '../../router'
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
      <yy-h3 prefix align-text>这里要做点什么...</yy-h3>
    </yy-layout-header>
    <yy-layout
      has-sider
      :style="{ overflow: 'hidden' }"
      content-style="height: 100%"
    >
      <yy-layout-sider bordered content-style="padding: 10px">
        <div v-for="cmp in components" :key="cmp.path">
          <router-link :to="cmp.path">{{ cmp.meta!.sider }}</router-link>
        </div>
      </yy-layout-sider>
      <yy-layout-content>
        <router-view></router-view>
      </yy-layout-content>
    </yy-layout>
  </yy-layout>
</template>

<style scoped></style>

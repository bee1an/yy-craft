<script setup lang="ts">
import { components } from '../../router'
</script>

<template>
  <yy-layout>
    <yy-layout-header>
      <yy-h3 prefix align-text>这里要做点什么...</yy-h3>
    </yy-layout-header>
    <yy-layout has-sider>
      <yy-layout-sider>
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

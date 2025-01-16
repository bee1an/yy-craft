<script setup lang="ts">
import { useRoute } from 'vue-router'
const title = useRoute().meta.sider
</script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>{{ title }}</yy-h1>

    <yy-grid cols="2" :gap="10">
      <yy-gi>
        <yy-flex vertical>
          <yy-dropdown></yy-dropdown>
        </yy-flex>
      </yy-gi>
    </yy-grid>
  </div>
</template>

<style scoped></style>

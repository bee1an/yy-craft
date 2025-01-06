<script setup lang="ts">
import { ref } from 'vue'

const gapMedium = ref('50px 50px')

setTimeout(() => {
  gapMedium.value = '10px 10px'
}, 1000)
</script>

<template>
  <div class="container">
    <yy-flex vertical>
      水平
      <yy-flex :theme-overrides="{ gapMedium: gapMedium }">
        <yy-button>水平</yy-button>
        <yy-button>水平</yy-button>
      </yy-flex>
      尾部
      <yy-flex justify="flex-end">
        <yy-button>尾部</yy-button>
        <yy-button>尾部</yy-button>
      </yy-flex>
      间隙
      <yy-flex :size="40">
        <yy-button>间隙</yy-button>
        <yy-button>间隙</yy-button>
      </yy-flex>
      垂直
      <yy-flex vertical>
        <yy-button>垂直</yy-button>
        <yy-button>垂直</yy-button>
      </yy-flex>
    </yy-flex>
  </div>
</template>

<style scoped>
.container {
  width: 300px;
}
</style>

<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { Scrollbar as YyScrollbar } from '@yy-ui/yy-ui'

const scrollbarRef =
  useTemplateRef<InstanceType<typeof YyScrollbar>>('scrollbarRef')

setTimeout(() => {
  scrollbarRef.value!.scrollBy(0, 10)
}, 1000)
</script>

<template>
  <div class="container">
    <yy-scrollbar ref="scrollbarRef">
      <div class="content">
        <div v-for="i in 20" :key="i">
          {{ i }}
        </div>
      </div>
    </yy-scrollbar>
  </div>
</template>

<style scoped>
.container {
  height: 100px;
  width: 100px;
}

.content {
  /* 渐变 */
  /* background: linear-gradient(
    90deg,
    rgba(146, 114, 114, 0.1) 0%,
    rgba(121, 53, 53, 0.5) 100%
  ); */
  background-color: #b8860b;
  /* width: 200px; */
}
</style>

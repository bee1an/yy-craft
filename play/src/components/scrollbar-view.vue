<script setup lang="ts">
import { inject, useTemplateRef } from 'vue'
import { Scrollbar as YyScrollbar } from '@yy-ui/yy-ui'
import { t } from '../plugins'

const scrollbarRef =
  useTemplateRef<InstanceType<typeof YyScrollbar>>('scrollbarRef')

const scrollBy = () => {
  scrollbarRef.value!.scrollBy(0, 10)
}

const texts = inject(t)!

const list = Array.from(
  { length: 30 },
  () => texts[Math.floor(Math.random() * texts.length)]
)
</script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>滚动条</yy-h1>
    <yy-flex vertical inline>
      <yy-button @click="scrollBy">滚动+10</yy-button>
      <div class="container">
        <yy-scrollbar ref="scrollbarRef">
          <div class="vertical">
            <div v-for="text in list" :key="text">
              {{ text }}
            </div>
          </div>
        </yy-scrollbar>
      </div>
      <div class="container2">
        <yy-scrollbar>
          <div class="horizontal">
            <div v-for="text in list" :key="text">
              {{ text }}
            </div>
          </div>
        </yy-scrollbar>
      </div>
    </yy-flex>
  </div>
</template>

<style scoped>
.container {
  height: 300px;
  width: fit-content;
  border: 1px solid #ececec;
}

.container2 {
  width: 500px;
  border: 1px solid #ececec;
}

.vertical > div:not(:first-child) {
  margin-top: 3px;
}

.horizontal {
  display: flex;
  width: 100px;
}

.horizontal > div:not(:first-child) {
  margin-left: 3px;
}

.horizontal > div {
  min-width: 100px;
}
</style>

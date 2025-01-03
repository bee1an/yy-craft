<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { Scrollbar as YyScrollbar } from '@yy-ui/yy-ui'

const scrollbarRef =
  useTemplateRef<InstanceType<typeof YyScrollbar>>('scrollbarRef')

const scrollBy = () => {
  scrollbarRef.value!.scrollBy(0, 10)
}

const texts = [
  '不要因为走得太远而忘记为什么出发',
  '生活就像海洋，只有意志坚强的人才能到达彼岸',
  '成功不是将来才有的，而是从现在开始努力，一步一步累积而成',
  '不要等待机会，而要创造机会',
  '只有不断学习，才能不断进步',
  '人生就像一场马拉松，不在乎速度，而在乎坚持'
]

const list = Array.from(
  { length: 30 },
  () => texts[Math.floor(Math.random() * texts.length)]
)
</script>

<template>
  <div class="warpper">
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
  </div>
</template>

<style scoped>
.warpper {
  font-size: 14px;
}

.container {
  height: 100px;
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

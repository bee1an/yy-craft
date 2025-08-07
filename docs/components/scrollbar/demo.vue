<script setup lang="ts">
import { ref } from 'vue'

const scrollRef = ref<HTMLElement | null>(null)

function scrollTo() {
  if (scrollRef.value) {
    scrollRef.value.scrollTo({ top: 100, behavior: 'smooth' })
  }
}

function scrollBy() {
  scrollRef.value?.scrollBy({
    top: 100,
    left: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <yy-flex vertical>
    <yy-button @click="scrollBy">
      scrollBy 100
    </yy-button>
    <yy-button @click="scrollTo">
      scrollTo 100
    </yy-button>
    <div style="width: 200px; height: 200px; border: 1px solid #dcdfe6">
      <yy-scrollbar ref="scrollRef">
        <yy-p v-for="i in 20" :key="i" style="width: 300px">
          这是一段测试文本 {{ i }}
        </yy-p>
      </yy-scrollbar>
    </div>
  </yy-flex>
</template>

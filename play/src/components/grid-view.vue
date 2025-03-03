<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const gap = ref(10)

// setTimeout(() => {
//   gap.value = 15
// }, 1000)

const fixedSize = ref(true)
const responsiveSize = ref(false)
const screenResponsiveSize = ref(false)

const states = { fixedSize, responsiveSize, screenResponsiveSize }

const toDefault = () => {
  if (Object.values(states).every(ref => !ref.value)) {
    fixedSize.value = true
  }
}

Object.entries(states).forEach(([key, state]) => {
  watch(state, val => {
    if (val) {
      Object.entries(states).forEach(([otherKey, otherState]) => {
        if (otherKey !== key) {
          otherState.value = false
        }
      })
    } else {
      toDefault()
    }
  })
})
const responsiveCols = computed(() => {
  return fixedSize.value
    ? 5
    : responsiveSize.value
    ? '3 600:5 800:7 1000:9'
    : '3 s:5 m:7 l:9'
})

const fixedSize2 = ref(true)
const responsiveSize2 = ref(false)
const screenResponsiveSize2 = ref(false)

const states2 = { fixedSize2, responsiveSize2, screenResponsiveSize2 }

const toDefault2 = () => {
  if (Object.values(states).every(ref => !ref.value)) {
    fixedSize2.value = true
  }
}
Object.entries(states2).forEach(([key, state]) => {
  watch(state, val => {
    if (val) {
      Object.entries(states2).forEach(([otherKey, otherState]) => {
        if (otherKey !== key) {
          otherState.value = false
        }
      })
    } else {
      toDefault2()
    }
  })
})
const responsiveSpan = computed(() => {
  return fixedSize2.value
    ? 1
    : responsiveSize2.value
    ? '5 600:6 800:7 1000:8'
    : '0 s:3 m:4 l:5'
})
</script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>网格布局</yy-h1>
    <yy-flex>
      <yy-card title="基础使用">
        <yy-grid :cols="5" :gap="gap">
          <yy-grid-item :span="1" :row-span="2">
            <div class="darkgoldenrod h108"></div>
          </yy-grid-item>
          <yy-grid-item :offset="1">
            <div class="wheat h108"></div>
          </yy-grid-item>
          <yy-grid-item>
            <div class="darkgoldenrod h108"></div>
          </yy-grid-item>
          <yy-grid-item>
            <div class="wheat h108"></div>
          </yy-grid-item>
          <yy-grid-item>
            <div class="darkgoldenrod h108"></div>
          </yy-grid-item>
          <yy-grid-item :offset="1" :row-span="2">
            <div class="wheat h108"></div>
          </yy-grid-item>
          <yy-grid-item>
            <div class="darkgoldenrod h108"></div>
          </yy-grid-item>
          <yy-grid-item>
            <div class="wheat h108"></div>
          </yy-grid-item>
          <yy-grid-item>
            <div class="darkgoldenrod h108"></div>
          </yy-grid-item>
          <yy-grid-item>
            <div class="wheat h108"></div>
          </yy-grid-item>
        </yy-grid>
      </yy-card>

      <yy-card title="响应式列数">
        <yy-flex vertical>
          <yy-flex>
            <yy-checkbox
              v-model="fixedSize"
              label="切换为固定尺寸"
            ></yy-checkbox>
            <yy-checkbox
              v-model="responsiveSize"
              label="切换为元素尺寸响应"
            ></yy-checkbox>
            <yy-checkbox
              v-model="screenResponsiveSize"
              label="切换为跟据窗口响应"
            ></yy-checkbox>
          </yy-flex>
          <yy-grid :cols="responsiveCols">
            <template v-for="i in 13" :key="i">
              <yy-gi>
                <div class="darkgoldenrod h108"></div>
              </yy-gi>
              <yy-gi>
                <div class="wheat h108"></div>
              </yy-gi>
            </template>
          </yy-grid>
        </yy-flex>
      </yy-card>

      <yy-card title="响应式单元格">
        <yy-flex vertical>
          <yy-flex>
            <yy-checkbox
              v-model="fixedSize2"
              label="切换为固定尺寸"
            ></yy-checkbox>
            <yy-checkbox
              v-model="responsiveSize2"
              label="切换为元素尺寸响应"
            ></yy-checkbox>
            <yy-checkbox
              v-model="screenResponsiveSize2"
              label="切换为跟据窗口响应"
            ></yy-checkbox>
          </yy-flex>
          <yy-grid :cols="12" :gap="gap">
            <yy-grid-item :span="responsiveSpan">
              <div class="darkgoldenrod h108"></div>
            </yy-grid-item>
            <yy-grid-item :span="1">
              <div class="wheat h108"></div>
            </yy-grid-item>
          </yy-grid>
        </yy-flex>
      </yy-card>
    </yy-flex>
  </div>
</template>

<style scoped>
.h108 {
  min-height: 108px;
  height: 100%;
}

.darkgoldenrod {
  background-color: #b8860b;
}

.wheat {
  background-color: #f5deb3;
}
</style>

<script setup lang="ts">
import type { VirtualListExposed } from 'yy-craft'
import { ref } from 'vue'

const data = ref(
  Array.from({ length: 100 })
    .fill(0)
    .map((_, i) => ({ id: i + 1, lable: `Item ${i + 1}`, key: i + 10 })),
)
const vlInstance = ref<VirtualListExposed>()
const scrollTo: VirtualListExposed['scrollTo'] = (...options: any[]) => {
  vlInstance.value?.scrollTo(...options)
}
</script>

<template>
  <yy-flex>
    <yy-button @click="scrollTo(0, 1500)">
      滚动到指定y距离
    </yy-button>
    <yy-button @click="scrollTo({ top: 1500, behavior: 'smooth' })">
      平滑滚动到指定top距离
    </yy-button>
    <yy-button @click="scrollTo({ distance: 1500, behavior: 'smooth' })">
      平滑滚动到指定距离
    </yy-button>
    <yy-button @click="scrollTo({ index: 50 })">
      滚动到指定index
    </yy-button>
    <yy-button @click="scrollTo({ index: 50, behavior: 'smooth' })">
      平滑滚动到指定index
    </yy-button>
    <yy-button @click="scrollTo({ position: 'top' })">
      滚动到top
    </yy-button>
    <yy-button @click="scrollTo({ position: 'top', behavior: 'smooth' })">
      平滑滚动到top
    </yy-button>
    <yy-button @click="scrollTo({ position: 'bottom' })">
      滚动到bottom
    </yy-button>
    <yy-button @click="scrollTo({ position: 'bottom', behavior: 'smooth' })">
      平滑滚动到bottom
    </yy-button>
    <yy-button @click="scrollTo({ key: 50 })">
      滚动到key50
    </yy-button>
    <yy-button @click="scrollTo({ key: 50, behavior: 'smooth' })">
      平滑滚动到key50
    </yy-button>
  </yy-flex>

  <yy-virtual-list ref="vlInstance" :data="data">
    <template #default="{ item }">
      <yy-p style="margin: 0">
        {{ item.lable }}
      </yy-p>
    </template>
  </yy-virtual-list>
</template>

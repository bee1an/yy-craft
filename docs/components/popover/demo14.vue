<script setup lang="ts">
import { ref } from 'vue'

const x = ref(0)
const y = ref(0)
const showPopover = ref(false)

function clickHandle(event: MouseEvent) {
  x.value = event.clientX
  y.value = event.clientY
  showPopover.value = true
}
</script>

<template>
  <yy-popover trigger="manual" :show-popover="showPopover" :x="x" :y="y">
    <template #trigger>
      <div
        v-click-outside="() => (showPopover = false)"
        :style="{
          width: '100px',
          height: '100px',
          background: 'gray',
          cursor: 'pointer',
        }"
        @click="clickHandle"
      />
    </template>
    <div>x: {{ x }}, y: {{ y }}</div>
  </yy-popover>
</template>

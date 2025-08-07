<script setup lang="ts">
import { flexCenter } from 'yy-craft'

const allPlacement = [
  'top-start',
  'top',
  'top-end',
  'left-start',
  '', // 不渲染
  'right-start',
  'left',
  '', // 不渲染
  'right',
  'left-end',
  '', // 不渲染
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
] as const
</script>

<template>
  <div :style="flexCenter()">
    <yy-grid cols="3" :gap="10" :style="{ width: '60%' }">
      <yy-gi
        v-for="item in allPlacement"
        :key="item"
        :style="{ display: 'flex', justifyContent: 'center' }"
      >
        <template v-if="item">
          <yy-popover :placement="item" trigger="hover">
            <template #trigger>
              <yy-button>{{ item }}</yy-button>
            </template>
            <div>{{ item }}</div>
          </yy-popover>
        </template>
      </yy-gi>
    </yy-grid>
  </div>
</template>

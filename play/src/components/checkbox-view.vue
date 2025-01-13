<script setup lang="ts">
import { injectTheme, ThemeKey } from '@yy-ui/yy-ui'
import { provide, ref } from 'vue'

const value = ref(false)

const theme = ref<ThemeKey>('light')

provide(injectTheme, { theme })

setTimeout(() => {
  // theme.value = 'dark'
}, 1000)
</script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>复选框</yy-h1>
    <yy-checkbox
      v-model="value"
      :label="$t[0]"
      :indeterminate="true"
    ></yy-checkbox>
    <yy-checkbox :model-value="value"></yy-checkbox>
  </div>
</template>

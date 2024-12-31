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
  <div>
    <div class="row">
      <yy-checkbox
        v-model="value"
        label="test"
        :indeterminate="true"
      ></yy-checkbox>
      <yy-checkbox :model-value="value"></yy-checkbox>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
}
</style>

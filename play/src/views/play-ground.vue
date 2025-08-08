<script setup lang="ts">
import { ref } from 'vue'

const value = ref(500)
</script>

<template>
  <div flex="~" h-150 items-center justify-center>
    <div w-100>
      <yy-slider v-model="value" :min="50" :max="10000" />
      <div text-center mt-1>
        {{ value }}
      </div>
    </div>
  </div>
</template>

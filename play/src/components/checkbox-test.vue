<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)
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

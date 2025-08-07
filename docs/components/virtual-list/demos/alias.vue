<script setup lang="ts">
import { ref } from 'vue'

const data = ref(
  Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    lable: `Item ${i + 1}`,
  })),
)
</script>

<template>
  <yy-virtual-list
    :wrapper-max-size="100"
    key-field="id"
    :data="data"
    :scrollbar-props="{ trigger: 'none' }"
  >
    <template #default="{ item }">
      <yy-p style="margin: 0">
        {{ item.lable }}
      </yy-p>
    </template>
  </yy-virtual-list>
</template>

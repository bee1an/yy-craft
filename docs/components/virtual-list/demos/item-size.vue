<script setup lang="ts">
import { ref } from 'vue'

const data = ref(
  Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    lable: `Item ${i + 1}`,
    key: i + 10,
  })),
)
</script>

<template>
  <yy-virtual-list :item-size="28" :wrapper-max-size="100" :data="data">
    <template #default="{ item }">
      <yy-p style="margin: 0">
        {{ item.lable }}
      </yy-p>
    </template>
  </yy-virtual-list>
</template>

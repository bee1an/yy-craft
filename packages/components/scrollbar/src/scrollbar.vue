<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { YScrollbar } from '../../_internal'
import { scrollbarProps } from './scrollbar'

defineOptions({
  name: 'Scrollbar'
})
const props = defineProps(scrollbarProps)

const scrollbarInstRef =
  useTemplateRef<InstanceType<typeof YScrollbar>>('scrollbarInstRef')

function scrollTo(
  ...rest: Parameters<InstanceType<typeof YScrollbar>['scrollTo']>
) {
  return scrollbarInstRef.value?.scrollTo(...rest)
}

function scrollBy(
  ...rest: Parameters<InstanceType<typeof YScrollbar>['scrollBy']>
) {
  return scrollbarInstRef.value?.scrollBy(...rest)
}

defineExpose({ scrollTo, scrollBy })
</script>

<template>
  <y-scrollbar v-bind="props" ref="scrollbarInstRef">
    <slot></slot>
  </y-scrollbar>
</template>

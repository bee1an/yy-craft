<script setup lang="ts">
import { ref } from 'vue'
import { type ScrollbarExpose, YScrollbar } from '../../_internal/scrollbar'
import { scrollbarProps } from './scrollbar'

defineOptions({ name: 'Scrollbar' })

const props = defineProps({ ...scrollbarProps })

const scrollbarInstRef = ref<InstanceType<typeof YScrollbar> | null>(null)

function scrollTo(options?: ScrollToOptions): void
function scrollTo(x?: number, y?: number): void
function scrollTo(...rest: any[]) {
	return scrollbarInstRef.value?.scrollTo(...rest)
}

function scrollBy(options?: ScrollToOptions): void
function scrollBy(x?: number, y?: number): void
function scrollBy(...rest: any[]) {
	return scrollbarInstRef.value?.scrollBy(...rest)
}

defineExpose({ scrollTo, scrollBy } as ScrollbarExpose)
</script>

<template>
	<y-scrollbar v-bind="props" ref="scrollbarInstRef">
		<slot></slot>
	</y-scrollbar>
</template>

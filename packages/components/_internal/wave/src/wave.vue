<script setup lang="ts">
import { useTheme } from '@yy-ui/composables/use-theme'
import { waveStyle, waveTheme } from '@yy-ui/theme-chalk/src/wave'
import { CreateNamespace } from '@yy-ui/utils/src/create'
import { computed, ref, watchEffect } from 'vue'
import { waveProps } from './wave'

defineOptions({ name: 'Wave' })

const props = defineProps(waveProps)

const bem = new CreateNamespace('wave')
const waveRef = ref<HTMLElement | null>(null)

const active = ref(false)

const start = () => {
	active.value = true
	waveRef.value?.getAnimations().forEach((animation) => {
		animation.currentTime = 0
	})
}

defineExpose({ start })

const waveThemeVars = waveTheme.vars()

const theme = computed(() => {
	const vars = { ...waveThemeVars }

	return vars
})

const { styleVars } = useTheme(theme, 'wave', waveStyle, props)

watchEffect(() => {})
</script>

<template>
	<div
		ref="waveRef"
		:style="styleVars"
		:class="[bem.b().value, bem.m(active && 'active').value]"
		@animationend="active = false"
	></div>
</template>

<script setup lang="ts">
import { useTheme } from '@yy-craft/composables/use-theme'
import { iconStyle } from '@yy-craft/theme-chalk/src/icon'
import { CreateNamespace } from '@yy-craft/utils/src/create'
import { computed } from 'vue'
import { iconProps } from './icon'

defineOptions({ name: 'Icon' })

const props = defineProps(iconProps)
const propsStyle = computed(() => {
	const style: Record<string, any> = {}

	if (typeof props.color !== 'undefined') {
		style['--y-icon-color'] = props.color
	}

	if (typeof props.size === 'number') {
		style['--y-icon-size'] = `${props.size}px`
	} else if (typeof props.size === 'string') {
		style['--y-icon-size'] = props.size
	}

	return style
})

useTheme('icon', iconStyle)

const bem = new CreateNamespace('icon')
</script>

<template>
	<i :style="propsStyle" :class="bem.value">
		<slot></slot>
	</i>
</template>

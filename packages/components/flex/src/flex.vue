<script setup lang="ts">
import { useTheme } from '@yy-craft/composables/use-theme'
import { flexTheme } from '@yy-craft/theme-chalk/src/flex'
import { CreateNamespace } from '@yy-craft/utils/src/create'
import { depx, getGap } from '@yy-craft/utils/src/css'
import { createKey } from '@yy-craft/utils/src/tools'
import { computed } from 'vue'
import { flexProps } from './flex'

defineOptions({ name: 'Flex' })

const props = defineProps(flexProps)

const { vars } = useTheme(flexTheme.vars(), 'flex', undefined, props)

const margin = computed<{ horizontal: number; vertical: number }>(() => {
	const { size } = props

	if (Array.isArray(size)) {
		return {
			horizontal: size[0],
			vertical: size[1]
		}
	}
	if (typeof size === 'number') {
		return {
			horizontal: size,
			vertical: size
		}
	}

	const { [createKey('gap', size)]: gap } = vars.value
	const { row, col } = getGap(gap)
	return {
		horizontal: depx(col),
		vertical: depx(row)
	}
})

const bem = new CreateNamespace('flex')
</script>

<template>
	<div
		:class="bem.b().value"
		:style="{
			display: inline ? 'inline-flex' : 'flex',
			justifyContent: justify,
			alignItems: align,
			flexWrap: wrap ? 'wrap' : 'nowrap',
			flexDirection: vertical ? 'column' : 'row',
			gap: `${margin.vertical}px ${margin.horizontal}px`
		}"
	>
		<slot></slot>
	</div>
</template>

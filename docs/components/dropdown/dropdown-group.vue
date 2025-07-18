<script setup lang="ts">
import { ref } from 'vue'

const options = ref([
	{
		label: '选项1',
		key: '1'
	},
	{
		label: '选项2',
		key: '2',
		type: 'group' as const,
		children: [
			{
				label: '选项2-1',
				key: '2-1'
			}
		]
	}
])
</script>

<template>
	<yy-dropdown :options="options">
		<yy-button>分组</yy-button>
	</yy-dropdown>
</template>

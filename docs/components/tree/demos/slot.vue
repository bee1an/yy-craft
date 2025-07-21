<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
	{
		value: '选项1',
		key: '1',
		children: [
			{
				value: '选项1-1',
				key: '1-1'
			},
			{
				value: '选项1-2',
				key: '1-2',
				children: [
					{
						value: '选项1-2-1',
						key: '1-2-1'
					}
				]
			}
		]
	},
	{
		value: '选项2',
		key: '2',
		children: [
			{
				value: '选项2-1',
				key: '2-1'
			}
		]
	}
])
</script>

<template>
	<yy-tree :data="data">
		<template #default="{ node }">
			<div>我是自定义的内容 {{ node.key }}</div>
		</template>
	</yy-tree>
</template>

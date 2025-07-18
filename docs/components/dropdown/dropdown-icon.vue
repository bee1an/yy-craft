<script setup lang="ts">
import { AlarmOutline } from '@vicons/ionicons5'
import { h, ref } from 'vue'
import { Icon } from 'yy-craft'

const options = ref([
	{
		label: '选项1',
		key: '1',
		icon: () => h(AlarmOutline)
	},
	{
		label: '选项2',
		key: '2',
		icon: () => h(AlarmOutline),
		type: 'group' as const
	},
	{
		label: '选项3',
		key: '3',
		icon: () => h(AlarmOutline)
	}
])
</script>

<template>
	<yy-dropdown :options="options">
		<yy-button>带图标</yy-button>
	</yy-dropdown>
</template>

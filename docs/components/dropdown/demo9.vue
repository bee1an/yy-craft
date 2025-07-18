<script setup lang="ts">
import type { DropdownOption } from 'yy-craft'

const basicMenuOptions: DropdownOption[] = [
	{
		label: '选项1',
		key: '选项1'
	}
]
</script>

<template>
	<yy-dropdown :z-index="1" :options="basicMenuOptions">
		<yy-button>点我</yy-button>
	</yy-dropdown>
</template>

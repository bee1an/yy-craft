<script setup lang="ts">
import type { MenuOption } from 'yy-craft'

const basicMenuOptions: MenuOption[] = [
	{
		label: '曾姐老火锅',
		key: '曾姐老火锅'
	},
	{
		label: '南瓜土豆汤',
		key: '南瓜土豆汤'
	}
]
</script>

<template>
	<yy-menu :options="basicMenuOptions"></yy-menu>
</template>

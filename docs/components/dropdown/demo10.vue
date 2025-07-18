<script setup lang="ts">
import type { DropdownOption } from 'yy-craft'
import { ref } from 'vue'

const basicMenuOptions: DropdownOption[] = [
	{
		label: '选项1',
		key: '选项1'
	}
]

const showDropdown = ref(false)
</script>

<template>
	<yy-flex>
		<yy-dropdown :options="basicMenuOptions">
			<yy-button>点击</yy-button>
		</yy-dropdown>
		<yy-dropdown trigger="hover" :options="basicMenuOptions">
			<yy-button>悬浮</yy-button>
		</yy-dropdown>
		<yy-dropdown trigger="focus" :options="basicMenuOptions">
			<yy-button>聚焦</yy-button>
		</yy-dropdown>
		<yy-dropdown trigger="manual" :show-popover="showDropdown" :options="basicMenuOptions">
			<yy-button>点我是没有的, 试试旁边的复选框</yy-button>
		</yy-dropdown>

		<yy-checkbox v-model="showDropdown" label="切换手动" />
	</yy-flex>
</template>

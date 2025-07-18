<script setup lang="ts">
import type { DropdownOption } from 'yy-craft'

const basicMenuOptions: DropdownOption[] = [
	{
		label: '选项1',
		key: '选项1'
	}
]

const allPlacement = [
	'top-start',
	'top',
	'top-end',
	'left-start',
	'', // 不渲染
	'right-start',
	'left',
	'', // 不渲染
	'right',
	'left-end',
	'', // 不渲染
	'right-end',
	'bottom-start',
	'bottom',
	'bottom-end'
] as const
</script>

<template>
	<div style="width: 50%">
		<yy-grid cols="3" :gap="10">
			<yy-gi
				v-for="item in allPlacement"
				:key="item"
				:style="{ display: 'flex', justifyContent: 'center' }"
			>
				<template v-if="item">
					<yy-dropdown :placement="item" trigger="hover" :options="basicMenuOptions">
						<yy-button>{{ item }}</yy-button>
					</yy-dropdown>
				</template>
			</yy-gi>
		</yy-grid>
	</div>
</template>

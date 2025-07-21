<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
	<yy-flex>
		<yy-popover trigger="click">
			<template #trigger>
				<yy-button>点我</yy-button>
			</template>
			<div>点击触发</div>
		</yy-popover>

		<yy-popover trigger="hover">
			<template #trigger>
				<yy-button>悬浮</yy-button>
			</template>
			<div>悬浮触发</div>
		</yy-popover>

		<yy-popover trigger="focus">
			<template #trigger>
				<yy-button>聚焦</yy-button>
			</template>
			<div>聚焦触发</div>
		</yy-popover>

		<yy-popover trigger="manual" :showPopover="show">
			<template #trigger>
				<yy-checkbox v-model="show" label="选中我触发" />
			</template>
			<div>手动触发</div>
		</yy-popover>
	</yy-flex>
</template>

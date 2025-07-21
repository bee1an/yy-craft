<script setup lang="ts">
import { ref } from 'vue'
const data = ref(
	Array.from({ length: 100 }, (_, i) => {
		return {
			id: i + 1,
			lable: `我是${i + 1}`,
			key: i + 10
		}
	})
)
</script>

<template>
	<yy-virtual-list :data="data">
		<template #default="{ item }">
			<yy-p :key="item.id" style="margin: 0">{{ item.lable }}</yy-p>
		</template>
	</yy-virtual-list>
</template>

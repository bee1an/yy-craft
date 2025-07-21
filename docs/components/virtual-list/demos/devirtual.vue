<script setup lang="ts">
import { ref } from 'vue'
const data = ref(
	Array.from({ length: 100 }, (_, i) => {
		return {
			id: i + 1,
			lable: `Item: ${i + 1}`,
			key: i + 10
		}
	})
)

const virtual = ref(true)
</script>

<template>
	<yy-flex>
		<yy-button @click="virtual = !virtual">切换虚拟列表</yy-button>
		<yy-virtual-list :data="data" :virtual-scroll="virtual">
			<template #default="{ item }">
				<yy-p :key="item.id" style="margin: 0">{{ item.lable }}</yy-p>
			</template>
		</yy-virtual-list>
	</yy-flex>
</template>

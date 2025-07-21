<script setup lang="ts">
import { ref } from 'vue'
import { createData } from './utils'

const data1 = ref<any[]>([])
data1.value.push(...(createData(3, 3) as any[]))

const expandedKeys = ref(['0', '0-0'])
</script>

<template>
	<yy-tree :data="data1" :default-expanded-keys="expandedKeys"></yy-tree>
</template>

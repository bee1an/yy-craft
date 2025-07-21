<script setup lang="ts">
import type { TreeOption } from '@yy-craft/components/tree'
import { getChildren } from '@yy-craft/components/tree/src/utils'
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
] as TreeOption[])

const onDrag = (value: {
	dragNode: TreeOption
	dragNodeParent: TreeOption | null
	dropNode: TreeOption | null
	position: number
}) => {
	const { dragNode, dragNodeParent, dropNode, position } = value

	// *切记先添加再删除
	const dropNodePool = getChildren(data.value, dropNode)
	const dragNodePool = getChildren(data.value, dragNodeParent)

	if (dropNodePool === dragNodePool) {
		// 同数组操作
		const index = dragNodePool.findIndex((item) => item.key === dragNode.key)
		if (position - 1 === index) return
		dropNodePool.splice(position, 0, dragNode)
		dropNodePool.splice(position - 1 > index ? index : index + 1, 1)
	} else {
		dropNodePool.splice(position, 0, dragNode)
		const index = dragNodePool.findIndex((item) => item.key === dragNode.key)
		dragNodePool.splice(index, 1)
	}

	data.value = [...data.value]
}
</script>

<template>
	<yy-tree :data="data" draggable @drag="onDrag" />
</template>

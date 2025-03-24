<script setup lang="ts">
import type { TreeOption } from '@yy-ui/components/tree/src/tree'
import { getChildren } from '@yy-ui/components/tree/src/utils'
import { inject, ref } from 'vue'
import { t } from '../plugins'

const texts = inject(t)!

const createData = (
	deep: number,
	count: number,
	valueField = 'value',
	keyField = 'key',
	prefix = ''
): any[] | undefined => {
	if (deep === 0) {
		return undefined
	}
	return Array(count)
		.fill(0)
		.map((_, i) => ({
			[valueField]: `label-${prefix}${i}: ${texts[Math.floor(Math.random() * texts.length)]}`,
			[keyField]: `${prefix}${i}`,
			children: createData(deep - 1, count, valueField, keyField, `${prefix}${i}-`)
		}))
}

const data = ref<any[]>([])
data.value.push(...(createData(3, 10) as any[]))

const data1 = ref<any[]>([])
data1.value.push(...(createData(3, 10) as any[]))

const data2 = ref<any[]>([])
data2.value.push(...(createData(3, 10, 'xx', 'xxx') as any[]))

const data3 = ref<any[]>([])
data3.value.push(...(createData(3, 10) as any[]))

const data4 = ref<any[]>([])
data4.value.push({
	value: 'label-0',
	key: '0',
	isLeaf: false
})
const onLoad = (treeNode: TreeOption) => {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			treeNode.children = [
				{
					value: 'label-' + treeNode.key + '-0',
					key: treeNode.key + '-0',
					isLeaf: false
				},
				{
					value: 'label-' + treeNode.key + '-1',
					key: treeNode.key + '-1',
					isLeaf: false
				}
			] as any[]
			resolve()
		}, 100)
	})
}

// ['0', '0-0', '0-0-0', '0-0-0-0']
const expandedKeys = ref(['0', '0-0'])

const selectedKeys = ref<string[]>(['0'])

const onDrag = (value: {
	dragNode: TreeOption
	dragNodeParent: TreeOption | null
	dropNode: TreeOption | null
	position: number
}) => {
	const { dragNode, dragNodeParent, dropNode, position } = value

	// *切记先添加再删除
	const dropNodePool = getChildren(data3.value, dropNode)
	const dragNodePool = getChildren(data3.value, dragNodeParent)

	if (dropNodePool === dragNodePool) {
		// 同数组操作
		const index = dragNodePool.findIndex((item) => item.key === dragNode.key)

		if (position - 1 === index) return

		dropNodePool.splice(position, 0, dragNode)
		// position - 1 > index向后拖动, 影响了原index位置
		dropNodePool.splice(position - 1 > index ? index : index + 1, 1)
	} else {
		dropNodePool.splice(position, 0, dragNode)
		const index = dragNodePool.findIndex((item) => item.key === dragNode.key)
		dragNodePool.splice(index, 1)
	}

	data3.value = [...data3.value]
}
</script>

<template>
	<div class="container_padding">
		<yy-h1 prefix align-text>树形控件</yy-h1>
		<yy-p>希望这些鸡汤能帮到你?</yy-p>

		<yy-grid cols="2" :gap="10">
			<yy-gi>
				<yy-flex vertical>
					<yy-card title="基本使用">
						<yy-p>最基本的树只需要<yy-text code>data</yy-text>参数</yy-p>
						<yy-tree :data="data" />
					</yy-card>

					<yy-card title="选中">
						<yy-p>设置<yy-text code>selectable=true</yy-text>后tree-node可选中</yy-p>
						<yy-p>设置<yy-text code>multiple=true</yy-text>后tree-node可多选</yy-p>
						<yy-tree v-model:selectedKeys="selectedKeys" :data="data" selectable multiple />
					</yy-card>

					<yy-card title="可拖动">
						<yy-p><yy-text code>draggable=true</yy-text>配置为可拖动</yy-p>
						<yy-tree :data="data3" draggable @drag="onDrag"></yy-tree>
					</yy-card>

					<yy-card title="动态加载">
						<yy-p
							>节点没有子元素并且不是叶子节点并且传入了<yy-text code>on-load</yy-text
							>后会触发<yy-text code>on-load</yy-text>方法,从而获取子节点</yy-p
						>
						<yy-tree :data="data4" :on-load="onLoad" />
					</yy-card>
				</yy-flex>
			</yy-gi>
			<yy-gi>
				<yy-flex vertical>
					<yy-card title="设置别名">
						<yy-p
							>通过<yy-text code>value-field</yy-text>&<yy-text code>key-field</yy-text
							>设置value&key的别名</yy-p
						>
						<yy-tree :data="data2" value-field="xx" key-field="xxx"></yy-tree>
					</yy-card>

					<yy-card title="默认展开">
						<yy-p><yy-text code>default-expanded-keys</yy-text>设置默认展开项</yy-p>
						<yy-tree
							:data="data2"
							value-field="xx"
							key-field="xxx"
							:default-expanded-keys="expandedKeys"
						></yy-tree>
					</yy-card>

					<yy-card title="虚拟滚动">
						<yy-p><yy-text code>virtual-scroll</yy-text>配置为虚拟滚动树</yy-p>
						<yy-tree :data="data1" virtual-scroll></yy-tree>
					</yy-card>
				</yy-flex>
			</yy-gi>
		</yy-grid>

		<!-- <yy-tree
      v-model:selectedKeys="selectedKeys"
      :data="data"
      :default-expanded-keys="expandedKeys"
      value-field="xx"
      selectable
      multiple
      draggable
      @drag="onDrag"
    >
    </yy-tree> -->
	</div>
</template>

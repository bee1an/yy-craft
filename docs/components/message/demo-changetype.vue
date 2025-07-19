<script setup lang="ts">
import { ref } from 'vue'
import { useMessage, type MessageReturn } from 'yy-craft'

const { message } = useMessage()

const types = ['success', 'info', 'warning', 'error', 'loading', undefined] as const
let messageInstance1: MessageReturn | null
let typeIndex = 0
const messageType = ref(types[typeIndex])
const openMessage1 = () => {
	if (messageInstance1) return
	messageInstance1 = message('我是一条消息', {
		duration: 0,
		type: messageType.value as any
	})
}
const changeText = () => {
	if (!messageInstance1) return
	messageInstance1.content = messageInstance1.content === '我是一条消息' ? '你好' : '我是一条消息'
}
const changeType = () => {
	if (!messageInstance1) return
	messageInstance1.type = types[++typeIndex % types.length]
}

const closeMessage1 = () => {
	messageInstance1?.destroy()
	messageInstance1 = null
}
</script>

<template>
	<yy-flex>
		<yy-button @click="openMessage1">打开</yy-button>
		<yy-button @click="changeType">切换类型</yy-button>
		<yy-button @click="changeText">换一句话试试吧</yy-button>
		<yy-button @click="closeMessage1">关闭</yy-button>
	</yy-flex>
</template>

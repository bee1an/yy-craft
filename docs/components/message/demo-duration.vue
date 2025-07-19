<script setup lang="ts">
import { ref } from 'vue'
import { useMessage, type MessageReturn } from 'yy-craft'

const { message } = useMessage()

const duration = ref(5000) // 设置持续时间为5秒

const show = () => {
	message(() => '这个消息将显示5秒, 还剩' + duration.value + '毫秒', { duration: duration.value })
	changeDuration(duration.value)
}

const changeDuration = (newDuration: number) => {
	const now = Date.now()
	requestAnimationFrame(() => {
		const _now = Date.now()
		const gap = _now - now
		duration.value = newDuration - gap
		if (duration.value < 0) {
			duration.value = 0 // 确保持续时间不会为负
		} else {
			changeDuration(duration.value)
		}
	})
}

let messageInstance: MessageReturn | null = null
const createEternityMessage = () => {
	messageInstance = message('这是一个永远都不会消失的消息', { duration: 0 })
}
const tryCloseEternityMessage = () => {
	messageInstance?.destroy()
	messageInstance = null
}
</script>

<template>
	<yy-flex>
		<yy-button @click="show">显示一个持续5秒的消息</yy-button>
		<yy-button @click="createEternityMessage">显示一个永远都不会消失的消息</yy-button>
		<yy-button @click="tryCloseEternityMessage">关闭左边这个按钮创建的Message</yy-button>
	</yy-flex>
</template>

<script setup lang="ts">
import { MessageReturn, useMessage, A as YyA } from '@yy-ui/yy-ui'
import { h, ref } from 'vue'
import { randomText } from '../plugins'

const { message } = useMessage()

let messageInstance: MessageReturn | null
const openMessage = () => {
  if (messageInstance) return
  messageInstance = message.loading(randomText(), { duration: 0 })
}

const closeMessage = () => {
  messageInstance?.destroy()
  messageInstance = null
}

const openWithVNode = () => {
  message(
    () =>
      h(
        YyA,
        { href: 'https://music.163.com/#/song?id=67407', target: '_blank' },
        () => 'Shall We Dance'
      ),
    { keepAliveOnHover: true }
  )
}

let messageInstance1: MessageReturn | null

const types = [
  'success',
  'info',
  'warning',
  'error',
  'loading',
  undefined
] as const
let typeIndex = 0
const messageType = ref(types[typeIndex])
const openMessage1 = () => {
  if (messageInstance1) return
  messageInstance1 = message(randomText(), {
    duration: 0,
    type: messageType.value as any
  })
}
const changeText = () => {
  if (!messageInstance1) return
  messageInstance1.content = randomText()
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
  <div class="container">
    <yy-card title="基础使用">
      <yy-p>点击下方按钮打开一条消息</yy-p>
      <yy-flex>
        <yy-button @click="message(randomText())">发送一条消息</yy-button>
        <yy-button @click="message(randomText(), { keepAliveOnHover: true })"
          >Hover 不消失</yy-button
        >
      </yy-flex>
    </yy-card>
    <yy-card title="消息状态">
      <yy-p>你可以发送带状态的消息</yy-p>
      <yy-flex>
        <yy-button
          type="success"
          dashed
          @click="message.success('这是一条成功消息')"
          >成功</yy-button
        >
        <yy-button
          type="warning"
          dashed
          @click="message.warning('这是一条警告消息')"
          >警告</yy-button
        >
        <yy-button
          type="error"
          dashed
          @click="message.error('这是一条错误消息')"
          >错误</yy-button
        >
        <yy-button type="info" dashed @click="message.info('这是一条通知消息')"
          >通知</yy-button
        >
        <yy-button dashed @click="message.loading('加载中....')"
          >加载</yy-button
        >
      </yy-flex>
    </yy-card>
    <yy-card title="自定义显示状态">
      <yy-p>你可以自己决定什么时候去关闭它</yy-p>
      <yy-flex>
        <yy-button @click="openMessage">打开</yy-button>
        <yy-button @click="closeMessage">关闭</yy-button>
      </yy-flex>
    </yy-card>
    <yy-card title="传递虚拟dom">
      <yy-p>你可以传递虚拟dom到内容区域</yy-p>
      <yy-flex>
        <yy-button @click="openWithVNode">打开</yy-button>
      </yy-flex>
    </yy-card>
    <yy-card title="修改创建的消息">
      <yy-p>你可以在任意时候修改创建的消息(虚拟dom同样适用)</yy-p>
      <yy-flex>
        <yy-button @click="openMessage1">打开</yy-button>
        <yy-button @click="changeType">切换类型</yy-button>
        <yy-button @click="changeText">换一句话试试吧</yy-button>
        <yy-button @click="closeMessage1">关闭</yy-button>
      </yy-flex>
    </yy-card>
    <yy-card title="创建不同位置的消息">
      <yy-p>可以通过placement属性选择消息出现的位置</yy-p>
      <yy-flex>
        <yy-button @click="message(randomText(), { placement: 'top' })"
          >默认(正上)</yy-button
        >
        <yy-button @click="message(randomText(), { placement: 'bottom' })"
          >正下</yy-button
        >
        <yy-button @click="message(randomText(), { placement: 'top-left' })"
          >左上</yy-button
        >
        <yy-button @click="message(randomText(), { placement: 'top-right' })"
          >右上</yy-button
        >
        <yy-button @click="message(randomText(), { placement: 'bottom-left' })"
          >左下</yy-button
        >
        <yy-button @click="message(randomText(), { placement: 'bottom-right' })"
          >右下</yy-button
        >
      </yy-flex>
    </yy-card>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
</style>

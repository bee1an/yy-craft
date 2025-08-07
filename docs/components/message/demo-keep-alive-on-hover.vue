<script setup lang="ts">
import { useMessage } from 'yy-craft'

const { message } = useMessage()

function show() {
  message('鼠标移入我我将永远存在', { keepAliveOnHover: true, duration: 2000 })
}
</script>

<template>
  <yy-button @click="show">
    显示一个消息
  </yy-button>
</template>

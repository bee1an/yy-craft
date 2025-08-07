<script setup lang="ts">
import { Basketball } from '@vicons/ionicons5'
import { h } from 'vue'
import { Icon, useMessage } from 'yy-craft'

const { message } = useMessage()
</script>

<template>
  <yy-flex>
    <yy-button @click="message('这是一条消息')">
      显示一条消息
    </yy-button>
    <yy-button
      @click="message(() => h(Icon, { size: 20 }, () => h(Basketball)))"
    >
      显示自定义内容
    </yy-button>
  </yy-flex>
</template>

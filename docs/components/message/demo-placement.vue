<script setup lang="ts">
import { useMessage } from 'yy-craft'

const { message } = useMessage()
</script>

<template>
  <yy-flex>
    <yy-button @click="message('top', { placement: 'top' })">
      默认(正上)
    </yy-button>
    <yy-button @click="message('bottom', { placement: 'bottom' })">
      正下
    </yy-button>
    <yy-button @click="message('top-left', { placement: 'top-left' })">
      左上
    </yy-button>
    <yy-button @click="message('top-right', { placement: 'top-right' })">
      右上
    </yy-button>
    <yy-button @click="message('bottom-left', { placement: 'bottom-left' })">
      左下
    </yy-button>
    <yy-button @click="message('bottom-right', { placement: 'bottom-right' })">
      右下
    </yy-button>
  </yy-flex>
</template>

<style scoped></style>

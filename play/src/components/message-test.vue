<script setup lang="ts">
import { useMessage } from '@yy-ui/yy-ui'

const { message } = useMessage()

message('123')
message('1234')
message('12344')
message('123445')
</script>

<template>
  <div class="container">
    <yy-card title="基础使用">
      <yy-flex>
        <yy-button type="success" dashed>成功</yy-button>
        <yy-button type="warning" dashed>警告</yy-button>
        <yy-button type="error" dashed>错误</yy-button>
        <yy-button type="info" dashed>信息</yy-button>
      </yy-flex>
    </yy-card>
  </div>
</template>

<style scoped></style>

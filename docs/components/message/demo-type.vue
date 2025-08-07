<script setup lang="ts">
import { useMessage } from 'yy-craft'

const { message } = useMessage()

function show(type: 'success' | 'warning' | 'error' | 'info' | 'loading') {
  message(`Type: ${type}`, { type })
}
</script>

<template>
  <yy-flex>
    <yy-button @click="show('success')">
      Success
    </yy-button>
    <yy-button @click="show('warning')">
      Warning
    </yy-button>
    <yy-button @click="show('error')">
      Error
    </yy-button>
    <yy-button @click="show('info')">
      Info
    </yy-button>
    <yy-button @click="show('loading')">
      Loading
    </yy-button>
  </yy-flex>
</template>

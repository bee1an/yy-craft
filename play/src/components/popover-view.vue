<script setup lang="ts">
import { DefaultPlacement } from '@yy-ui/composables'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const title = useRoute().meta.sider

const plament = ref<DefaultPlacement>('bottom')
</script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>{{ title }}</yy-h1>
    <yy-grid cols="2" :gap="10">
      <yy-gi>
        <yy-flex vertical>
          <div style="height: 100vh"></div>

          <yy-card title="基础使用">
            <yy-popover :placement="plament">
              <template #trigger>
                <yy-button>点我</yy-button>
              </template>

              这是一段内容
            </yy-popover>
          </yy-card>

          <div style="height: 200vh"></div>
        </yy-flex>
      </yy-gi>
    </yy-grid>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { DefaultPlacement } from '@yy-ui/yy-ui'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { randomText } from '../plugins'

const title = useRoute().meta.sider

const plament = ref<DefaultPlacement>('bottom')

const text = new Array(10).fill(0).map(() => randomText())

const showPopover = ref(false)

const allPlacement = [
  'top-start',
  'top',
  'top-end',
  'left-start',
  '', // 不渲染
  'right-start',
  'left',
  '', // 不渲染
  'right',
  'left-end',
  '', // 不渲染
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end'
] as const
</script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>{{ title }}</yy-h1>
    <yy-grid cols="2" :gap="10">
      <yy-gi>
        <yy-flex vertical>
          <yy-card title="基础使用">
            <yy-popover :placement="plament">
              <template #trigger>
                <yy-button>点我</yy-button>
              </template>
              <div>{{ text[0] }}</div>
            </yy-popover>
          </yy-card>

          <yy-card title="触发位置">
            <div style="width: 50%">
              <yy-grid cols="3" :gap="10">
                <yy-gi v-for="item in allPlacement" :key="item">
                  <template v-if="item">
                    <yy-popover :placement="item" trigger="hover">
                      <template #trigger>
                        <yy-button>聚焦</yy-button>
                      </template>
                      <div>{{ item }}</div>
                    </yy-popover>
                  </template>
                </yy-gi>
              </yy-grid>
            </div>
          </yy-card>
        </yy-flex>
      </yy-gi>
      <yy-gi>
        <yy-flex vertical>
          <yy-card title="触发方式">
            <yy-flex>
              <yy-popover :placement="plament">
                <template #trigger>
                  <yy-button>点击</yy-button>
                </template>
                <div>{{ text[1] }}</div>
              </yy-popover>
              <yy-popover :placement="plament" trigger="hover">
                <template #trigger>
                  <yy-button>悬浮</yy-button>
                </template>
                <div>{{ text[2] }}</div>
              </yy-popover>
              <yy-popover :placement="plament" trigger="focus">
                <template #trigger>
                  <yy-button>聚焦</yy-button>
                </template>
                <div>{{ text[3] }}</div>
              </yy-popover>

              <yy-popover
                :placement="plament"
                trigger="manual"
                :show-popover="showPopover"
              >
                <template #trigger>
                  <yy-button @click="showPopover = !showPopover"
                    >手动</yy-button
                  >
                </template>
                <div>{{ text[4] }}</div>
              </yy-popover>
            </yy-flex>
          </yy-card>
        </yy-flex>
      </yy-gi>
    </yy-grid>
  </div>
</template>

<style scoped></style>

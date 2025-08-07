<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMessage } from 'yy-craft'
import { randomText } from '../plugins'

const title = useRoute().meta.sider

const text = Array.from({ length: 14 })
  .fill(0)
  .map(() => randomText())

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
  'bottom-end',
] as const

const { message } = useMessage()
</script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>
      {{ title }}
    </yy-h1>
    <yy-grid cols="2" :gap="10">
      <yy-gi>
        <yy-flex vertical>
          <yy-card title="基础使用">
            <yy-popover>
              <template #trigger>
                <yy-button>点我</yy-button>
              </template>
              <div>{{ text[0] }}</div>
            </yy-popover>
          </yy-card>

          <yy-card title="延迟触发与延迟隐藏">
            <yy-p>
              设置<yy-text code>
                delay
              </yy-text>为延迟触发时间, 设置<yy-text
                code
              >
                duration
              </yy-text>为延迟隐藏时间
            </yy-p>

            <yy-popover trigger="hover" :delay="500" :duration="500">
              <template #trigger>
                <yy-button>延迟500ms触发, 延迟500ms隐藏</yy-button>
              </template>
              <div>{{ text[6] }}</div>
            </yy-popover>
          </yy-card>

          <yy-card title="不要箭头">
            <yy-p>
              设置<yy-text code>
                show-arrow=false
              </yy-text>不显示箭头
            </yy-p>

            <yy-popover :show-arrow="false" trigger="hover">
              <template #trigger>
                <yy-button>悬浮</yy-button>
              </template>
              <div>{{ text[8] }}</div>
            </yy-popover>
          </yy-card>

          <yy-card title="不要基础样式">
            <yy-p>
              设置<yy-text code>
                raw=true
              </yy-text>不渲染基础样式
            </yy-p>

            <yy-popover raw :show-arrow="false">
              <template #trigger>
                <yy-button>点击</yy-button>
              </template>
              <div>{{ text[9] }}</div>
            </yy-popover>
          </yy-card>

          <yy-card title="事件">
            <yy-popover
              @show="message.info('show')"
              @showed="message.info('showed')"
              @hide="message.info('hide')"
              @hid="message.info('hid')"
              @clickoutside="message.info('clickoutside')"
            >
              <template #trigger>
                <yy-button>点击</yy-button>
              </template>
              <div>{{ text[11] }}</div>
            </yy-popover>
          </yy-card>

          <yy-card title="层级">
            <yy-p>
              popover有独立的层级计算, 你可以通过<yy-text code>
                z-index
              </yy-text>修改它
            </yy-p>
            <yy-popover :z-index="1">
              <template #trigger>
                <yy-button>点击</yy-button>
              </template>
              <div>{{ text[12] }}</div>
            </yy-popover>
          </yy-card>

          <yy-card title="使用包裹元素">
            <yy-p>
              使用一个元素包裹触发器, 内容将会根据这个包裹元素定位,
              <yy-text type="error">
                这会破坏原有的dom结构,
              </yy-text>
              但当你的祖先元素是<yy-a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block"
              >
                包含块
              </yy-a>元素时这将很好用
            </yy-p>
            <yy-p>
              你可能需要<yy-text code>
                wrapper-class
              </yy-text>和<yy-text code>
                wrapper-style
              </yy-text>来定义包裹元素的样式
            </yy-p>

            <yy-p>
              <yy-text type="warning">
                不要在to不为false下使用, 这将没有任何意义
              </yy-text>
            </yy-p>

            <yy-popover :to="false" wrapper placement="bottom-start">
              <template #trigger>
                <yy-button>点击</yy-button>
              </template>
              <div>{{ text[13] }}</div>
            </yy-popover>
          </yy-card>
        </yy-flex>
      </yy-gi>
      <yy-gi>
        <yy-flex vertical>
          <yy-card title="触发方式">
            <yy-p>
              <yy-text code>
                trigger=click | hover | focus | manual
              </yy-text>
            </yy-p>
            <yy-flex>
              <yy-popover>
                <template #trigger>
                  <yy-button>点击</yy-button>
                </template>
                <div>{{ text[1] }}</div>
              </yy-popover>
              <yy-popover trigger="hover">
                <template #trigger>
                  <yy-button>悬浮</yy-button>
                </template>
                <div>{{ text[2] }}</div>
              </yy-popover>
              <yy-popover trigger="focus">
                <template #trigger>
                  <yy-button>聚焦</yy-button>
                </template>
                <div>{{ text[3] }}</div>
              </yy-popover>
              <yy-popover trigger="manual" :show-popover="showPopover">
                <template #trigger>
                  <yy-button @click="showPopover = !showPopover">
                    手动
                  </yy-button>
                </template>
                <div>{{ text[4] }}</div>
              </yy-popover>
              <yy-checkbox v-model="showPopover" label="点我手动打开" />
            </yy-flex>

            <yy-divider />

            <yy-p style="margin-top: 0">
              设置<yy-text code>
                keep-alive-on-hover=false
              </yy-text>在hover内容元素时同样触发hide, 仅在<yy-text code>
                trigger=hover
              </yy-text>时生效
            </yy-p>
            <yy-popover trigger="hover" :keep-alive-on-hover="false">
              <template #trigger>
                <yy-button>悬浮</yy-button>
              </template>
              <div>{{ text[5] }}</div>
            </yy-popover>
          </yy-card>

          <yy-card title="触发位置">
            <yy-p>
              通过<yy-text code>
                placement
              </yy-text>修改
            </yy-p>
            <div style="width: 50%">
              <yy-grid cols="3" :gap="10">
                <yy-gi
                  v-for="item in allPlacement"
                  :key="item"
                  :style="{ display: 'flex', justifyContent: 'center' }"
                >
                  <template v-if="item">
                    <yy-popover :placement="item" trigger="hover">
                      <template #trigger>
                        <yy-button>{{ item }}</yy-button>
                      </template>
                      <div>{{ item }}</div>
                    </yy-popover>
                  </template>
                </yy-gi>
              </yy-grid>
            </div>
          </yy-card>

          <yy-card title="宽度">
            <yy-p>
              设置<yy-text code>
                width
              </yy-text>为宽度, 当<yy-text code>
                width=trigger
              </yy-text>时宽度等于触发器宽度
            </yy-p>

            <yy-popover trigger="hover" width="trigger">
              <template #trigger>
                <yy-button>多一点字把这个按钮撑开</yy-button>
              </template>
              <div>{{ text[7] }}</div>
            </yy-popover>
          </yy-card>

          <yy-card title="挂载位置">
            <yy-p>
              popover将默认挂载到body下,可以通过<yy-text code>
                to
              </yy-text>挂载到任意位置, 传递<yy-text code>
                to=false
              </yy-text>将挂载到原位置
            </yy-p>

            <yy-popover trigger="hover" :to="false">
              <template #trigger>
                <yy-button>悬浮</yy-button>
              </template>
              <div>{{ text[10] }}</div>
            </yy-popover>
          </yy-card>
        </yy-flex>
      </yy-gi>
    </yy-grid>
  </div>
</template>

<style scoped></style>

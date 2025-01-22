<script setup lang="ts">
import { AlarmOutline } from '@vicons/ionicons5'
import { DropdownOption } from '@yy-ui/yy-ui'
import { h, ref } from 'vue'
import { useRoute } from 'vue-router'
const title = useRoute().meta.sider

const basicMenuOptions: DropdownOption[] = [
  {
    label: '曾姐老火锅',
    key: '曾姐老火锅'
  },
  {
    label: '南湖春天冒菜',
    key: '南湖春天冒菜',
    icon: () => h(AlarmOutline),
    children: [
      {
        label: '好吃',
        key: '好吃',
        icon: () => h(AlarmOutline),
        children: [
          {
            label: '什么都没有1',
            key: '什么都没有1'
          },
          {
            label: '什么都没有2',
            key: '什么都没有2',
            icon: () => h(AlarmOutline)
          }
        ]
      },
      {
        label: '把这个item撑大一点',
        key: '把这个item撑大一点'
      }
    ]
  },
  {
    label: '剁椒鱼头',
    key: '剁椒鱼头',
    children: [
      {
        label: '大餐',
        key: '大餐',
        type: 'group',
        children: [
          {
            label: '剁椒',
            key: '剁椒'
          },
          {
            label: '鱼头',
            key: '鱼头'
          }
        ]
      }
    ]
  },
  {
    label: '南湖春天串串',
    key: '南湖春天串串'
  },
  {
    label: '南瓜土豆汤',
    key: '南瓜土豆汤',
    icon: () => h(AlarmOutline)
  }
]

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

const showDropdown = ref(false)
</script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>{{ title }}</yy-h1>
    <yy-p>基于<yy-a href="/components/popover">popover</yy-a></yy-p>
    <yy-p>看这篇文档就像在看popover文档...</yy-p>

    <yy-grid cols="2" :gap="10">
      <yy-gi>
        <yy-flex vertical>
          <yy-card title="基础使用">
            <yy-p>传入<yy-text code>options</yy-text>渲染元素</yy-p>

            <yy-dropdown :options="basicMenuOptions">
              <yy-button>点击</yy-button>
            </yy-dropdown>
          </yy-card>

          <yy-card title="不要箭头">
            <yy-p>设置<yy-text code>show-arrow=false</yy-text>不显示箭头</yy-p>

            <yy-dropdown
              trigger="hover"
              :show-arrow="false"
              :options="basicMenuOptions"
            >
              <yy-button>悬浮</yy-button>
            </yy-dropdown>
          </yy-card>

          <yy-card title="触发位置">
            <yy-p>通过<yy-text code>placement</yy-text>修改</yy-p>
            <div style="width: 50%">
              <yy-grid cols="3" :gap="10">
                <yy-gi
                  v-for="item in allPlacement"
                  :key="item"
                  :style="{ display: 'flex', justifyContent: 'center' }"
                >
                  <template v-if="item">
                    <yy-dropdown
                      :placement="item"
                      trigger="hover"
                      :options="basicMenuOptions"
                    >
                      <yy-button>{{ item }}</yy-button>
                    </yy-dropdown>
                  </template>
                </yy-gi>
              </yy-grid>
            </div>
          </yy-card>

          <yy-card title="使用包裹元素">
            <yy-p
              >使用一个元素包裹触发器, 内容将会根据这个包裹元素定位,
              <yy-text type="error">这会破坏原有的dom结构, </yy-text>
              但当你的祖先元素是<yy-a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block"
                >包含块</yy-a
              >元素时这将很好用</yy-p
            >
            <yy-p
              >你可能需要<yy-text code>wrapper-class</yy-text>和<yy-text code
                >wrapper-style</yy-text
              >来定义包裹元素的样式</yy-p
            >

            <yy-p
              ><yy-text type="warning"
                >不要在to不为false下使用, 这将没有任何意义</yy-text
              ></yy-p
            >

            <yy-dropdown
              trigger="hover"
              :to="false"
              wrapper
              :options="basicMenuOptions"
              wrapper-style="width: 200px;"
            >
              <yy-button>悬浮</yy-button>
            </yy-dropdown>
          </yy-card>
        </yy-flex>
      </yy-gi>
      <yy-gi>
        <yy-flex vertical>
          <yy-card title="二级菜单触发位置">
            <yy-p>通过<yy-text code>sub-placement</yy-text>修改</yy-p>
            <yy-dropdown
              trigger="hover"
              sub-placement="bottom-start"
              :options="basicMenuOptions"
            >
              <yy-button>悬浮</yy-button>
            </yy-dropdown>
          </yy-card>

          <yy-card title="可选中">
            <yy-p>设置<yy-text code>selectable</yy-text>配置为可选中</yy-p>
            <yy-dropdown trigger="hover" selectable :options="basicMenuOptions">
              <yy-button>悬浮</yy-button>
            </yy-dropdown>
          </yy-card>

          <yy-card title="触发方式">
            <yy-p
              ><yy-text code
                >trigger=click | hover | focus | manual</yy-text
              ></yy-p
            >

            <yy-flex>
              <yy-dropdown :options="basicMenuOptions">
                <yy-button>点击</yy-button>
              </yy-dropdown>
              <yy-dropdown trigger="hover" :options="basicMenuOptions">
                <yy-button>悬浮</yy-button>
              </yy-dropdown>
              <yy-dropdown trigger="focus" :options="basicMenuOptions">
                <yy-button>聚焦</yy-button>
              </yy-dropdown>
              <yy-dropdown
                trigger="manual"
                :show-popover="showDropdown"
                :options="basicMenuOptions"
              >
                <yy-button @click="showDropdown = !showDropdown"
                  >手动</yy-button
                >
              </yy-dropdown>
            </yy-flex>
          </yy-card>

          <yy-card title="层级">
            <yy-p
              >popover有独立的层级计算, 你可以通过<yy-text code>z-index</yy-text
              >修改它</yy-p
            >
            <yy-dropdown
              trigger="hover"
              :z-index="1"
              :options="basicMenuOptions"
            >
              <yy-button>悬浮</yy-button>
            </yy-dropdown>
          </yy-card>

          <yy-card title="挂载位置">
            <yy-p
              >dropdown将默认挂载到body下,可以通过<yy-text code>to</yy-text
              >挂载到任意位置, 传递<yy-text code>to=false</yy-text
              >将挂载到原位置</yy-p
            >

            <yy-dropdown
              trigger="hover"
              :to="false"
              :options="basicMenuOptions"
            >
              <yy-button>悬浮</yy-button>
            </yy-dropdown>
          </yy-card>
        </yy-flex>
      </yy-gi>
    </yy-grid>
  </div>
</template>

<style scoped></style>

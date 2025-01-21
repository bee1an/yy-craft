<script setup lang="ts">
import { AlarmOutline } from '@vicons/ionicons5'
import { DropdownOption } from '@yy-ui/yy-ui'
import { h } from 'vue'
import { useRoute } from 'vue-router'
const title = useRoute().meta.sider

const basicMenuOptions: DropdownOption[] = [
  {
    label: '曾姐老火锅',
    key: '曾姐老火锅'
  },
  {
    label: '南湖春天冒菜',
    key: '南湖春天冒菜'
  },
  {
    label: '剁椒鱼头',
    key: '剁椒鱼头'
    // children: [
    //   {
    //     label: '大餐',
    //     key: '大餐',
    //     type: 'group',
    //     children: [
    //       {
    //         label: '炒腊肉',
    //         key: '炒腊肉'
    //       },
    //       {
    //         label: '可乐鸡翅',
    //         key: '可乐鸡翅'
    //       }
    //     ]
    //   }
    // ]
  },
  {
    label: '南湖春天串串',
    key: '南湖春天串串'
  },
  {
    label: '南瓜土豆汤',
    key: '南瓜土豆汤'
  }
]
</script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>{{ title }}</yy-h1>
    <yy-p>基于<yy-a href="/components/popover">popover</yy-a></yy-p>

    <yy-grid cols="2" :gap="10">
      <yy-gi>
        <yy-flex vertical>
          <yy-card title="基础使用">
            <yy-dropdown :options="basicMenuOptions">
              <yy-button>{{ Date() }}</yy-button>
            </yy-dropdown>
          </yy-card>
        </yy-flex>
      </yy-gi>
    </yy-grid>
  </div>
</template>

<style scoped></style>

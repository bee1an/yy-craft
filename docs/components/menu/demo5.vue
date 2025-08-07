<script setup lang="ts">
import type { MenuOption } from 'yy-craft'
import { AlarmOutline } from '@vicons/ionicons5'
import { h, ref } from 'vue'

const basicMenuOptions: MenuOption[] = [
  {
    label: '曾姐老火锅',
    key: '曾姐老火锅',
  },
  {
    label: '南湖春天冒菜',
    key: '南湖春天冒菜',
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
            label: '炒腊肉',
            key: '炒腊肉',
          },
          {
            label: '可乐鸡翅',
            key: '可乐鸡翅',
          },
        ],
      },
    ],
  },
  {
    label: '南湖春天串串',
    key: '南湖春天串串',
  },
  {
    label: '南瓜土豆汤',
    key: '南瓜土豆汤',
    icon: () => h(AlarmOutline),
  },
]

const menuCollapsed = ref(false)
</script>

<template>
  <yy-button @click="menuCollapsed = !menuCollapsed">
    {{ menuCollapsed ? "展开" : "收起" }}
  </yy-button>
  <yy-menu
    :options="basicMenuOptions"
    :collapsed="menuCollapsed"
    collapsed-width="50"
  />
</template>

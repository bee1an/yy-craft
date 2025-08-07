<script setup lang="ts">
import type { DropdownOption } from 'yy-craft'
import { AlarmOutline } from '@vicons/ionicons5'
import { h } from 'vue'

const basicMenuOptions: DropdownOption[] = [
  {
    label: '曾姐老火锅',
    key: '曾姐老火锅',
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
            key: '什么都没有1',
          },
          {
            label: '什么都没有2',
            key: '什么都没有2',
            icon: () => h(AlarmOutline),
          },
        ],
      },
      {
        label: '把这个item撑大一点',
        key: '把这个item撑大一点',
      },
    ],
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
            key: '剁椒',
          },
          {
            label: '鱼头',
            key: '鱼头',
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
</script>

<template>
  <yy-dropdown selectable :options="basicMenuOptions">
    <yy-button>点我</yy-button>
  </yy-dropdown>
</template>

<script setup lang="ts">
import { AirplaneSharp } from '@vicons/ionicons5'
import { MenuOption } from '@yy-ui/yy-ui'
import { h } from 'vue'

const basicMenuOptions: MenuOption[] = [
  {
    label: '曾姐老火锅',
    key: '曾姐老火锅'
  },
  {
    label: '南湖春天冒菜',
    key: '南湖春天冒菜'
  },
  {
    label: '南湖春天串串',
    key: '南湖春天串串'
  },
  {
    label: '南瓜土豆汤',
    key: '南瓜土豆汤',
    icon: () => h(AirplaneSharp)
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
            key: '炒腊肉'
          },
          {
            label: '可乐鸡翅',
            key: '可乐鸡翅'
          }
        ]
      }
    ]
  }
]
</script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>菜单</yy-h1>

    <yy-grid cols="1" :gap="10">
      <yy-card title="基本使用">
        <yy-layout has-sider>
          <yy-layout-sider width="200">
            <yy-menu :options="basicMenuOptions"></yy-menu>
          </yy-layout-sider>
          <yy-layout-content></yy-layout-content>
        </yy-layout>
      </yy-card>
    </yy-grid>
  </div>
</template>

<style scoped></style>

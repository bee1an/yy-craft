<script setup lang="ts">
import { AlarmOutline } from '@vicons/ionicons5'
import { MenuOption, useMessage, Text } from '@yy-ui/yy-ui'
import { h, ref } from 'vue'
import { Meat, Vegetable, Soup, BigMeat, StapleFood } from './icons'

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
const menuCollapsed = ref(false)

const { message } = useMessage()

const renderIcon = (iconName: any) => () => h(iconName)
const menuCollapsed2 = ref(false)
const options2: MenuOption[] = [
  {
    label: '荤',
    key: '荤',
    icon: renderIcon(Meat),
    children: [
      {
        type: 'group',
        key: '荤菜',
        label: '荤菜',
        children: [
          {
            label: '炒腊肉',
            key: '炒腊肉'
          },
          {
            label: '可乐鸡翅',
            key: '可乐鸡翅'
          },
          {
            label: '糖醋排骨',
            key: '糖醋排骨'
          },
          {
            label: '粉蒸肉',
            key: '粉蒸肉'
          },
          {
            label: '烂肉青豆',
            key: '烂肉青豆'
          },
          {
            label: '糖醋鱼',
            key: '糖醋鱼'
          }
        ]
      }
    ]
  },
  {
    key: '素',
    label: '素',
    icon: renderIcon(Vegetable),
    children: [
      {
        type: 'group',
        key: '素菜',
        label: '素菜',
        children: [
          {
            label: '鲍师傅糕点',
            key: '鲍师傅糕点'
          },
          {
            label: '土豆丝',
            key: '土豆丝'
          }
        ]
      }
    ]
  },
  {
    key: '汤',
    label: '汤',
    icon: renderIcon(Soup),
    children: [
      {
        type: 'group',
        key: '喝汤',
        label: '喝汤',
        children: [
          {
            label: '南瓜土豆汤',
            key: '南瓜土豆汤'
          },
          {
            label: '滑肉汤',
            key: '滑肉汤'
          },
          {
            label: '玉米排骨汤',
            key: '玉米排骨汤'
          }
        ]
      }
    ]
  },
  {
    key: '吃大餐',
    label: '吃大餐',
    icon: renderIcon(BigMeat),
    children: [
      {
        type: 'group',
        key: '大吃一顿',
        label: '大吃一顿',
        children: [
          {
            label: '三旬湘厨',
            key: '三旬湘厨'
          },
          {
            label: '来凤鱼',
            key: '来凤鱼'
          },
          {
            label: '逍遥兔',
            key: '逍遥兔'
          },
          {
            label: '乔一乔',
            key: '乔一乔'
          },
          {
            label: '泸州酸菜豆花火锅',
            key: '泸州酸菜豆花火锅'
          },
          {
            label: '南湖春天冒菜',
            key: '南湖春天冒菜'
          },
          {
            label: '曾姐老火锅',
            key: '曾姐老火锅'
          }
        ]
      }
    ]
  },
  {
    key: '主食',
    label: '主食',
    icon: renderIcon(StapleFood),
    children: [
      {
        type: 'group',
        key: '这是什么主食?',
        label: () => h(Text, { type: 'error' }, () => '这是什么主食?'),
        children: [
          {
            label: '醪糟草莓汤圆',
            key: '醪糟草莓汤圆'
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

    <yy-grid cols="2" :gap="10">
      <yy-flex vertical>
        <yy-card title="基本使用">
          <yy-p>传入<yy-text code>options</yy-text>很简单的使用它吧</yy-p>
          <yy-layout has-sider>
            <yy-layout-sider width="200">
              <yy-menu :options="basicMenuOptions"></yy-menu>
            </yy-layout-sider>
            <yy-layout-content></yy-layout-content>
          </yy-layout>
        </yy-card>

        <yy-card title="真菜单">
          <yy-p>我确实有点无聊了</yy-p>
          <yy-layout has-sider>
            <yy-layout-sider
              width="200"
              collapsed-width="50"
              :collapsed="menuCollapsed2"
              @before-collapse="menuCollapsed2 = true"
              @before-expand="menuCollapsed2 = false"
            >
              <yy-menu
                :options="options2"
                :collapsed="menuCollapsed2"
                collapsed-width="50"
              ></yy-menu>
            </yy-layout-sider>
            <yy-layout-content></yy-layout-content>
          </yy-layout>
        </yy-card>
      </yy-flex>

      <yy-flex vertical>
        <yy-card title="收缩菜单">
          <yy-p
            >在你不想用时你可以收起它
            <yy-text type="warning">强烈建议传入图标</yy-text></yy-p
          >

          <yy-layout has-sider>
            <yy-layout-sider
              width="200"
              collapsed-width="50"
              :collapsed="menuCollapsed"
              @before-collapse="menuCollapsed = true"
              @before-expand="menuCollapsed = false"
            >
              <yy-menu
                :options="basicMenuOptions"
                :collapsed="menuCollapsed"
                collapsed-width="50"
                @collapsed="
                  message(() =>
                    h('span', { style: { fontSize: '14px' } }, [
                      h(Text, { delete: true, type: 'error' }, () => '菜刀'),
                      '菜单收起了'
                    ])
                  )
                "
                @expanded="message('菜单展开了')"
              ></yy-menu>
            </yy-layout-sider>
            <yy-layout-content></yy-layout-content>
          </yy-layout>
        </yy-card>
      </yy-flex>
    </yy-grid>
  </div>
</template>

<style scoped></style>

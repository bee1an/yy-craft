# Menu 菜单

<yy-p>用于快速实现菜单导航, 你也可以认为它是一个手风琴</yy-p>

<script setup lang="ts">
  import demo1 from './demo1.vue'
  import demo2 from './demo2.vue'
  import demo3 from './demo3.vue'
  import demo4 from './demo4.vue'
  import demo5 from './demo5.vue'
</script>

## 基本用法

<yy-p>给 <yy-text code>options</yy-text> 传递由 <yy-text code>label</yy-text> 和 <yy-text code>key</yy-text> 组成的数组就可以显示最简单的菜单</yy-p>

<demo1 />

::: details 查看示例

<<< ./demo1.vue

:::

<yy-p>更复杂的菜单</yy-p>

<demo2 />

::: details 查看示例

<<< ./demo2.vue

:::

## 默认展开

<yy-p>
  给 <yy-text code>defaultExpandedKeys</yy-text> 传递一个数组可以配置默认展开的项, 它只会在初始化时生效
</yy-p>

<demo3 />

::: details 查看示例

<<< ./demo3.vue

:::

## 默认选中

<yy-p>
  给 <yy-text code>selectedKeys</yy-text> 传递一个数组可以配置选中的项, 它是一个model
</yy-p>

<demo4 />

::: details 查看示例

<<< ./demo4.vue

:::

## 收起状态

<yy-p>通过 <yy-text code>collapsed</yy-text> 配置菜单收起状态, 他不是一个model, 但是menu会监听并响应它的变化</yy-p>

<yy-p>如果你发现不生效, 可能是没有指定收起后的宽度, 通过 <yy-text code>collapsedWidth</yy-text> 配置菜单收起后的宽度</yy-p>

<yy-p>强烈建议你传入图标, 这样会在收起的时候更好看</yy-p>

<demo5 />

::: details 查看示例

<<< ./demo5.vue

:::

## Props

| 参数                | 说明          | 类型                              | 默认值 |
| ------------------- | ------------- | --------------------------------- | ------ |
| options             | 菜单选项      | MenuOption[]                      | []     |
| defaultExpandedKeys | 默认展开的key | Array<string \| number \| symbol> | []     |
| selectedKeys        | 选中的key值   | Array<string \| number \| symbol> | []     |
| collapsed           | 是否收起      | boolean                           | -      |
| collapsedWidth      | 收起后宽度    | number \| string                  | -      |

## Emits

| 事件名     | 说明               | 回调参数 |
| ---------- | ------------------ | -------- |
| expanded   | 菜单展开后触发     | -        |
| collapsed  | 菜单收起后触发     | -        |
| item-click | 菜单项被点击时触发 | MenuItem |

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(30)
const value1 = ref(50)
</script>

# 滑块

<yy-p>滑块允许用户从一个连续的范围内选择一个数值。</yy-p>

## 基本使用

<yy-p>使用 <yy-text code>v-model</yy-text> 绑定一个数值变量。</yy-p>

<yy-slider v-model="value" />

<p>当前值: {{ value }}</p>

::: details 查看示例

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref(30)
</script>

<template>
  <yy-slider v-model="value" />
  <p>当前值: {{ value }}</p>
</template>
```

:::

## 设置范围

<yy-p>通过 <yy-text code>min</yy-text> 和 <yy-text code>max</yy-text> 属性设置滑块的最小值和最大值。</yy-p>

<yy-slider v-model="value1" :min="10" :max="200" />

<p>当前值: {{ value1 }}</p>

::: details 查看示例

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(50)
</script>

<template>
  <yy-slider v-model="value1" :min="10" :max="200" />
  <p>当前值: {{ value1 }}</p>
</template>
```

:::

## Props

| 参数       | 说明   | 类型   | 默认值 |
| ---------- | ------ | ------ | ------ |
| modelValue | 当前值 | number | 0      |
| min        | 最小值 | number | 0      |
| max        | 最大值 | number | 100    |

## Events

| 事件名 | 说明         | 参数            |
| ------ | ------------ | --------------- |
| change | 值改变时触发 | (value: number) |
| input  | 拖拽时触发   | (value: number) |

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)

const value1 = ref(false)
const indeterminate = ref(false)
</script>

# 复选框

<yy-p>需要选中的时候选择它</yy-p>

## 基本使用

<yy-p>使用 <yy-text code>label</yy-text> 显示提示文字</yy-p>

<yy-checkbox v-model="value" label="点我"></yy-checkbox>

::: details 查看示例

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(false)
</script>

<template>
	<yy-checkbox v-model="value" label="点我"></yy-checkbox>
</template>
```

:::

## 部分选中

<yy-p>设置复选框 <yy-text code>indeterminate</yy-text> 为 <yy-text code>true</yy-text> 将复选款设置为部分选中</yy-p>

<yy-flex>
  <yy-checkbox v-model="value1" label="点我" :indeterminate="indeterminate"></yy-checkbox>
  <yy-checkbox v-model="value1" label="将第一个复选框设置为选中"></yy-checkbox>
  <yy-checkbox v-model="indeterminate" label="将第一个复选框设置为部分选中"></yy-checkbox>
</yy-flex>

::: details 查看示例

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(false)
const indeterminate = ref(false)
</script>

<template>
	<yy-checkbox v-model="value1" label="点我" :indeterminate="indeterminate"></yy-checkbox>
	<yy-checkbox v-model="value1" label="将第一个复选框设置为选中"></yy-checkbox>
	<yy-checkbox v-model="indeterminate" label="将第一个复选框设置为部分选中"></yy-checkbox>
</template>
```

:::

## Props

| 参数          | 说明         | 类型    | 默认值 |
| ------------- | ------------ | ------- | ------ |
| modelValue    | 是否选中     | boolean | false  |
| label         | 显示的内容   | string  | -      |
| indeterminate | 是否部分选中 | boolean | -      |

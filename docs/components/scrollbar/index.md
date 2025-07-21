# Scrollbar 滚动条

<yy-p>自定义滚动条组件, 提供美观的滚动条样式和滚动功能</yy-p>

<yy-p>由于加入了js计算, 它的性能远不如原生滚动条, 如果不想牺牲性能, 你也可以试试修改原生滚动条的样式来实现一样的效果</yy-p>

<yy-p><yy-text type="error">bug: horizontal dragging is not working</yy-text></yy-p>

<script setup lang="ts">
import demo from './demo.vue'
</script>

## 基础用法

<yy-p>最简单的用法就是包裹需要滚动的内容</yy-p>

<yy-p>scrollbar 会继承容器的大小, 进而约束子节点的可显示区域的大小, 从而形成滚动</yy-p>

<div style="width: 200px; height: 200px; border: 1px solid #dcdfe6">
  <yy-scrollbar>
    <yy-p v-for="i in 20" :key="i" style="width: 300px;">这是一段测试文本 {{i}}</yy-p>
  </yy-scrollbar>
</div>

::: details 查看示例

```vue
<template>
	<div style="height: 200px; border: 1px solid #dcdfe6">
		<yy-scrollbar>
			<yy-p v-for="i in 20" :key="i">这是一段测试文本 {{ i }}</yy-p>
		</yy-scrollbar>
	</div>
</template>
```

:::

## 滚动条显示方式

<yy-p>通过设置 <yy-text code>trigger</yy-text> 属性来控制滚动条的显示方式。可选值为 <yy-text code>hover</yy-text> (默认)或 <yy-text code>none</yy-text></yy-p>

<div style="height: 200px; border: 1px solid #dcdfe6">
  <yy-scrollbar trigger="none">
    <yy-p v-for="i in 20" :key="i">这是一段测试文本 {{i}}</yy-p>
  </yy-scrollbar>
</div>

::: details 查看示例

```vue
<template>
	<div style="height: 200px; border: 1px solid #dcdfe6">
		<yy-scrollbar trigger="none">
			<yy-p v-for="i in 20" :key="i">这是一段测试文本 {{ i }}</yy-p>
		</yy-scrollbar>
	</div>
</template>
```

:::

## 自定义类名和样式

<yy-p>可以通过<yy-text code>contentClass</yy-text>和<yy-text code>contentStyle</yy-text>属性来自定义内容区域的样式</yy-p>

<div style="height: 200px;">
  <yy-scrollbar content-class="custom-content" :content-style="{ padding: '10px' }">
    <yy-p v-for="i in 20" :key="i">这是一段测试文本 {{ i }}</yy-p>
  </yy-scrollbar>
</div>

::: details 查看示例

```vue
<template>
	<div style="height: 200px;">
		<yy-scrollbar content-class="custom-content" :content-style="{ padding: '10px' }">
			<yy-p v-for="i in 20" :key="i">这是一段测试文本 {{ i }}</yy-p>
		</yy-scrollbar>
	</div>
</template>
```

:::

## 事件

<yy-p>scrollbar 提供了 <yy-text code>scrollTo</yy-text> 和 <yy-text code>scrollBy</yy-text> 方法, 其行为类似于原生的 <yy-text code>scrollTo</yy-text> 和 <yy-text code>scrollBy</yy-text></yy-p>

<yy-p>通俗的说 <yy-text code>scrollTo</yy-text> 就是 <yy-text code>=</yy-text>, <yy-text code>scrollBy</yy-text> 就是 <yy-text code>+=</yy-text></yy-p>

<demo />

::: details 查看示例

<<< ./demo.vue

:::

## Props

| 参数         | 说明               | 类型                | 默认值    |
| ------------ | ------------------ | ------------------- | --------- |
| trigger      | 滚动条显示触发方式 | `'none' \| 'hover'` | `'hover'` |
| contentClass | 内容区域的类名     | `string`            | -         |
| contentStyle | 内容区域的样式     | `StyleValue`        | -         |

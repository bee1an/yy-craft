# 卡片

<yy-p>它没有很不常用</yy-p>

## 基础卡片

<yy-p>每个slot都有各自的职责</yy-p>

<yy-card title="标题">
  <template #cover>
   <img src="https://avatars.githubusercontent.com/u/137426505" width="200"/>
  </template>
  <template #headerExtra>#headerExtra</template>
  内容
  <template #footer>#footer</template>
  <template #action>#action</template>
</yy-card>

::: details 查看示例

```vue
<template>
	<yy-card title="标题">
		<template #cover>
			<img src="https://avatars.githubusercontent.com/u/137426505" width="200" />
		</template>
		<template #headerExtra>#headerExtra</template>
		内容
		<template #footer>#footer</template>
		<template #action>#action</template>
	</yy-card>
</template>
```

:::

## 可悬浮的卡片

<yy-p>配置 <yy-text code>hoverable</yy-text> 为 <yy-text code>true</yy-text></yy-p>

<yy-card title="可悬浮" hoverable>内容</yy-card>

::: details 查看示例

```vue
<template>
	<yy-card title="可悬浮" hoverable>内容</yy-card>
</template>
```

:::

## 卡片尺寸

<yy-p>配置 <yy-text code>size</yy-text> </yy-p>

<yy-flex class="wapper" vertical>
  <yy-card title="小卡片" size="small"><yy-text code>size="small"</yy-text></yy-card>
  <yy-card title="中卡片" size="medium"><yy-text code>size="medium"</yy-text></yy-card>
  <yy-card title="大卡片" size="large"><yy-text code>size="large"</yy-text></yy-card>
  <yy-card title="超大卡片" size="huge"><yy-text code>size="huge"</yy-text></yy-card>
</yy-flex>

::: details 查看示例

```vue
<template>
	<yy-card title="小卡片" size="small"><yy-text code>size="small"</yy-text></yy-card>
	<yy-card title="中卡片" size="medium"><yy-text code>size="medium"</yy-text></yy-card>
	<yy-card title="大卡片" size="large"><yy-text code>size="large"</yy-text></yy-card>
	<yy-card title="超大卡片" size="huge"><yy-text code>size="huge"</yy-text></yy-card>
</template>
```

:::

## 无边框卡片

<yy-p>配置 <yy-text code>bordered</yy-text> 为 <yy-text code>false</yy-text></yy-p>

<yy-card title="无边框" :bordered="false">内容</yy-card>

::: details 查看示例

```vue
<template>
	<yy-card title="无边框" :bordered="false">内容</yy-card>
</template>
```

:::

## 分段卡片

<yy-p>配置 <yy-text code>segmented</yy-text> 为 <yy-text code>true | CardSegmented</yy-text></yy-p>

<yy-card title="标题" segmented>
  内容
  <template #footer>#footer</template>
  <template #action>#action</template>
</yy-card>

::: details 查看示例

```vue
<template>
	<yy-card title="标题" segmented>
		内容
		<template #footer>#footer</template>
		<template #action>#action</template>
	</yy-card>
</template>
```

:::

## Props

| 参数      | 说明       | 类型                                     | 默认值   |
| --------- | ---------- | ---------------------------------------- | -------- |
| title     | 标题       | string \| `() => VNodeChild`             | -        |
| size      | 尺寸       | 'small' \| 'medium' \| 'large' \| 'huge' | 'medium' |
| bordered  | 是否有边框 | boolean                                  | true     |
| hoverable | 是否可悬浮 | boolean                                  | false    |
| segmented | 分段       | boolean \| CardSegmented                 | -        |

## Slots

| 名称        | 说明     |
| ----------- | -------- |
| cover       | 封面     |
| headerExtra | 头部额外 |
| header      | 头部     |
| default     | 内容     |
| footer      | 底部     |
| action      | 操作     |

# Layout 布局容器

<yy-p>用于快速搭建页面基础布局结构, 支持自定义区域分布, 侧边栏, 各区域可自定义内容和样式</yy-p>

## 基本用法

<yy-p>非常简单的上中下布局</yy-p>

<yy-layout>
  <yy-layout-header>我是header</yy-layout-header>
  <yy-layout-content>我是content</yy-layout-content>
  <yy-layout-footer>我是footer</yy-layout-footer>
</yy-layout>

::: details 查看示例

```vue
<template>
	<yy-layout>
		<yy-layout-header>Header</yy-layout-header>
		<yy-layout-content>Content</yy-layout-content>
		<yy-layout-footer>Footer</yy-layout-footer>
	</yy-layout>
</template>
```

:::

## 侧边栏布局

<yy-p>需要配置<yy-text code>hasSider</yy-text></yy-p>

<yy-layout has-sider>
  <yy-layout-sider>Sider</yy-layout-sider>
  <yy-layout-content>Content</yy-layout-content>
</yy-layout>

::: details 查看示例

```vue
<template>
	<yy-layout has-sider>
		<yy-layout-sider>Sider</yy-layout-sider>
		<yy-layout-content>Content</yy-layout-content>
	</yy-layout>
</template>
```

:::

## 显示边框

<yy-p>通过 <yy-text code>bordered</yy-text> 属性为 header, footer, sider 区域添加边框</yy-p>

<yy-layout has-sider>
  <yy-layout-sider bordered>Sider 带边框</yy-layout-sider>
  <yy-layout>
    <yy-layout-header bordered>Header 带下边框</yy-layout-header>
    <yy-layout-content>Content</yy-layout-content>
    <yy-layout-footer bordered>Footer 带上边框</yy-layout-footer> 
  </yy-layout>
</yy-layout>

::: details 查看示例

```vue
<template>
	<yy-layout has-sider>
		<yy-layout-sider bordered>Sider 带边框</yy-layout-sider>
		<yy-layout>
			<yy-layout-header bordered>Header 带下边框</yy-layout-header>
			<yy-layout-content>Content</yy-layout-content>
			<yy-layout-footer bordered>Footer 带上边框</yy-layout-footer>
		</yy-layout>
	</yy-layout>
</template>
```

:::

## 更多关于侧边栏

<yy-p>你可以使用 <yy-text code>width</yy-text> 来设置侧边栏的宽度</yy-p>

<yy-layout has-sider>
  <yy-layout-sider width="40">Sider 带边框</yy-layout-sider>
  <yy-layout-content>
    <yy-text type="info">侧边栏宽度为 40px</yy-text>
  </yy-layout-content>
</yy-layout>

::: details 查看示例

```vue
<template>
	<yy-layout has-sider>
		<yy-layout-sider width="40">Sider 带边框</yy-layout-sider>
		<yy-layout-content>
			<yy-text type="info">侧边栏宽度为 40px</yy-text>
		</yy-layout-content>
	</yy-layout>
</template>
```

:::

<yy-p>你可以传递 <yy-text code>collapsedWidth</yy-text> 来设置侧边栏收起后的宽度, 当这个值存在时, 侧边栏会默认显示一个折叠按钮</yy-p>

<yy-p>如果你发现侧边栏没有动画, 是因为没有传递 <yy-text code>width</yy-text>, 动画本质是值的变化, 前提是你得让动画的开始和结束都有值</yy-p>

<yy-layout has-sider>
  <yy-layout-sider  collapsedWidth="20" width="40">Sider 带边框</yy-layout-sider>
  <yy-layout-content>
    <yy-text type="info">侧边栏可以折叠啦</yy-text>
  </yy-layout-content>
</yy-layout>

::: details 查看示例

```vue
<template>
	<yy-layout has-sider>
		<yy-layout-sider collapsedWidth="20" width="40">Sider 带边框</yy-layout-sider>
		<yy-layout-content>
			<yy-text type="info">侧边栏可以折叠啦</yy-text>
		</yy-layout-content>
	</yy-layout>
</template>
```

:::

<yy-p>你可以使用 <yy-text code>collapsed</yy-text> 来设置默认收起状态</yy-p>

<yy-p>你需要指定 <yy-text code>collapsedWidth</yy-text> 一个值来告诉侧边栏收起后的宽度, <yy-text type="warning">不然收起后宽度会按照原来的宽度显示</yy-text>, <yy-text type="error">我在想内部是不是应该默认设定一个为0的值</yy-text></yy-p>

<yy-p>注意这里的 <yy-text code>collapsed</yy-text> 不是model, 它并不会根据侧边栏的收起状态的变化而变化, 但是侧边栏会监听这个值得变化并同步</yy-p>

<yy-p>侧边栏的收起状态的变化会触发相应的事件</yy-p>

<yy-layout has-sider>
  <yy-layout-sider collapsed collapsedWidth="20" width="40">Sider 带边框</yy-layout-sider>
  <yy-layout-content>
    <yy-text type="info">这是一个默认收起的侧边栏</yy-text>
  </yy-layout-content>
</yy-layout>

::: details 查看示例

```vue
<template>
	<yy-layout has-sider>
		<yy-layout-sider collapsed collapsedWidth="20" width="40">Sider 带边框</yy-layout-sider>
		<yy-layout-content>
			<yy-text type="info">这是一个默认收起的侧边栏</yy-text>
		</yy-layout-content>
	</yy-layout>
</template>
```

:::

<yy-p>你可以使用 <yy-text code>showCollapsedContent</yy-text> 来设置收起后是否需要显示内容, 这在你的侧边栏收起后的宽度不为0的时候很有用</yy-p>

<yy-layout has-sider>
  <yy-layout-sider collapsed collapsedWidth="20" width="40" :showCollapsedContent="false">Sider 带边框</yy-layout-sider>
  <yy-layout-content>
    <yy-text type="info">侧边栏收起后还有宽度, 但是内容隐藏了</yy-text>
  </yy-layout-content>
</yy-layout>

::: details 查看示例

```vue
<template>
	<yy-layout has-sider>
		<yy-layout-sider collapsed collapsedWidth="20" width="40" :showCollapsedContent="false"
			>Sider 带边框</yy-layout-sider
		>
		<yy-layout-content>
			<yy-text type="info">侧边栏收起后还有宽度, 但是内容隐藏了</yy-text>
		</yy-layout-content>
	</yy-layout>
</template>
```

:::

## 区域 Props

### Layout

| 参数         | 说明         | 类型       | 默认值 |
| ------------ | ------------ | ---------- | ------ |
| hasSider     | 是否有侧边栏 | boolean    | -      |
| contentClass | 内容类名     | any        | -      |
| contentStyle | 内容样式     | StyleValue | -      |

### LayoutSider

| 参数                 | 说明           | 类型             | 默认值 |
| -------------------- | -------------- | ---------------- | ------ |
| width                | 宽度           | string \| number | -      |
| collapsed            | 默认收起       | boolean          | -      |
| collapsedWidth       | 收起时宽度     | string \| number | -      |
| showCollapsedContent | 收起时内容显示 | boolean          | true   |
| bordered             | 是否显示边框   | boolean          | -      |
| contentClass         | 内容类名       | any              | -      |
| contentStyle         | 内容样式       | StyleValue       | -      |

### LayoutHeader

| 参数     | 说明           | 类型    | 默认值 |
| -------- | -------------- | ------- | ------ |
| bordered | 是否显示下边框 | boolean | -      |

### LayoutContent

| 参数         | 说明     | 类型       | 默认值 |
| ------------ | -------- | ---------- | ------ |
| contentClass | 内容类名 | any        | -      |
| contentStyle | 内容样式 | StyleValue | -      |

### LayoutFooter

| 参数     | 说明           | 类型    | 默认值 |
| -------- | -------------- | ------- | ------ |
| bordered | 是否显示上边框 | boolean | -      |

# Grid 栅格布局

<yy-p>用于快速实现响应式栅格布局, 支持自定义列数, 间距, 嵌套, 子项跨行跨列等</yy-p>

<script setup>
  import { useElementSize, useEventListener } from 'yy-craft'
  import { ref, useTemplateRef, computed } from 'vue'

  const gridRef = useTemplateRef('grid')

  const el = computed(() => gridRef.value?.$el)

  const { width } = useElementSize(el)

  const gridItemRef = useTemplateRef('gridItem')

  const itemEl = computed(() => gridItemRef.value?.$el)

  const { width: itemWidth } = useElementSize(itemEl)
  
  const windowWidth = ref(window.innerWidth)

  useEventListener(window, 'resize', () => {
    windowWidth.value = window.innerWidth
  })

</script>

## 基本用法

<yy-p>通过 <yy-text code>cols</yy-text> 和 <yy-text code>gap</yy-text> 灵活设置列数和间距</yy-p>

<yy-grid :cols="2" :gap="16">
  <yy-button>A</yy-button>
  <yy-button>B</yy-button>
</yy-grid>

::: details 查看示例

```vue
<template>
	<yy-grid :cols="2" :gap="16">
		<yy-button>A</yy-button>
		<yy-button>B</yy-button>
	</yy-grid>
</template>
```

:::

## 列间距

<yy-p>通过 <yy-text code>gap</yy-text> 属性设置列与列之间的间距, 支持数字或 [水平, 垂直] 数组</yy-p>

<yy-grid :cols="4" :gap="[24, 8]">
  <yy-button>A</yy-button>
  <yy-button>B</yy-button>
  <yy-button>C</yy-button>
  <yy-button>D</yy-button>
</yy-grid>

::: details 查看示例

```vue
<template>
	<yy-grid :cols="4" :gap="[24, 8]">
		<yy-button>A</yy-button>
		<yy-button>B</yy-button>
		<yy-button>C</yy-button>
		<yy-button>D</yy-button>
	</yy-grid>
</template>
```

:::

## 响应式的列

<yy-p><yy-text code>cols</yy-text> 支持字符串类型的传参, 当传递的字符串可以被空格字符拆分为多个内容时, 那么会被认为传递了响应式的传参</yy-p>

<yy-p>第一个空格前的表示为默认的列数, 后面的为响应式的列数</yy-p>

<yy-p>其中响应式列数分为窗口响应式和元素尺寸响应式</yy-p>

### 列根据窗口的响应式

<yy-p>当<yy-text code>cols="[默认列数] [标识]:[列数] [标识]:[列数]"</yy-text>时, 会根据窗口的宽度自动计算列数, 标识对应的窗口宽度如下</yy-p>

```json
// 具体的标识代表的窗口尺寸
{
	"xs": 0, // mobile
	"s": 640, // tablet
	"m": 1024, // laptop s
	"l": 1280, // laptop
	"xl": 1536, // laptop l
	"xxl": 1920 // normal desktop display
}
```

<yy-p>这里的计算规则需要注意, 假设当你传递了 <yy-text code>cols="2 xs:3"</yy-text> 时, 当你的窗口大于 <yy-text code>xs</yy-text> 对应的值也就是0时, 都会显示3列, 所以默认传递的列数将会不生效</yy-p>

<yy-p>所以我建议将默认列数理解为最小列数, 例如当你想 <yy-text code>xl(1536)</yy-text> 以下的值都为3, 那么可以将默认列数设置为3 <yy-text code>cols="3 xs:4"</yy-text></yy-p>

<yy-p>试试缩放你的窗口试试下面的变化</yy-p>

<yy-p>现在的窗口宽度是 {{ windowWidth }}</yy-p>

<yy-grid cols="1 l:3 xl:4 xxl:5" :gap="8">
<yy-gi>
<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
</yy-gi>
<yy-gi>
<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
</yy-gi>
<yy-gi>
<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
</yy-gi>
<yy-gi>
<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
</yy-gi>
<yy-gi>
<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
</yy-gi>
</yy-grid>

::: details 查看示例

```vue
<template>
	<yy-grid cols="1 l:3 xl:4 xxl:5" :gap="8">
		<yy-gi>
			<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
		</yy-gi>
		<yy-gi>
			<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
		</yy-gi>
		<yy-gi>
			<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
		</yy-gi>
		<yy-gi>
			<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
		</yy-gi>
		<yy-gi>
			<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
		</yy-gi>
	</yy-grid>
</template>
```

:::

### 列根据元素尺寸的响应式

<yy-p>同理窗口是响应式, 只是标识变成了对应的元素具体尺寸</yy-p>

<yy-p>例如 <yy-text code>cols="3 500:4"</yy-text> 表示当元素尺寸大于500时显示4列, 小于500时显示3列</yy-p>

<yy-p>现在你可以试试拖动下面的元素右下角的拖动条</yy-p>

<yy-p>现在的元素宽度是 {{ width }}</yy-p>

<yy-grid ref="grid" cols="1 500:3" :gap="8" style="resize: horizontal; overflow: auto; max-width: 100%">
  <yy-gi style="display: flex">
    <yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
  </yy-gi>
  <yy-gi style="display: flex">
    <yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
  </yy-gi>
  <yy-gi style="display: flex">
    <yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
  </yy-gi>
  <yy-gi style="display: flex">
    <yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
  </yy-gi>
  <yy-gi style="display: flex">
    <yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
  </yy-gi>
</yy-grid>

::: details 查看示例

```vue
<template>
	<yy-grid cols="1 500:3" :gap="8" style="resize: horizontal; overflow: auto; max-width: 100%">
		<yy-gi style="display: flex">
			<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
		</yy-gi>
		<yy-gi style="display: flex">
			<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
		</yy-gi>
		<yy-gi style="display: flex">
			<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
		</yy-gi>
		<yy-gi style="display: flex">
			<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
		</yy-gi>
		<yy-gi style="display: flex">
			<yy-button style="width: 100%; padding: 0">我们是响应式的</yy-button>
		</yy-gi>
	</yy-grid>
</template>
```

:::

## 项跨列/行和偏移

<yy-p><yy-text code>grid</yy-text> 有一个子组件 <yy-text code>grid-item</yy-text> 简写为 <yy-text code>gi</yy-text>, 两者搭配起来更好用</yy-p>

<yy-p>使用 <yy-text code>span</yy-text> 控制子项占据的列数, <yy-text code>offset</yy-text> 控制左侧偏移, <yy-text code>rowSpan</yy-text> 控制跨行数</yy-p>

<yy-p>跨行的前提是得有足够的行, 如果只有一行, 那么设置跨两行也不会生效, 所以下面代码中才需要填充物</yy-p>

<yy-grid :cols="4" :gap="8">
  <yy-grid-item :span="2">
    <yy-button style="width: 100%; height: 100%; padding: 0">2列</yy-button>
  </yy-grid-item>
  <yy-grid-item :span="1" :offset="1">
    <yy-button style="width: 100%; height: 100%; padding: 0">偏移1列</yy-button>
  </yy-grid-item>
  <yy-grid-item :span="1" :row-span="3">
    <yy-button style="width: 100%; height: 100%; padding: 0">跨2行</yy-button>
  </yy-grid-item>
  <yy-grid-item :span="1" :offset="1">
    <yy-button style="width: 100%; height: 100%; padding: 0">填充物</yy-button>
  </yy-grid-item>
  <yy-grid-item :span="1" :offset="1">
    <yy-button style="width: 100%; height: 100%; padding: 0">填充物</yy-button>
  </yy-grid-item>
</yy-grid>

::: details 查看示例

```vue
<template>
	<yy-grid :cols="4" :gap="8">
		<yy-grid-item :span="2">
			<yy-button style="width: 100%; height: 100%; padding: 0">2列</yy-button>
		</yy-grid-item>
		<yy-grid-item :span="1" :offset="1">
			<yy-button style="width: 100%; height: 100%; padding: 0">偏移1列</yy-button>
		</yy-grid-item>
		<yy-grid-item :span="1" :row-span="3">
			<yy-button style="width: 100%; height: 100%; padding: 0">跨2行</yy-button>
		</yy-grid-item>
		<yy-grid-item :span="1" :offset="1">
			<yy-button style="width: 100%; height: 100%; padding: 0">填充物</yy-button>
		</yy-grid-item>
		<yy-grid-item :span="1" :offset="1">
			<yy-button style="width: 100%; height: 100%; padding: 0">填充物</yy-button>
		</yy-grid-item>
	</yy-grid>
</template>
```

:::

## 响应式的栅格项

<yy-p>在 <yy-text code>grid-item</yy-text> 中使用 <yy-text code>span</yy-text> 的字符串类型参数实现响应式的栅格项</yy-p>

<yy-p>同理与 <yy-text code>grid</yy-text> 组件的 <yy-text code>cols</yy-text> ,<yy-text code>span</yy-text> 同样支持窗口响应式和元素尺寸响应式</yy-p>

### 栅格项根据窗口的响应式

<yy-p>同理 <yy-a href="#列根据窗口的响应式">grid 组件</yy-a></yy-p>

<yy-p>现在的窗口宽度是 {{ windowWidth }}</yy-p>

<yy-grid :cols="4" :gap="8">
  <yy-grid-item span="1 l:2 xl:3 xxl:4">
    <yy-button style="width: 100%; height: 100%; padding: 0">我是响应式的项</yy-button>
  </yy-grid-item>
</yy-grid>

::: details 查看示例

```vue
<template>
	<yy-grid :cols="4" :gap="8">
		<yy-grid-item span="1 l:2 xl:3 xxl:4">
			<yy-button style="width: 100%; height: 100%; padding: 0">我是响应式的项</yy-button>
		</yy-grid-item>
	</yy-grid>
</template>
```

:::

### 栅格项根据元素尺寸的响应式

<yy-p><yy-text type="error">写错了, 这里应该根据包裹元素的尺寸而不是根据项的尺寸</yy-text></yy-p>

<yy-p>同理 <yy-a href="#列根据元素尺寸的响应式">grid 组件</yy-a></yy-p>

<yy-p>现在的项宽度是 {{ itemWidth }}</yy-p>

<yy-grid :cols="4" :gap="8">
  <yy-grid-item span="1 150:2" ref="gridItem">
    <yy-button style="width: 100%; height: 100%; padding: 0">我是响应式的项</yy-button>
  </yy-grid-item>
</yy-grid>

::: details 查看示例

```vue
<template>
	<yy-grid :cols="4" :gap="8">
		<yy-grid-item span="1 150:2">
			<yy-button style="width: 100%; height: 100%; padding: 0">我是响应式的项</yy-button>
		</yy-grid-item>
	</yy-grid>
</template>
```

:::

## Props

### Grid

| 参数 | 说明 | 类型                       | 默认值 |
| ---- | ---- | -------------------------- | ------ |
| cols | 列数 | number \| string           | 12     |
| gap  | 间距 | number \| [number, number] | 0      |

### GridItem

| 参数    | 说明             | 类型             | 默认值 |
| ------- | ---------------- | ---------------- | ------ |
| span    | 占据的列数       | number \| string | 1      |
| offset  | 距离左侧的间隔数 | number           | 0      |
| rowSpan | 占据的行数       | number           | 1      |

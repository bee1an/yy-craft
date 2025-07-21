# Popover 弹出层

<yy-p>用于在元素边缘显示弹出内容, 很多的弹出组件都是基于 <yy-text code>Popover</yy-text> 例如 <yy-a href="/components/dropdown">Dropdown</yy-a></yy-p>

<yy-p> <yy-text type="error">bug: no style scope</yy-text> </yy-p>

<yy-p> <yy-text type="error">bug2: can not use manual</yy-text> </yy-p>

<script setup lang="ts">
import demo1 from './demo1.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
import demo4 from './demo4.vue'
import demo5 from './demo5.vue'
import demo6 from './demo6.vue'
import demo7 from './demo7.vue'
import demo8 from './demo8.vue'
import demo9 from './demo9.vue'
import demo10 from './demo10.vue'
import demo11 from './demo11.vue'
import demo12 from './demo12.vue'
import demo13 from './demo13.vue'
import demo14 from './demo14.vue'
</script>

## 基本用法

<demo1 />

::: details 查看示例

<<< ./demo1.vue

:::

## 触发方式

<yy-p>通过 <yy-text code>trigger</yy-text> 设置触发方式, 支持 <yy-text code>click</yy-text>, <yy-text code>hover</yy-text>, <yy-text code>focus</yy-text>, <yy-text code>manual</yy-text></yy-p>

<demo2 />

::: details 查看示例

<<< ./demo2.vue

:::

<yy-p style="margin-top: 0">设置 <yy-text code>keep-alive-on-hover=false</yy-text> 在hover内容元素时同样触发hide, 仅在 <yy-text code>trigger=hover</yy-text> 时生效</yy-p>

<yy-popover trigger="hover" :keep-alive-on-hover="false">
  <template #trigger><yy-button>悬浮</yy-button></template>
  <div>移入我我还是会隐藏</div>
</yy-popover>

::: details 查看示例

```vue
<template>
	<yy-popover trigger="hover" :keep-alive-on-hover="false">
		<template #trigger><yy-button>悬浮</yy-button></template>
		<div>移入我我还是会隐藏</div>
	</yy-popover>
</template>
```

:::

## 弹出位置

<yy-p>通过 <yy-text code>placement</yy-text> 设置弹出位置</yy-p>

<demo3 />

::: details 查看示例

<<< ./demo3.vue

:::

## 延迟触发与延时隐藏

<yy-p>
  设置 <yy-text code>delay</yy-text> 为延迟触发时间, 设置 <yy-text code>duration</yy-text> 为延迟隐藏时间
</yy-p>

<demo4 />

::: details 查看示例

<<< ./demo4.vue

:::

## 设置元素的挂载位置

<yy-p><yy-text code>Popover</yy-text> 将默认挂载到body下,可以通过 <yy-text code>to</yy-text> 挂载到任意位置, 传递<yy-text code>to=false</yy-text>将挂载到原位置</yy-p>

<demo5 />

::: details 查看示例

<<< ./demo5.vue

:::

## 设置包裹元素

<yy-p>
  使用一个元素包裹触发器, 内容将会根据这个包裹元素定位,
  <yy-text type="error">这会破坏原有的dom结构, </yy-text>
  但当你的祖先元素是
  <yy-a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block">包含块</yy-a>
  元素时这将很好用
</yy-p>

<yy-p>
  提供这个prop的原因是当你需要将 <yy-text code>Popover</yy-text> 挂载到一个包含块元素不是body的元素时, 那么 <yy-text code>Popover</yy-text> 的位置计算会有问题
</yy-p>

<yy-p>
  <yy-text code>Popover</yy-text> 会根据触发器在页面中的位置计算定位的值, 但是如果内容元素的包含块元素不是body, 此时内容元素就会根据包含块元素进行定位而不是视口
</yy-p>

<yy-p>
  <yy-text code>Popover</yy-text> 根据包含块元素进行位置修正很困难, 所以需要提供一个包裹元素, 我们会将这个包裹元素设置为包含块元素, 再根据这个包裹元素进行定位修正, 此时内容元素的定位方式会变为相对定位
</yy-p>

<yy-p>你可能需要 <yy-text code>wrapper-class</yy-text> 和 <yy-text code>wrapper-style</yy-text> 来定义包裹元素的样式</yy-p>

<yy-p><yy-text type="warning">如果你确定popover的包含块元素就是body时请不要使用这个属性, 这将没有任何意义</yy-text></yy-p>

<demo6 />

::: details 查看示例

<<< ./demo6.vue

:::

## 内容宽度

<yy-p>
  设置 <yy-text code>width</yy-text> 来设置内容的宽度, 可以接受一个特殊参数 <yy-text code>trigger</yy-text>, 这时他的宽度将等于触发器的宽度
</yy-p>

<demo7 />

::: details 查看示例

<<< ./demo7.vue

:::

## 不要箭头

<yy-p>
  设置 <yy-text code>:show-arrow="false"</yy-text> 来关闭箭头
</yy-p>

<demo8 />

::: details 查看示例

<<< ./demo8.vue

:::

## 不要默认样式

<yy-p>
  设置 <yy-text code>raw</yy-text> 来关闭默认样式, 箭头也会关闭
</yy-p>

<demo9 />

::: details 查看示例

<<< ./demo9.vue

:::

## 内容类名和样式

<yy-p>
  设置 <yy-text code>content-class</yy-text> 和 <yy-text code>content-style</yy-text> 来设置内容的类名和样式
</yy-p>

<demo10 />

::: details 查看示例

<<< ./demo10.vue

:::

## 箭头类名和样式

<yy-p>
  设置 <yy-text code>arrow-class</yy-text> 和 <yy-text code>arrow-style</yy-text> 来设置箭头的类名和样式
</yy-p>

<demo11 />

::: details 查看示例

<<< ./demo11.vue

:::

## 层级

<yy-p>
 <yy-text code>Popover</yy-text> 有内置的层级控制, 不过你可以设置 <yy-text code>z-index</yy-text> 来覆盖
</yy-p>

<demo12 />

::: details 查看示例

<<< ./demo12.vue

:::

## 吸附元素距离触发器的距离

<yy-p>
  吸附元素距离触发器的距离默认为 10px, 可以根据 <yy-text code>distanceFromTrigger</yy-text> 来设置调整
</yy-p>

<demo13 />

::: details 查看示例

<<< ./demo13.vue

:::

## 手动控制位置

<yy-p>
  手动控制的前提是将 <yy-text code>trigger</yy-text> 设置为 <yy-text code>manual</yy-text>, 然后传递 <yy-text code>x</yy-text> 和 <yy-text code>y</yy-text> 来设置位置
</yy-p>

<yy-p>
  手动控制位置时会根据点击位置为中心获取一个矩形对象的位置和宽高信息, 再根据这个矩形的信息进行定位, 因为并不存在正真的dom元素, 所以无法在滚动时进行跟随
</yy-p>

<demo14 />

::: details 查看示例

<<< ./demo14.vue

:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发方式 | 'click' \| 'hover' \| 'focus' \| 'manual' | 'click' |
| placement | 弹出位置 | string | 'bottom' |
| width | 内容宽度 width=trigger时内容宽度与触发器宽度一致 | number \| string \| 'trigger' | - |
| showArrow | 是否显示箭头 | boolean | true |
| raw | 是否去除默认样式 | boolean | - |
| contentClass | 内容类名 | any | - |
| contentStyle | 内容样式 | StyleValue | - |
| arrowClass | 箭头类名 | any | - |
| arrowStyle | 箭头样式 | StyleValue | - |
| zIndex | 层级 | number | - |
| distanceFromTrigger | 吸附元素距离触发器的距离 | number | 10 |
| showPopover | 手动控制显示 | boolean | - |
| keepAliveOnHover | 鼠标悬停在内容时不隐藏 (仅在 trigger=hover 时生效) | boolean | true |
| delay | 延迟触发时间 (仅在 trigger=hover 时生效) | number | 100 |
| duration | 延迟隐藏时间 (仅在 trigger=hover 时生效) | number | 200 |
| to | 弹出层挂载位置 | string \| RendererElement \| boolean | 'body' |
| wrapper | 是否使用包裹元素 | boolean | - |
| wrapperClass | 包裹元素的类名 | string | - |
| wrapperStyle | 包裹元素的样式 | StyleValue | - |
| x | 手动控制位置x坐标 (仅在 trigger=manual 时生效) | number | - |
| y | 手动控制位置y坐标 (仅在 trigger=manual 时生效) | number | - |

## Events

| 事件名       | 说明                 | 回调参数 |
| ------------ | -------------------- | -------- |
| show         | 显示时触发           | -        |
| showed       | 显示动画结束时触发   | -        |
| hide         | 隐藏时触发           | -        |
| hid          | 隐藏动画结束时触发   | -        |
| clickoutside | 点击内容区域外时触发 | -        |

## Slots

| 插槽名  | 说明         |
| ------- | ------------ |
| trigger | 触发元素内容 |
| default | 弹出层内容   |

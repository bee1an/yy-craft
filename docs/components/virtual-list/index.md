# VirtualList 虚拟列表

<yy-p>用于高性能渲染长列表, 仅渲染可视区域的内容</yy-p>

<script setup lang="ts">
import demo from './demo.vue'
</script>

## 基础用法

<yy-p>使用 <yy-text code>data</yy-text> 设置列表数据, <yy-text code>VirtualList</yy-text> 会将每一项的数据回传给 slot, 怎么渲染由你决定 </yy-p>

<yy-p><yy-text code>wrapperMaxSize</yy-text> 设置了列表的最大尺寸, 当超过这个尺寸时才会使用滚动条, 后续可能会考虑移除这个参数</yy-p>

<demo src="./demos/basic.vue" />

::: details 查看示例

<<< ./demos/basic.vue

:::

## 重命名键

<yy-p>每一项的参数中必需有一个唯一标识来让 <yy-text code>VirtualList</yy-text> 区分, 默认键是 <yy-text code>key</yy-text>, 你可以根据 <yy-text code>keyField</yy-text> 进行重命名</yy-p>

<demo src="./demos/alias.vue" />

::: details 查看示例

<<< ./demos/alias.vue

:::

## 滚动条

<yy-p>可以通过 <yy-text code>scrollbar-props</yy-text> 修改滚动条配置</yy-p>

<demo src="./demos/scrollbar.vue" />

::: details 查看示例

<<< ./demos/scrollbar.vue

:::

## 横向虚拟列表

<yy-p>列表可以是横着的</yy-p>

<demo src="./demos/horizontal.vue" />

::: details 查看示例

<<< ./demos/horizontal.vue

:::

## 项的大小

<yy-p><yy-text code>VirtualList</yy-text> 会根据每一项的大小和总个数来确定最大尺寸的初始化, 最大尺寸会根据实际渲染的元素的大小进行调整, 项的大小内部有一个默认值, 所以它并不是必需的</yy-p>

<yy-p>如果你的每一项的大小都是固定的, 或者尺寸差别不大, 那么还是建议你传递这个值, 这样在使用滚动方式时会更加的精准和丝滑</yy-p>

<demo src="./demos/item-size.vue" />

::: details 查看示例

<<< ./demos/item-size.vue

:::

## 设置边界

<yy-p>按理说元素在不可见时就会被移除, 但是有些时候我们可能不想这样, 所以可以给 <yy-text code>VirtualList</yy-text> 设置边界条件</yy-p>

<yy-p><yy-text code>minBound</yy-text>: 最小边界, 默认值 -100 , 意思是当元素的最大的位置(例如, 如果是纵向的话就是最下面的位置)小于 -100 时就会被移除, 它的值必须小于0</yy-p>

<yy-p><yy-text code>maxBound</yy-text>: 最大边界, 默认值等于 <yy-text code>wrapperMaxSize</yy-text> , 意思是当元素的最小的位置(例如, 如果是纵向的话就是最上面的位置)大于 <yy-text code>wrapperMaxSize</yy-text> 时就会被移除, 它的值必须大于包裹元素的最大宽度</yy-p>

<demo src="./demos/bound.vue" />

::: details 查看示例

<<< ./demos/bound.vue

:::

## 关闭虚拟滚动

<yy-p><yy-text type="error">这个参数支持的还不是很好, 勿使用</yy-text></yy-p>

<demo src="./demos/devirtual.vue" />

::: details 查看示例

<<< ./demos/devirtual.vue

:::

## 方法

<yy-p>提供了滚动方法, 可以覆盖大部分使用场景</yy-p>

<demo src="./demos/scroll-method.vue" />

::: details 查看示例

<<< ./demos/scroll-method.vue

:::

## Props

| 参数           | 说明                | 类型             | 默认值         |
| -------------- | ------------------- | ---------------- | -------------- |
| scrollbarProps | 滚动条配置          | `ScrollbarProps` | -              |
| virtualScroll  | 是否使用虚拟滚动    | `boolean`        | true           |
| data           | 列表数据            | `any[]`          | -              |
| wrapperMaxSize | 滚动区域最大尺寸    | `number`         | 500            |
| vertical       | 是否为纵向          | `boolean`        | true           |
| itemSize       | 每项高度/宽度       | `number`         | 27             |
| minBound       | 最小边界            | `number`         | -100           |
| maxBound       | 最大边界            | `number`         | wrapperMaxSize |
| keyField       | 每一项的key字段别名 | `string`         | 'key'          |

## 方法

| 名称     | 说明           | 类型       |
| -------- | -------------- | ---------- |
| scrollTo | 滚动到指定位置 | `ScrollTo` |

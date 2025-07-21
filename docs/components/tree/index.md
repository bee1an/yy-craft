# Tree 树形控件

<yy-p>用于展示具有层级关系的数据结构</yy-p>

<yy-p><yy-text type="warning">pref: type error when use alias</yy-text></yy-p>

<yy-p><yy-text type="error">but: indent-width not work</yy-text></yy-p>

<yy-p><yy-text type="error">but: multiple selection error when try expanded</yy-text></yy-p>

<yy-p><yy-text type="error">but: draggable</yy-text></yy-p>

<script setup lang="ts">
import demo from './demo.vue'
</script>

## 基础用法

<yy-p>最基本的树形结构展示</yy-p>

<demo src="./demos/basic.vue" />

::: details 查看示例

<<< ./demos/basic.vue

:::

## 属性重命名

<yy-p>有时候你的 <yy-text code>value</yy-text> 和 <yy-text code>key</yy-text> 的名字可能不同, 那么你可以通过 <yy-text code>value-field</yy-text> 和 <yy-text code>key-field</yy-text> 来重命名</yy-p>

<demo src="./demos/ren.vue" />

::: details 查看示例

<<< ./demos/ren.vue

:::

## 缩进宽度

<yy-p><yy-text code>indent-width</yy-text> 设置缩进宽度</yy-p>

<demo src="./demos/indent-width.vue" />

::: details 查看示例

<<< ./demos/indent-width.vue

:::

## 默认展开

<yy-p><yy-text code>default-expanded-keys</yy-text> 设置默认展开项</yy-p>

<demo src="./demos/expanded.vue" />

::: details 查看示例

<<< ./demos/expanded.vue

:::

## 可选择

<yy-p>设置 <yy-text code>selectable</yy-text> 属性后可以选中节点，设置 <yy-text code>multiple</yy-text> 属性后可以多选</yy-p>

<demo src="./demos/selection.vue" />

::: details 查看示例

<<< ./demos/selection.vue

:::

## 可拖拽

<yy-p>设置 <yy-text code>draggable</yy-text> 属性后可以拖拽节点</yy-p>

<demo src="./demos/draggable.vue" />

::: details 查看示例

<<< ./demos/draggable.vue

:::

## 动态加载

<yy-p>设置 <yy-text code>on-load</yy-text> 函数可以动态加载子节点数据</yy-p>

<yy-p>动态加载的节点不能是叶子节点, 所以设置 <yy-text code>leaf</yy-text> 必须为 <yy-text code>false</yy-text> </yy-p>

<demo src="./demos/async.vue" />

::: details 查看示例

<<< ./demos/async.vue

:::

## 虚拟滚动

<yy-p>当数据量较大时, 可以使用虚拟滚动来提升性能</yy-p>

<yy-p>设置 <yy-text code>virtual-scroll</yy-text> 开启虚拟滚动</yy-p>

<demo src="./demos/virtual.vue" />

::: details 查看示例

<<< ./demos/virtual.vue

:::

## 传递插槽

<yy-p>可以传递插槽修改默认显示内容</yy-p>

<demo src="./demos/slot.vue" />

::: details 查看示例

<<< ./demos/slot.vue

:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 展示数据 | `TreeOption[]` | - |
| valueField | 节点值的字段名 | `string` | 'value' |
| keyField | 节点键的字段名 | `string` | 'key' |
| defaultExpandedKeys | 默认展开的节点 | `string[]` | - |
| onLoad | 加载子节点的函数 | `(node: TreeOption) => Promise<any>` | - |
| selectable | 是否可选择 | `boolean` | false |
| multiple | 是否可多选 | `boolean` | false |
| selectedKeys | 选中的节点 | `string[]` | - |
| indentWidth | 缩进宽度 | `number` | 21 |
| draggable | 是否可拖拽 | `boolean` | false |
| virtualScroll | 是否启用虚拟滚动 | `boolean` | false |
| virtualListProps | 虚拟列表配置 | `{ wrapperMaxSize?: number }` | - |
| scrollbarProps | 滚动条配置: 仅在虚拟滚动时生效 | `ScrollbarProps` | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| drag | 拖拽完成时触发 | `(info: { dragNode: TreeOption, dragNodeParent: TreeOption \| null, dropNode: TreeOption \| null, position: number }) => void` |

## TreeOption 数据结构

```ts
interface TreeOption {
	value: string | number // 节点值
	key: string // 节点唯一标识
	children?: TreeOption[] // 子节点
	isLeaf?: boolean // 是否是叶子节点
	[key: string]: any // 其他自定义属性
}
```

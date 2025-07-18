# Dropdown 下拉菜单

<yy-p>用于快速实现下拉菜单功能 支持自定义选项 图标 分组 多级菜单和选中等特性</yy-p>

<script setup lang="ts">
import BasicUsage from './basic-usage.vue'
import DropdownIcon from './dropdown-icon.vue'
import DropdownGroup from './dropdown-group.vue'
import DropdownNested from './dropdown-nested.vue'
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
</script>

## 基本用法

<yy-p><yy-text code>options</yy-text> 中的元素 <yy-text code>label</yy-text> 和 <yy-text code>key</yy-text>是必需的</yy-p>

<BasicUsage />

::: details 查看示例

<<< ./basic-usage.vue

:::

## 图标

<yy-p>图标支持传递一个函数返回图标的 <yy-text code>VNode</yy-text></yy-p>

<DropdownIcon />

::: details 查看示例

<<< ./dropdown-icon.vue

:::

## 分组

<yy-p>给任意一个元素设置 <yy-text code>type</yy-text> 为 <yy-text code>group</yy-text></yy-p>

<yy-p><yy-text type="warning">注意: </yy-text>当某一个项被指定为组时, 那么他的子项将提升到上一层级, 而不会嵌套</yy-p>

<DropdownGroup />

::: details 查看示例

<<< ./dropdown-group.vue

:::

## 嵌套

<yy-p>可以给任意一个元素设置 <yy-text code>chilren</yy-text> 这样 <yy-text code>chilren</yy-text> 中的元素将被收起, 直到你移入才会打开</yy-p>

<DropdownNested />

::: details 查看示例

<<< ./dropdown-nested.vue

:::

## 二级菜单触发位置

<yy-p>可以通过 <yy-text code>subPlacement</yy-text> 来设置二级菜单的触发位置</yy-p>

<demo1 />

::: details 查看示例

<<< ./demo1.vue

:::

## 可选中

<yy-p>可以通过 <yy-text code>selectable</yy-text> 设置是否可选中</yy-p>

<demo2 />

::: details 查看示例

<<< ./demo2.vue

:::

## 默认选中

<yy-p><yy-text code>selectedKeys</yy-text> 配置菜单选中的key, 它是一个model</yy-p>

<yy-p><yy-text type="warning">需要设置<yy-text code>selectable=true</yy-text></yy-text></yy-p>

<demo3 />

::: details 查看示例

<<< ./demo3.vue

:::

## 触发方式

<yy-p><yy-text code>trigger=click | hover | focus | manual</yy-text></yy-p>

<demo10 />

::: details 查看示例

<<< ./demo10.vue

:::

## 手动控制下拉框显示

<yy-p>设置 <yy-text code>showPopover</yy-text> 来配置默认显示状态</yy-p>

<yy-p>他不是一个model, 但是下拉框内部会监听并同步这个值的变化</yy-p>

<demo4 />

::: details 查看示例

<<< ./demo4.vue

:::

## 设置元素的显示位置

<yy-p>可以通过 <yy-text code>placement</yy-text> 设置元素的显示位置</yy-p>

<yy-p>可接受参数 <yy-text code>'top'</yy-text>, <yy-text code>'bottom'</yy-text>, <yy-text code>'left'</yy-text>, <yy-text code>'right'</yy-text>, <yy-text code>'top-start'</yy-text>, <yy-text code>'top-end'</yy-text>, <yy-text code>'bottom-start'</yy-text>, <yy-text code>'bottom-end'</yy-text>, <yy-text code>'left-start'</yy-text>, <yy-text code>'left-end'</yy-text>, <yy-text code>'right-start'</yy-text>, <yy-text code>'right-end'</yy-text></yy-p>

<demo5 />

::: details 查看示例

<<< ./demo5.vue

:::

## 设置元素的挂载位置

<yy-p>dropdown将默认挂载到body下,可以通过 <yy-text code>to</yy-text> 挂载到任意位置, 传递<yy-text code>to=false</yy-text>将挂载到原位置</yy-p>

<demo6 />

::: details 查看示例

<<< ./demo6.vue

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
  提供这个prop的原因是当你需要将下拉框挂载到包含块元素不是body时, 这时计算的位置会有问题
</yy-p>

<yy-p>
dropdown基于popover, 会根据触发器在页面中的位置进行定位, 但是如果内容元素的包含块元素不是body, 那么计算的位置就会错误
</yy-p>

<yy-p>
dropdown根据包含块元素进行位置修正很困难, 所以需要提供一个包裹元素, 这个包裹元素是一个包含块元素, 再根据这个包裹元素进行定位修正
</yy-p>

<yy-p>你可能需要 <yy-text code>wrapper-class</yy-text> 和 <yy-text code>wrapper-style</yy-text> 来定义包裹元素的样式</yy-p>

<yy-p><yy-text type="warning">不要在to不为false时使用, 这将没有任何意义</yy-text></yy-p>

<demo7 />

::: details 查看示例

<<< ./demo7.vue

:::

## 不要箭头

<yy-p>设置 <yy-text code>show-arrow=false</yy-text> 不显示箭头</yy-p>

<demo8 />

::: details 查看示例

<<< ./demo8.vue

:::

## 设置层级

<yy-p>popover有独立的层级计算, 不建议修改它, 但是还是暴露了 <yy-text code>z-index</yy-text> 用来修改它</yy-p>

<demo9 />

::: details 查看示例

<<< ./demo9.vue

:::

## Props

| 参数         | 说明               | 类型                                      | 默认值        |
| ------------ | ------------------ | ----------------------------------------- | ------------- |
| options      | 下拉菜单选项       | DropdownOption[]                          | []            |
| selectable   | 是否可选中         | boolean                                   | -             |
| selectedKeys | 选中的key值        | Array<string \| number \| symbol>         | []            |
| subPlacement | 子菜单弹出位置     | DefaultPlacement                          | 'right-start' |
| trigger      | 触发方式           | 'click' \| 'hover' \| 'focus' \| 'manual' | 'click'       |
| showPopover  | 手动控制下拉框显示 | boolean                                   | -             |
| showArrow    | 是否显示箭头       | boolean                                   | true          |
| zIndex       | 弹出层层级         | number                                    | -             |
| placement    | 弹出位置           | DefaultPlacement                          | 'bottom'      |
| to           | 弹出层挂载位置     | string \| RendererElement \| boolean      | 'body'        |
| wrapper      | 是否使用包裹元素   | boolean                                   | false         |
| wrapperClass | 包裹元素类名       | any                                       | -             |
| wrapperStyle | 包裹元素样式       | StyleValue                                | -             |

## 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| trigger | 触发器元素     |
| default | 触发下拉的元素 |

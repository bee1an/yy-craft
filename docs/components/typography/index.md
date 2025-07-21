# Typography 文字排版

<yy-p>用于展示不同层级, 样式的文本内容, 包括段落, 标题, 文本, 链接等</yy-p>

<script setup lang="ts">
import demo from './demo.vue'
</script>

## 段落

<demo src="./demos/paragraph.vue" />

::: details 查看示例

<<< ./demos/paragraph.vue

:::

## 文字

<yy-p>你可以给文字提供不同的状态</yy-p>

<demo src="./demos/text.vue" />

::: details 查看示例

<<< ./demos/text.vue

:::

## 链接

<yy-p>普通的链接,只是多了一点样式</yy-p>

<demo src="./demos/link.vue" />

::: details 查看示例

<<< ./demos/link.vue

:::

## 标题

<yy-p>也给标题加了特殊的样式</yy-p>

<demo src="./demos/title.vue" />

::: details 查看示例

<<< ./demos/title.vue

:::

## Props

### P

| 参数  | 说明             | 类型     | 默认值 |
| ----- | ---------------- | -------- | ------ |
| depth | 深度，支持 1/2/3 | `number` | 1      |

### Text

| 参数      | 说明                                       | 类型      | 默认值 |
| --------- | ------------------------------------------ | --------- | ------ |
| type      | 主题色，可选值：success/warning/error/info | `string`  | -      |
| depth     | 层级，支持 1/2/3                           | `number`  | -      |
| strong    | 加粗                                       | `boolean` | -      |
| italic    | 斜体                                       | `boolean` | -      |
| underline | 下划线                                     | `boolean` | -      |
| delete    | 删除线                                     | `boolean` | -      |
| tag       | 渲染为指定标签                             | `string`  | span   |
| code      | 代码样式                                   | `boolean` | -      |

### H1 - H6

| 参数         | 说明         | 类型      | 默认值 |
| ------------ | ------------ | --------- | ------ |
| prefix       | 是否显示前缀 | `boolean` | -      |
| align-text   | 是否居中     | `boolean` | -      |
| prefix-color | 前缀颜色     | `string`  | -      |
| type         | 主题色       | `string`  | -      |

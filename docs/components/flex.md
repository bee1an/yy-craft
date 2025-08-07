# Flex 弹性布局

<yy-p>用于快速实现弹性盒子布局, 简化 flex 布局的使用, 支持主轴/交叉轴对齐, 间距, 垂直, 换行, 行内等</yy-p>

## 基本用法

<yy-flex>
  <yy-button>1</yy-button>
  <yy-button>2</yy-button>
  <yy-button>3</yy-button>
</yy-flex>

::: details 查看示例

```vue
<template>
  <yy-flex>
    <yy-button>1</yy-button>
    <yy-button>2</yy-button>
    <yy-button>3</yy-button>
  </yy-flex>
</template>
```

:::

## 主轴对齐

<yy-p>通过 <yy-text code>justify</yy-text> 设置主轴对齐方式, 如 <yy-text code>flex-start</yy-text>, <yy-text code>center</yy-text>, <yy-text code>space-between</yy-text> 等</yy-p>

<yy-p>这个将被直接应用到 <yy-text code>justify-content</yy-text>样式, 所以你的值只需是合法的 <yy-text code>justify-content</yy-text> 值即可, <yy-a target="_blank" href="https://developer.mozilla.org/docs/Web/CSS/justify-content">详情</yy-a></yy-p>

<yy-flex justify="center">
  <yy-button>center</yy-button>
</yy-flex>

::: details 查看示例

```vue
<template>
  <yy-flex justify="center">
    <yy-button>center</yy-button>
  </yy-flex>
</template>
```

:::

## 交叉轴对齐

<yy-p>通过 <yy-text code>align</yy-text> 设置交叉轴对齐方式, 如 <yy-text code>flex-end</yy-text>, <yy-text code>center</yy-text>, <yy-text code>stretch</yy-text> 等</yy-p>

<yy-p>同理 <yy-text code>align-items</yy-text>, <yy-a target="_blank" href="https://developer.mozilla.org/docs/Web/CSS/align-items">详情</yy-a></yy-p>

<yy-flex align="flex-end">
  <yy-button>end</yy-button>
</yy-flex>

::: details 查看示例

```vue
<template>
  <yy-flex align="flex-end">
    <yy-button>end</yy-button>
  </yy-flex>
</template>
```

:::

## 垂直方向

<yy-p>设置 <yy-text code>vertical</yy-text> 为 <yy-text code>true</yy-text>, 主轴变为纵向</yy-p>

<yy-flex vertical>
  <yy-button>A</yy-button>
  <yy-button>B</yy-button>
</yy-flex>

::: details 查看示例

```vue
<template>
  <yy-flex vertical>
    <yy-button>A</yy-button>
    <yy-button>B</yy-button>
  </yy-flex>
</template>
```

:::

## 间距 size

<yy-p>通过 <yy-text code>size</yy-text> 设置子元素间距, 支持 <yy-text code>small</yy-text>, <yy-text code>medium</yy-text>, <yy-text code>large</yy-text>, 数字或数组</yy-p>

<yy-flex vertical>
  <yy-flex size="large">
  <yy-button>large</yy-button>
  <yy-button>large</yy-button>
  </yy-flex>
  <yy-flex :size="[8, 24]">
  <yy-button>8x24</yy-button>
  <yy-button>8x24</yy-button>
  </yy-flex>
</yy-flex>

::: details 查看示例

```vue
<template>
  <yy-flex>
    <yy-flex size="large">
      <yy-button>large</yy-button>
      <yy-button>large</yy-button>
    </yy-flex>
    <yy-flex :size="[8, 24]">
      <yy-button>8x24</yy-button>
      <yy-button>8x24</yy-button>
    </yy-flex>
  </yy-flex>
</template>
```

:::

## 行内模式

<yy-p>设置 <yy-text code>inline</yy-text> 为 <yy-text code>true</yy-text>, 变为行内弹性盒</yy-p>

<yy-flex inline>
  <yy-button>inline</yy-button>
  <yy-button>inline</yy-button>
</yy-flex>

## 换行

<yy-p>通过 <yy-text code>wrap</yy-text> 控制是否自动换行</yy-p>

<yy-flex wrap style="width:200px;">
  <yy-button style="width:120px;">1</yy-button>
  <yy-button style="width:120px;">2</yy-button>
</yy-flex>

::: details 查看示例

```vue
<template>
  <yy-flex wrap style="width:200px;">
    <yy-button style="width:120px;">
      1
    </yy-button>
    <yy-button style="width:120px;">
      2
    </yy-button>
  </yy-flex>
</template>
```

:::

## Props

| 参数     | 说明           | 类型                                                         | 默认值     |
| -------- | -------------- | ------------------------------------------------------------ | ---------- |
| align    | 交叉轴对齐     | string                                                       | -          |
| inline   | 是否为行内元素 | boolean                                                      | false      |
| justify  | 主轴对齐       | string                                                       | flex-start |
| size     | 间距           | 'small' \| 'medium' \| 'large' \| number \| [number, number] | medium     |
| vertical | 是否垂直显示   | boolean                                                      | false      |
| wrap     | 超出是否换行   | boolean                                                      | true       |

# Divider 分割线

<yy-p>用于分隔内容区域，支持水平、垂直、虚线、内容居中等多种样式。</yy-p>

## 基本用法

<yy-p>默认渲染一条水平分割线。</yy-p>

<yy-divider />

::: details 查看示例

```vue
<template>
  <yy-divider />
</template>
```

:::

## 带内容的分割线

<yy-divider>内容</yy-divider>

::: details 查看示例

```vue
<template>
  <yy-divider>内容</yy-divider>
</template>
```

:::

## 内容位置

<yy-p>通过<yy-text code>contentPosition</yy-text>设置内容位置，可选<yy-text code>left</yy-text>、<yy-text code>center</yy-text>、<yy-text code>right</yy-text>。</yy-p>

<yy-divider content-position="left">左侧</yy-divider> <yy-divider content-position="center">居中</yy-divider> <yy-divider content-position="right">右侧</yy-divider>

::: details 查看示例

```vue
<template>
  <yy-divider content-position="left">
    左侧
  </yy-divider>
  <yy-divider content-position="center">
    居中
  </yy-divider>
  <yy-divider content-position="right">
    右侧
  </yy-divider>
</template>
```

:::

## 虚线分割线

<yy-p>通过<yy-text code>borderStyle</yy-text>设置分割线样式，如<yy-text code>dashed</yy-text>、<yy-text code>dotted</yy-text>等。</yy-p>

<yy-divider border-style="dashed">Dashed</yy-divider> <yy-divider border-style="dotted">Dotted</yy-divider>

::: details 查看示例

```vue
<template>
  <yy-divider border-style="dashed">
    Dashed
  </yy-divider>
  <yy-divider border-style="dotted">
    Dotted
  </yy-divider>
</template>
```

:::

## 垂直分割线

<yy-p>设置<yy-text code>vertical</yy-text>为<yy-text code>true</yy-text>，渲染垂直分割线。</yy-p>

<div style="height: 100px"><yy-divider vertical /></div>

::: details 查看示例

```vue
<template>
  <yy-divider vertical />
</template>
```

:::

## Props

| 参数            | 说明       | 类型                                                                                                            | 默认值   |
| --------------- | ---------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| borderStyle     | 分割线样式 | 'none' \| 'hidden' \| 'dotted' \| 'dashed' \| 'solid' \| 'double' \| 'groove' \| 'ridge' \| 'inset' \| 'outset' | -        |
| contentPosition | 内容位置   | 'left' \| 'right' \| 'center'                                                                                   | 'center' |
| vertical        | 是否垂直   | boolean                                                                                                         | false    |

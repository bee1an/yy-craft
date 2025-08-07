# ConfigProvider 配置提供者

<yy-p>用于全局配置主题等参数，包裹在应用或组件外层，实现统一配置。</yy-p>

## 基本用法

<yy-p>通过<yy-text code>theme</yy-text>属性设置主题，可选值为<yy-text code>light</yy-text>或<yy-text code>dark</yy-text>。</yy-p>

<yy-flex>
  <yy-config-provider theme="light">
    <yy-button>Light Theme</yy-button>
  </yy-config-provider>
  <yy-config-provider theme="dark">
    <yy-button>Dark Theme</yy-button>
  </yy-config-provider>
</yy-flex>

::: details 查看示例

```vue
<template>
  <yy-config-provider theme="light">
    <yy-button>Light Theme</yy-button>
  </yy-config-provider>
  <yy-config-provider theme="dark">
    <yy-button>Dark Theme</yy-button>
  </yy-config-provider>
</template>
```

:::

## 嵌套使用

<yy-p>ConfigProvider 支持嵌套，内层配置会覆盖外层。</yy-p>

::: details 查看示例

```vue
<template>
  <yy-config-provider theme="light">
    <yy-button>外层 Light</yy-button>
    <yy-config-provider theme="dark">
      <yy-button>内层 Dark</yy-button>
    </yy-config-provider>
  </yy-config-provider>
</template>
```

:::

## Props

| 参数  | 说明     | 类型                        | 默认值  |
| ----- | -------- | --------------------------- | ------- |
| theme | 主题色调 | 'light' \| 'dark' \| string | 'light' |

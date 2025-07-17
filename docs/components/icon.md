<script setup lang="ts">
	import { LogoVue } from '@vicons/ionicons5'
</script>

# Icon 图标

<yy-p>yy-craft 使用 xicons 图标库, <yy-text type="error">并非内置</yy-text></yy-p>

```zsh
pnpn install @vicons/ionicons5
```

## 使用

<yy-p>
	你可选择修改他的尺寸或者颜色分别使用<yy-text code>size</yy-text>和<yy-text code>color</yy-text>
</yy-p>

<yy-icon color="red" size="20"><LogoVue /></yy-icon> <yy-icon color="blue" :size="30"><LogoVue /></yy-icon>

```vue
<script setup lang="ts">
	import { LogoVue } from '@vicons/ionicons5'
</script>

<template>
	<yy-icon color="red" size="20"/><LogoVue /></yy-icon>
	<yy-icon color="blue" :size="30"><LogoVue /></yy-icon>
</template>
```

## Props

| 参数  | 说明 | 类型           | 默认值 |
| ----- | ---- | -------------- | ------ |
| color | 颜色 | string         | -      |
| size  | 尺寸 | number\|string | -      |

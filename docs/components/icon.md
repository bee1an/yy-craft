# Icon 图标

yy-ui 使用 xicons 图标库

```
$ pnpn install @vicons/ionicons5
```

## 使用

- 该用例使用了全局注册组件，所以不需要引入

<script setup lang="ts">
	import { LogoVue } from '@vicons/ionicons5'
</script>

<yy-icon color="red" :size="20"><LogoVue /></yy-icon>
<yy-icon color="blue" :size="30"><LogoVue /></yy-icon>

```vue
<script setup lang="ts">
	import { LogoVue } from '@vicons/ionicons5'
</script>

<template>
	<yy-icon color="red" size="50" /><LogoVue /></yy-icon>
	<yy-icon color="blue" :size="30"><LogoVue /></yy-icon>
</template>
```

## API

### Props

| 参数  | 说明 | 类型           | 默认值 |
| ----- | ---- | -------------- | ------ |
| color | 颜色 | string         | -      |
| size  | 尺寸 | number\|string | -      |

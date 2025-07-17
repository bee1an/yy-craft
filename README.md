<p align="center">
  <img width="200px" src="docs/public/yy-craft-logo.svg" >
</p>

<p align="center">
  <a href="https://github.com/vuejs/core">
    <img src="https://img.shields.io/badge/Vue->=3.2.25-%2342b883" alt="Vue3"/>
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue" alt="License"/>
  </a>
  <a href="https://rolldown.rs/">
    <img src="https://img.shields.io/badge/Bundle--by-rolldown-orange" alt="Version"/>
  </a>
</p>

<p align="center">Yy Craft - 一个基于 Vue3 的组件库</p>

- :100: 类型安全
- :package: `rolldown`

## 使用

```bash
npm install yy-craft
```

### 全局注册

全局注册 treeshaking 将会不生效

```js
import { createApp } from 'vue'
import YyCraft from 'yy-craft'

createApp(App).use(YyCraft).mount('#app')
```

### 按需引入

推荐, 更加推荐自动导入, 但是没有

```js
import { createApp } from 'vue'
import App from './App.vue'
import { create, buttonWithInstall } from 'yy-craft'

const app = createApp(App)
app.use(create({ pluginMakers: [buttonWithInstall] })).mount('#app')
```

[更多](https://yy-craft.netlify.app/)

## 开源

[MIT License](LICENSE)

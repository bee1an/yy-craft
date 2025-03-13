<h1 align="center">🧩</h1>

<!-- ![Vue3](https://img.shields.io/badge/Vue->=3.0.0-%2342b883) ![License](https://img.shields.io/badge/License-MIT-green) ![Version](https://img.shields.io/badge/Version-beta--0.0.1-blue) -->

<p align="center">
  <a href="https://github.com/vuejs/core">
    <img src="https://img.shields.io/badge/Vue->=3.2.25-%2342b883" alt="Vue3"/>
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green" alt="License"/>
  </a>
  <a href="https://github.com/bee1an/yy-ui/tree/dev">
    <img src="https://img.shields.io/badge/Version-1.0.0--beta.2-blue" alt="Version"/>
  </a>
</p>

<p align="center">Yy UI - 一个基于 Vue3 的组件库</p>

📋 Todo List

- [x] 🧹 **优化打包结构**
  - 优化打包后的目录结构
  - 实现 ESM/CJS 双模式输出
  - dts 文件生成
- [x] ⬇️ **依赖降级(>=vue3.0.0)**
  - 实际降级到 3.2.25
- [ ] 🌳 **Tree-shaking 测试**
- [ ] 🧪 **编写单元测试**
- [ ] 📂 **编写更多的组件**
- [ ] 📄 **完善组件文档**
  - 需包含 Props/Events/Slots 详细说明及用法示例
- [ ] 📦 打包工具迁移
  - 评估 [`tsup`](https://github.com/egoist/tsup) 的适用性（基于 ESBuild）
  - 对比现有 Rollup 配置的差异

## ✨ **核心特性**

| 特性                   | 描述                                                                       |
| ---------------------- | -------------------------------------------------------------------------- |
| 🔵 **TypeScript 支持** | 所有组件源码使用 TS 开发，类型完整                                         |
| 🎨 **主题系统**        | 支持特性：<br>• CSS 变量动态热更新<br>• 内置亮暗双主题切换（`light/dark`） |

## 🏗️ **技术架构**

### **样式方案**

[![CSS Render](https://img.shields.io/badge/css--render-0.15.14-blue)](https://github.com/07akioni/css-render)

- 采用 `CSS-in-JS` 方案  
  ✓ 零样式文件导入  
  ✓ 按需加载样式逻辑  
  ✓ 组件级样式隔离
- BEM 命名规范  
  ✓ 降低样式冲突风险

### 构建方案

[![Rollup](https://img.shields.io/badge/rollup-4.34.4-brightgreen)](https://rollupjs.org/)

## 许可证

本项目采用 [MIT License](LICENSE) 开源协议

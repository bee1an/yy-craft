# 📒 笔记

## 📦 关于打包

### 🌀 Rollup 指南

#### 🔧 核心插件

1. **第三方包解析**（基本必备）

   - [`@rollup/plugin-node-resolve`](https://github.com/rollup/plugins/tree/master/packages/node-resolve)  
     🔍 使用技巧：
     ```ts
     resolve({ extensions: ['.ts'] }) // 启用 TypeScript 文件扩展名自动解析
     ```
     ⚠️ 注意(_个人猜测未验证_)：TS 项目必须添加此配置项（相当于自动补全模块的.ts 后缀）

2. **TypeScript 编译方案**  
   ✅ **推荐方案**：

   - [`rollup-plugin-esbuild`](https://github.com/egoist/rollup-plugin-esbuild)  
     （Vite 内部同款编译器，支持 Tree-Shaking）

   ❌ **不推荐方案**：

   - `@rollup/plugin-typescript`（官方插件）
   - `rollup-plugin-typescript2`（社区插件）  
     🚫 限制因素：
     - 无法解析 SFC 文件的 TS 语法
     - 缺乏 Tree-Shaking 支持（待验证）

3. **Vue 组件编译方案**  
   ✅ **生产级方案**：

   - [`@vitejs/plugin-vue`](https://github.com/vitejs/vite-plugin-vue)  
     （暂未发现不妥）

   🚫 **已废弃方案**：

   - ~~`rollup-plugin-vue`~~  
     ⚠️ 已知问题：[~~Vue 3.3 类型宏增强方案似乎未生效~~](https://blog.vuejs.org/posts/vue-3-3#imported-and-complex-types-support-in-macros)
     ```ts
     import { type Foo } from 'anywhere'
     defineProps<Foo>() // 当使用外部类型时编译报错
     ```

---

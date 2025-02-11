# 📒 笔记

## 📦 关于打包

### 🌀 Rollup 指南

#### 🔧 核心插件

- [`@rollup/plugin-node-resolve`](#1-第三方包解析基本必备)
- [`rollup-plugin-esbuild`](#2-typescript-编译方案)
- [`@vitejs/plugin-vue`](#3-vue-组件编译方案)
- [`@vitejs/plugin-vue-jsx`](#4-vue-tsx-编译方案)

##### 1. **第三方包解析**（基本必备）

- [`@rollup/plugin-node-resolve`](https://github.com/rollup/plugins/tree/master/packages/node-resolve)  
  🔍 使用技巧：
  ```ts
  resolve({ extensions: ['.ts'] }) // 启用 TypeScript 文件扩展名自动解析
  ```
  ⚠️ 注意(_个人猜测未验证_)：TS 项目必须添加此配置项（相当于自动补全模块的.ts 后缀）

##### 2. **TypeScript 编译方案**

✅ **推荐方案**：

- [`rollup-plugin-esbuild`](https://github.com/egoist/rollup-plugin-esbuild)  
  🌟 Vite 内部同款编译器，支持 Tree-Shaking
  ⚠️ **编译 tsx 未使用该方案, rollup 在 Tree-Shaking vue 时会报警告**

  > "Fragment" is imported from external module "vue" but never used in "node_modules/.pnpm/vue@3.5.13_typescript@5.7.2/node_modules/vue/jsx-runtime/index.mjs"

  📖 关于 tsx: esbuild 会自动拾取`tsconfig.json`配置或者[单独配置](https://github.com/egoist/rollup-plugin-esbuild?tab=readme-ov-file#usage)

  ```json
  // tsconfig.json
  {
    "compilerOptions": {
      /*
          tsx编译后创建元素的工厂函数, vue需要修改为h函数
          detail: https://esbuild.github.io/api/#jsx-factory
      */
      "jsxFactory": "h",
      /*
          tsx片段(<>anything</>)转义后的元素
          detail: https://esbuild.github.io/api/#jsx-fragment
      */
      "jsxFragmentFactory": "Fragment"
    }
  }
  ```

❌ **不推荐方案**：

- `@rollup/plugin-typescript`（官方插件）
- `rollup-plugin-typescript2`（社区插件）  
  🚫 限制因素：
  - 无法解析 SFC 文件的 TS 语法
  - 缺乏 Tree-Shaking 支持（待验证）

##### 3. **Vue 组件编译方案**

✅ **生产级方案**：

- [`@vitejs/plugin-vue`](https://github.com/vitejs/vite-plugin-vue)  
  ⏳ 暂未发现不妥

🚫 **已废弃方案**：

- ~~`rollup-plugin-vue`~~  
  ⚠️ github 已经归档，不再维护，建议使用 `@vitejs/plugin-vue`
  ⚠️ 已知问题：[~~Vue 3.3 类型宏增强方案似乎未生效~~](https://blog.vuejs.org/posts/vue-3-3#imported-and-complex-types-support-in-macros)
  ```ts
  import { type Foo } from 'anywhere'
  defineProps<Foo>() // 当使用外部类型时编译报错
  ```

##### 4. **Vue tsx 编译方案**

- [`@vitejs/plugin-vue-jsx`](https://github.com/vitejs/vite-plugin-vue)

---

# 📒 笔记

## 📦 关于打包

### 🌀 Rollup 指南

#### 🔧 核心插件

- [`@rollup/plugin-node-resolve`](#1-第三方包解析基本必备)
- [`rollup-plugin-esbuild`](#2-typescript-编译方案)
- [`unplugin-vue`](#3-vue-组件编译方案)
- [`@vitejs/plugin-vue-jsx`](#4-vue-tsx-编译方案)
- [`rollup-plugin-visualizer`](#5-生成包结构)
- [`rollup-plugin-copy`](#6-保留指定文件)

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
  🌟 **快!** 可以代替 `rollup-plugin-typescript2`, `@rollup/plugin-typescript` 和 `rollup-plugin-terser`的集合

  ⚠️ rollup 在 Tree-Shaking vue(>=3.3) 时会报警告

  > "Fragment" is imported from external module "vue" but never used in "node_modules/.pnpm/vue@3.5.13_typescript@5.7.2/node_modules/vue/jsx-runtime/index.mjs"

  📖 关于 tsx: esbuild 会自动拾取`tsconfig.json`配置或者[单独配置](https://github.com/egoist/rollup-plugin-esbuild?tab=readme-ov-file#usage)
  ⚠️ 本项目编译 tsx **未使用**该方案

❌ **不推荐方案**：

- `@rollup/plugin-typescript`（官方插件）
- `rollup-plugin-typescript2`（社区插件）  
  🚫 限制因素：
  - 无法解析 SFC 文件的 TS 语法
  - 缺乏 Tree-Shaking 支持（待验证）

##### 3. **Vue 组件编译方案**

⚠️ 本项目采用 `unplugin-vue`

✅ **生产级方案**：

- [`@vitejs/plugin-vue`](https://github.com/vitejs/vite-plugin-vue)  
  ⏳ 暂未发现不妥(用于 vite)

- [`unplugin-vue`](https://github.com/unplugin/unplugin-vue)
  🔄 定期从@vitejs/plugin-vue 同步代码（用于 rollup）

🚫 **已废弃方案**：

- ~~`rollup-plugin-vue`~~  
  ⛔ github 已经归档，不再维护，代替方案 `unplugin-vue`
  ⚠️ 已知问题：[~~Vue 3.3 类型宏增强方案似乎未生效~~](https://blog.vuejs.org/posts/vue-3-3#imported-and-complex-types-support-in-macros)

  ```ts
  import { type Foo } from 'anywhere'
  defineProps<Foo>() // 当使用外部类型时编译报错
  ```

##### 4. **Vue tsx 编译方案**

- [`@vitejs/plugin-vue-jsx`](https://github.com/vitejs/vite-plugin-vue)

##### 5. **生成包结构**

- [`rollup-plugin-visualizer`](https://github.com/btd/rollup-plugin-visualizer?tab=readme-ov-file#usage)

  ⚙️ 项目跟目录下生成`stats.html`文件，用于展示打包后的包结构

##### 6. **保留指定文件**

- [`rollup-plugin-copy`](https://github.com/vladshcherbin/rollup-plugin-copy)

  - 将 `packages/yy-ui/package.json` 复制到 `dist/yy-ui/package.json`
  - 将 `README.md` 复制到 `dist/yy-ui/README.md`

##### 7. **dts 生成方案**

❌ **不推荐方案**：

- [`rollup-plugin-dts`](https://github.com/Swatinem/rollup-plugin-dts)
  - 无法生成 vue 文件的 dts

✅ **推荐方案**：

- [`vite-plugin-dts`](https://github.com/qmhc/vite-plugin-dts)

  **核心配置**

  ```js
  {
    outDir: ['dist/yy-ui/es', 'dist/yy-ui/lib', 'dist/types'], // 多出口
    include: ['packages'], // 仅生成 packages
    insertTypesEntry: true, // 根据rollup入口生成dts入口
  }
  ```

  **完成后重写**

  [重写 dts 入口文件](./scripts/replace-dts.ts)

  **常见问题**

  > The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.

  - 在 tsx 文件中模板引用使用了 `ref`，需要使用 `shallowRef`

#### ⚙️ 打包配置

**核心思想**

根据 `packages/yy-ui` 的文件结构配置多模块, `packages/yy-ui` 下对应的文件引用对应的包

**核心代码**

```js
// rollup.config.js

// 多模块入口配置
const inputs = Object.fromEntries(
  fs
    .readdirSync(uiDir)
    .filter((file) => file.endsWith('.ts')) // 找到所有ts文件, 根据ts文件生成入口
    .map((file) => [
      file.substring(0, file.lastIndexOf('.')),
      path.resolve(uiDir, file)
    ])
)

// 出口核心配置
const outputs = {
  preserveModules: true, // 保留模块结构
  preserveModulesRoot: path.resolve('packages') // 指定模块入口目录
}
```

## ⚡ 优化

### [~~**rimraf**~~](https://github.com/isaacs/rimraf)

⚠️ 本项目废弃改方案, 使用 [`shelljs`](https://github.com/shelljs/shelljs) 代替, 具体删除命令见 [`scripts/clean.js`](scripts/clean.ts)

`rimraf` 是一个用于删除文件和文件夹的 npm 包，它类似于 Unix 中的 `rm -rf` 命令。

通过这个包我们可以在打包前自动删除 dist

```js
"build": "rimraf dist && rollup -c ..."
```

或者配置快捷删除 `node_modules` 命令

```js
"clean": "rimraf node_modules"
```

### [**Vue Macros**](https://vue-macros.dev/zh-CN/)

更多的 vue 编译宏, 项目 vue 版本为 3.2.47, 所以很需要这个包

使用这个插件后, `unplugin-vue/rollup` 和 `@vitejs/plugin-vue-jsx` 插件配置方法有所改变

```js
// rollup.config.js
import vue from 'unplugin-vue/rollup'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/rollup'

export default defineConfig(
  // ...
  {
    plugins: [
      VueMacros({
        plugins: {
          vue: vue(),
          vueJsx: vueJsx()
        }
      })
    ]
  }
  // ...
)
```

## 🔧 关于 ts

**tsconfig.json 关键配置**

- `verbatimModuleSyntax`: 导入类型不使用 **import type** 时报错

- `jsx`: 设置为 `preserve` 保留 jsx 语法, 后面通过 `vueJsx` 插件编译

- `jsxImportSource`: 低版本 `vue` 隐式注册全局 JSX 命名空间, 所以不需要配置, [高版本(>=3.4)需要配置有以下内容](https://cn.vuejs.org/guide/extras/render-function.html#jsx-type-inference)

```json
"compilerOptions": {
  "jsx": "preserve",
  "jsxImportSource": "vue"
  // ...
}
```

## 🚀 关于发布

**发布内容**

- `dist/yy-ui`

**发布命令**

⚠️ 后续需要优化发布的版本信息

```bash
node scripts/publish.mjs [-v <string>]
```

**发布流程**

1. 执行`pnpm i --frozen-lockfile`
   该命令强制基于现有 lockfile 安装依赖（不更新 lockfile），用于确保依赖树绝对一致
2. 执行`pnpm build`
3. 修改 `package.json` 的版本号, 输入命令可指定版本号, 不输入版本号默认+1
4. cd `dist/yy-ui`
5. 执行`npm publish`

## ✍️ 随手记

在 `nodejs` 中, `__dirname` 是一个全局变量, 表示当前执行脚本所在的**目录**

如果使用 es module

```js
// es module
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
```

---

在使用 tsx `defineComponent` 的 render 时, 模板引用不使用 `useTemplateRefs` 时, 需要将 ref 变量在 setup 函数中 **return** 出去

> 应该是因为 `defineComponent` 的 render 函数中无法访问到 setup 函数中的变量, 只有 return 出去才能访问 ref 并赋值

> 顺手一题: 模板中的 ref 原理是在渲染的某个阶段将对应的 dom 或者组件实例赋值给 ref 变量, 所以在 setup 函数中**无法访问**到模板中的 ref 变量, 只有 return 出去才能访问

---

**登录到 npm**

```bash
npm login
```

> 注意不要使用镜像源
>
> ```bash
> npm config set registry https://registry.npmjs.org/
> ```
>
> 换源后再登录

**检查发布内容**

```bash
npm pack --dry-run
```

**发布**

```bash
npm publish
```

**撤回发布**

npm 只允许撤回 **72 小时**内发布的包

```bash
npm unpublish <package-name> --force
```

`--force` 参数表示强制模式

---

## ❓ Q&A

**Q: rollup 为什么构建开发环境产物和生成环境产物要用两套方案?**

开发环境使用 `esbuild` 构建, `esbuild`, go 编写, 优点就是快, 但是在产物构建方面不如 `rollup` 全面

生成环境使用 `rollup` 构建, `rollup`, nodejs 编写, 生态比较完整

**Q: 为什么需要 rolldown**

rust 编写, 统一了 `rollup` 和 `esbuild` 可能存在的差异, 集成两者的优点, `vite` 底层会重构为 `rolldown` 编译和打包

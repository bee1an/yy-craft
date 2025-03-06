# 📒 笔记

更多笔记[请查看](https://github.com/bee1an/yak-note)

## 📦 关于打包

##### 1. 多入口配置

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

##### 2. 保留指定文件

- [`rollup-plugin-copy`](https://github.com/vladshcherbin/rollup-plugin-copy)

  - 将 `packages/yy-ui/package.json` 复制到 `dist/yy-ui/package.json`
  - 将 `README.md` 复制到 `dist/yy-ui/README.md`

##### 3. dts 生成

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

## ⚡ 优化

### [~~**rimraf**~~](https://github.com/isaacs/rimraf)

⚠️ 本项目废弃改方案, 使用 [`shelljs`](https://github.com/shelljs/shelljs) 代替, 具体删除命令见 [`scripts/clean.ts`](scripts/clean.ts)

### [**Vue Macros**](https://vue-macros.dev/zh-CN/)

更多的 vue 编译宏, 项目 vue 版本为 3.2.47, 所以很需要这个包

使用这个插件后, `unplugin-vue/rollup` 和 `@vitejs/plugin-vue-jsx` 插件配置方法[有所改变](https://vue-macros.dev/zh-CN/guide/bundler-integration.html)

## 🚀 关于发布

**发布流程**

1. 执行`pnpm i --frozen-lockfile`
   该命令强制基于现有 lockfile 安装依赖（不更新 lockfile），用于确保依赖树绝对一致
2. 执行`pnpm build`
3. 修改 `package.json` 的版本号, 自动读取 dist/yy-ui/es/version.json 中的版本号
4. cd `dist/yy-ui`
5. 执行`npm publish`

import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import vue from 'unplugin-vue/rollup'
import vueJsx from '@vitejs/plugin-vue-jsx'
import resolve from '@rollup/plugin-node-resolve'
import { visualizer } from 'rollup-plugin-visualizer'
import copy from 'rollup-plugin-copy'
import path from 'path'
import { fileURLToPath } from 'url'
import VueMacros from 'unplugin-vue-macros/rollup'
// import dts from 'vite-plugin-dts'
import fs from 'node:fs'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const pkgDir = path.resolve(rootDir, 'packages')
const uiDir = path.resolve(pkgDir, 'yy-ui')

const inputs = Object.fromEntries(
  fs
    .readdirSync(uiDir)
    .filter((file) => file.endsWith('.ts'))
    .map((file) => [
      file.substring(0, file.lastIndexOf('.')),
      path.resolve(uiDir, file)
    ])
)

export default defineConfig([
  {
    input: inputs,
    output: [
      {
        format: 'es',
        dir: 'dist/yy-ui/es',
        preserveModules: true,
        preserveModulesRoot: path.resolve('packages')
      },
      {
        format: 'cjs',
        dir: 'dist/yy-ui/lib',
        preserveModules: true,
        preserveModulesRoot: path.resolve('packages'),
        exports: 'named'
      }
    ],
    external: ['vue', '@css-render/plugin-bem', 'css-render'],
    plugins: [
      VueMacros({
        plugins: {
          vue: vue(),
          vueJsx: vueJsx()
        }
      }),
      esbuild(),
      resolve({ extensions: ['.ts'] }),
      copy({
        targets: [
          { src: 'packages/yy-ui/package.json', dest: 'dist/yy-ui' },
          { src: 'README.md', dest: 'dist/yy-ui' }
        ]
      }),
      // dts({ entryRoot: 'packages/yy-ui/index.ts' }),
      visualizer() // 打包分析, 置于最后
    ]
  }
  // {
  //   input: inputs,
  //   output: {
  //     dir: 'dist/yy-ui/es'
  //     // preserveModules: true,
  //     // preserveModulesRoot: path.resolve('packages')
  //   },
  //   plugins: [dts({})]
  // }
])

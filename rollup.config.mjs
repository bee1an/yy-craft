import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import vue from 'rollup-plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import resolve from '@rollup/plugin-node-resolve'
import { visualizer } from 'rollup-plugin-visualizer'
import copy from 'rollup-plugin-copy'
import path from 'path'
import { fileURLToPath } from 'url'
// import dts from 'rollup-plugin-dts'
import fs from 'node:fs'
// import babel from '@rollup/plugin-babel'

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
    output: {
      format: 'es',
      dir: 'dist/yy-ui',
      preserveModules: true,
      preserveModulesRoot: path.resolve('packages')
    },
    external: [
      'vue',
      '@css-render/plugin-bem',
      'css-render',
      /@babel\/runtime/
    ],
    plugins: [
      vue(),
      vueJsx(),
      esbuild(),
      resolve({ extensions: ['.ts'] }),
      copy({
        targets: [
          { src: 'packages/yy-ui/package.json', dest: 'dist/yy-ui' },
          { src: 'README.md', dest: 'dist/yy-ui' }
        ]
      }),
      // babel({
      //   exclude: 'node_modules/**',
      //   extensions: ['.tsx'],
      //   presets: ['@vue/babel-preset-jsx'],
      //   plugins: ['@babel/plugin-transform-runtime'],
      //   babelHelpers: 'runtime'
      // }),
      visualizer() // 打包分析, 置于最后
    ]
  }
  // {
  //   input: 'packages/yy-ui/index.ts',
  //   output: {
  //     file: 'dist/yy-ui/index.d.ts',
  //     format: 'es'
  //   },
  //   plugins: [dts()]
  // }
])

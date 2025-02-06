// @ts-check
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias'
import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import path from 'node:path'

export default defineConfig({
  input: 'packages/components/button/index.ts',
  output: {
    format: 'esm',
    dir: 'dist',
    sourcemap: false
  },
  jsx: 'preserve',
  plugins: [
    vue({ target: 'browser' }),
    resolve(),
    typescript()
    // alias({
    //   entries: [{ find: '@yy-ui', replacement: './packages/' }]
    // })
  ]
})

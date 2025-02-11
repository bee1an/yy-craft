import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import resolve from '@rollup/plugin-node-resolve'

export default defineConfig({
  input: 'packages/components/checkbox/index.ts', // TODO: 测试打包依赖
  output: {
    format: 'esm',
    dir: 'dist',
    sourcemap: false
  },
  external: ['vue'],
  // jsx: 'preserve',
  plugins: [vue(), vueJsx(), esbuild(), resolve({ extensions: ['.ts'] })],
  onwarn(a) {
    console.log('123', a)
  }
})

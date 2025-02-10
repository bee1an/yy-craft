import { defineConfig } from 'rollup'
import typescript from 'rollup-plugin-esbuild'
import vue from '@vitejs/plugin-vue'
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
  // treeshake: true,
  plugins: [vue(), typescript(), resolve({ extensions: ['.ts'] })]
})

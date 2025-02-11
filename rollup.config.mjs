import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import resolve from '@rollup/plugin-node-resolve'
// import { dts } from 'rollup-plugin-dts'

export default defineConfig([
  {
    input: 'packages/yy-ui/index.ts', // TODO: 测试打包依赖
    output: {
      format: 'esm',
      // dir: 'dist',
      sourcemap: false,
      file: 'dist/index.js'
    },
    external: ['vue'],
    // jsx: 'preserve',
    plugins: [vue(), vueJsx(), esbuild(), resolve({ extensions: ['.ts'] })]
  }
  // {
  //   input: 'packages/yy-ui/index.ts',
  //   output: [{ file: 'dist/types.d.ts', format: 'esm' }],
  //   plugins: [dts()]
  // }
])

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import DefineOptions from 'unplugin-vue-define-options/vite'
import { fileURLToPath, URL } from 'node:url'

const pathSrc = fileURLToPath(new URL('../packages/yy-ui', import.meta.url))

console.log('pathSrc', pathSrc)

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@yy-ui/yy-ui': pathSrc
    }
  }
})

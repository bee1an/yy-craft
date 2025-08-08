import type { PluginOption } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import VueMacros from 'vue-macros/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
        vueJsx: VueJsx(),
      },
    }) as PluginOption,
    UnoCSS(),
  ],
  resolve: {
    alias: {
      'yy-craft': path.resolve(__dirname, '../packages/yy-craft/index.ts'),
    },
  },
})

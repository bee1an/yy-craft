// vite.config.ts
import { defineConfig, type PluginOption } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueMacros from 'vue-macros/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
// import VueRouter from 'unplugin-vue-router/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	plugins: [
		VueMacros({
			plugins: {
				vue: Vue(),
				vueJsx: VueJsx()
			}
		}) as PluginOption
	],
	resolve: {
		alias: {
			'@yyui/yy-ui': path.resolve(__dirname, '../packages/yy-ui/index.ts')
		}
	}
})

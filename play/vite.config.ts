import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
// vite.config.ts
import { type PluginOption, defineConfig } from 'vite'
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

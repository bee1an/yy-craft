import { defineConfig } from 'vitest/config'
import VueMacros from 'unplugin-vue-macros/vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
	plugins: [
		VueMacros({
			plugins: {
				vue: vue(),
				vueJsx: VueJsx()
			}
		})
	],
	test: {
		environment: 'jsdom'
	}
})

import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import { defineConfig } from 'vitest/config'

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

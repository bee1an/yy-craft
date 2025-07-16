import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vitest/config'
import VueMacros from 'vue-macros/vite'

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

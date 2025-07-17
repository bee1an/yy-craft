import path from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
// import DefineOptions from 'unplugin-vue-define-options/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		// vue(), // vitepress 默认使用了vue
		// DefineOptions()
		vueJsx()
	],
	resolve: {
		alias: {
			'yy-craft': path.resolve(__dirname, '../packages/yy-craft/index.ts')
		}
	}
})

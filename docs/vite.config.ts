import { defineConfig } from 'vite'
import path from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'
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
			'@yyui/yy-ui': path.resolve(__dirname, '../packages/yy-ui/index.ts')
		}
	}
})

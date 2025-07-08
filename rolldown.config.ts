import { defineConfig } from 'rolldown'
import vue from 'unplugin-vue/rolldown'
import vueJsx from 'unplugin-vue-jsx/rolldown'
import copy from 'rollup-plugin-copy'
import path from 'path'
import { fileURLToPath } from 'url'
import VueMacros from 'vue-macros/rolldown'
import dts from 'vite-plugin-dts'
import fs from 'node:fs'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const pkgDir = path.resolve(rootDir, 'packages')
const uiDir = path.resolve(pkgDir, 'yy-ui')

const inputs = Object.fromEntries(
	fs
		.readdirSync(uiDir)
		.filter((file) => file.endsWith('.ts'))
		.map((file) => [file.substring(0, file.lastIndexOf('.')), path.resolve(uiDir, file)])
)

const plugins = [
	// TODO 不知道为什么会出现这个提示
	// (unplugin-vue-short-bind plugin) Cannot find Vue plugin (@vitejs/plugin-vue or unplugin-vue). Please make sure to add it before using Vue Macros.
	VueMacros({
		plugins: {
			vue: vue(),
			vueJsx: vueJsx()
		}
	}),
	copy({
		targets: [
			{ src: 'packages/yy-ui/package.json', dest: 'dist/yy-ui' },
			{ src: 'README.md', dest: 'dist/yy-ui' }
		]
	}),
	dts({
		outDir: ['dist/yy-ui/es', 'dist/yy-ui/lib', 'dist/types'],
		include: ['packages'],
		compilerOptions: {
			sourceMap: false,
			paths: {
				'@yy-ui/*': ['packages/*'],
				csstype: ['node_modules/csstype']
			}
		},
		insertTypesEntry: true
	})
]

if (process.env.NODE_ENV === 'development') {
	// TODO 打包分析
}

export default defineConfig([
	{
		input: inputs,
		output: [
			{
				format: 'es',
				dir: 'dist/yy-ui/es',
				preserveModules: true,
				preserveModulesRoot: path.resolve('packages')
			},
			{
				format: 'cjs',
				dir: 'dist/yy-ui/lib',
				preserveModules: true,
				preserveModulesRoot: path.resolve('packages'),
				exports: 'named'
			}
		],
		treeshake: false,
		external: ['vue', '@css-render/plugin-bem', 'css-render'],
		plugins
	}
])

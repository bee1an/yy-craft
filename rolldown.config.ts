import fs from 'node:fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'rolldown'
import copy from 'rollup-plugin-copy'
import vueJsx from 'unplugin-vue-jsx/rolldown'
import vue from 'unplugin-vue/rolldown'
import dts from 'vite-plugin-dts'
import VueMacros from 'vue-macros/rolldown'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const pkgDir = path.resolve(rootDir, 'packages')
const uiDir = path.resolve(pkgDir, 'yy-craft')

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
			{ src: 'packages/yy-craft/package.json', dest: 'dist/yy-craft' },
			{ src: 'README.md', dest: 'dist/yy-craft' }
		]
	}),
	dts({
		outDir: ['dist/yy-craft/es', 'dist/yy-craft/lib', 'dist/types'],
		include: ['packages'],
		compilerOptions: {
			sourceMap: false,
			paths: {
				'@yy-craft/*': ['packages/*'],
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
				dir: 'dist/yy-craft/es',
				preserveModules: true,
				preserveModulesRoot: path.resolve('packages')
			},
			{
				format: 'cjs',
				dir: 'dist/yy-craft/lib',
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

import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import vue from 'unplugin-vue/rollup'
import vueJsx from '@vitejs/plugin-vue-jsx'
import resolve from '@rollup/plugin-node-resolve'
import { visualizer } from 'rollup-plugin-visualizer'
import copy from 'rollup-plugin-copy'
import path from 'path'
import { fileURLToPath } from 'url'
import VueMacros from 'unplugin-vue-macros/rollup'
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
	VueMacros({
		plugins: {
			vue: vue(),
			vueJsx: vueJsx()
		}
	}),
	esbuild({
		treeShaking: false,
		minify: process.env.NODE_ENV === 'production'
	}),
	resolve({ extensions: ['.ts'] }),
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
	plugins.push(
		visualizer({
			filename: './internal/stats.html',
			open: true
		}) // 打包分析, 置于最后
	)
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

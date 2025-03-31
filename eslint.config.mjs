import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts,vue}'] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs['flat/essential'],
	...vueTsEslintConfig(),
	{
		files: ['**/*.vue'],
		languageOptions: { parserOptions: { parser: tseslint.parser } }
	},
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 0,
			'@typescript-eslint/no-unused-expressions': 0,
			'no-debugger': 0,
			'@typescript-eslint/no-unused-vars': 1,
			'@typescript-eslint/no-unsafe-function-type': 0,
			'@typescript-eslint/no-empty-object-type': 0,
			'vue/multi-word-component-names': 0,
			'vue/no-reserved-component-names': 0
		}
	},
	{
		ignores: [
			'**/node_modules/**',
			'**/dist/**',
			'**/*.css',
			'**/*.jpg',
			'**/*.jpeg',
			'**/*.png',
			'**/*.gif',
			'**/*.d.ts'
		]
	}
]

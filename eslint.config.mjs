import pluginJs from '@eslint/js'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

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
		plugins: {
      perfectionist,
    },
		rules: {
			'@typescript-eslint/no-explicit-any': 0,
			'@typescript-eslint/no-unused-expressions': 0,
			'no-debugger': 0,
			'@typescript-eslint/no-unused-vars': 1,
			'@typescript-eslint/no-unsafe-function-type': 0,
			'@typescript-eslint/no-empty-object-type': 0,
			'vue/multi-word-component-names': 0,
			'vue/no-reserved-component-names': 0,
			"perfectionist/sort-imports": ["error", {
				groups: [
					"type",
					[
						"parent-type",
						"sibling-type",
						"index-type",
						"internal-type"
					],
					"builtin",
					"external",
					"internal",
					[
						"parent",
						"sibling",
						"index"
					],
					"side-effect",
					"object",
					"unknown"
				],
				newlinesBetween: "ignore",
				order: "asc",
				type: "natural"
			}],
		}
	},
	{
		ignores: [
			'**/node_modules/**',
			'**/.vitepress/cache/**',
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

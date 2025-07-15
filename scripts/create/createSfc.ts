import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { capitalize } from 'vue'
import { getEntryContent } from './common'
import { cmpDir } from '../utils/paths'
import { camelcase, kebabCase } from '../utils/tools'

export const createSfc = (
	name: string,
	option?: {
		withStyle?: boolean
		withTheme?: boolean
	}
) => {
	const withTheme = option?.withTheme ?? false
	const withStyle = withTheme ? true : (option?.withStyle ?? false)

	const cmpPath = resolve(cmpDir, name)
	mkdirSync(cmpPath)

	// step 1 create entry file
	writeFileSync(join(cmpPath, 'index.ts'), getEntryContent(camelcase(name)))

	// step 2 create src and sfc
	const srcPath = join(cmpPath, 'src')
	mkdirSync(srcPath)
	writeFileSync(join(srcPath, `${name}.vue`), getContent(camelcase(name), withStyle, withTheme))

	// step 3 create config file
	writeFileSync(join(srcPath, `${name}.ts`), getConfigContent(camelcase(name), withTheme))
}

function getContent(name: string, withStyle: boolean, withTheme: boolean) {
	const propsVariable = `${name}Props`

	function imports() {
		let str = ''
		if (!withStyle && !withTheme) {
			return str
		}

		let importsVariable = ''

		if (withStyle) {
			importsVariable += `${name}Style`
		}

		if (withTheme) {
			importsVariable += `, ${name}Dark, ${name}Light`
			str += 'import { computed } from "vue"\n'
		}

		str += `import { useTheme } from '@yy-ui/composables/use-theme'
import { CreateNamespace } from '@yy-ui/utils/src/create'
import { ${importsVariable} } from '@yy-ui/theme-chalk/src/${kebabCase(name)}'\n`

		return str
	}

	function mountStyle() {
		if (!withStyle && !withTheme) {
			return ''
		}

		if (withTheme) {
			return `
const bem = new CreateNamespace('${name}')

const lightVars = ${name}Light.vars()
const darkVars = ${name}Dark.vars()

const theme = computed(() => {
	return {
		light: Object.assign({}, lightVars, {}),
		dark: Object.assign({}, darkVars, {})
	}
})

const { styleVars } = useTheme(theme, '${name}', ${name}Style, props, ${name}Light.exclude)`
		}

		return `
const bem = new CreateNamespace('${name}')
useTheme('${name}', ${name}Style)`
	}

	return `<script setup lang="ts">
import { ${propsVariable} } from './${kebabCase(name)}'
${imports()}
defineOptions({ name: '${capitalize(name)}' })

const props = defineProps(${propsVariable})${mountStyle()}
</script>

<template><div${withTheme ? ' :style="styleVars"' : ''}${withStyle ? ' :class="bem.b().value"' : ''}></div></template>`
}

function getConfigContent(name: string, withTheme: boolean) {
	return `import type { ExtractPropTypes } from 'vue'
${
	withTheme
		? `import { useThemeProps } from '@yy-ui/composables/use-theme'
import { type ${capitalize(name)}ThemeVars } from '@yy-ui/theme-chalk/src/${kebabCase(name)}'
`
		: ''
}
export const ${name}Props = ${
		withTheme
			? `{
	...useThemeProps<${capitalize(name)}ThemeVars>()
}`
			: '{}'
	}

export type ${capitalize(name)}Props = ExtractPropTypes<typeof ${name}Props>
`
}

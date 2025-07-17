import { mkdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { themeDir } from '../utils/paths'
import { camelcase, capitalize } from '../utils/tools'

const targetDir = resolve(themeDir, 'src')

export const createStyle = (name: string, withTheme: boolean) => {
	const stylePath = resolve(targetDir, name)

	mkdirSync(stylePath)

	// step 1 create entry file
	writeFileSync(join(stylePath, 'index.ts'), getEntryContent(withTheme))

	// step 2 create cssr file
	writeFileSync(join(stylePath, 'cssr.ts'), createCssrContent(camelcase(name)))

	// step 3 if withTheme create dark and light
	if (withTheme) {
		writeFileSync(join(stylePath, '_common.ts'), `export default {}\n`)
		writeFileSync(join(stylePath, 'dark.ts'), getDarkContent(camelcase(name)))
		writeFileSync(join(stylePath, 'light.ts'), getLightContent(camelcase(name)))
		writeFileSync(join(stylePath, '_common.ts'), `export default {}\n`)
	}
}

function getEntryContent(withTheme: boolean) {
	if (withTheme) {
		return `export * from './cssr'
export * from './dark'
export * from './light'
`
	}

	return `export * from './cssr'\n`
}

function createCssrContent(name: string) {
	return `import { cB } from '@yy-craft/utils'
  
export const ${name}Style = cB('${name}', [])
`
}

function getDarkContent(name: string) {
	return `import { type ThemeConfig } from '../common'
import _common from './_common'
  
export const ${name}Dark = {
	name: '${name}',
	vars: () => ({
		..._common,
	})
} satisfies ThemeConfig`
}

function getLightContent(name: string) {
	return `import { type ExtractThemeVars, type ThemeConfig } from '../common'
import _common from './_common'

const vars = {
  ..._common
}

export const ${name}Light: ThemeConfig<typeof vars> = {
  name: '${name}',
  vars: () => ({ ...vars }),
  exclude: Object.keys({})
}

export type ${capitalize(name)}ThemeVars = ExtractThemeVars<typeof ${name}Light>
`
}

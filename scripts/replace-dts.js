/**
 * @deprecated
 */

// import shelljs from 'shelljs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
// import glob from 'fast-glob'
import fs from 'node:fs'
import pkg from 'fs-extra'

const { removeSync } = pkg

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const typesDir = path.resolve(__dirname, '../dist/types')
const uiEsDir = path.resolve(__dirname, '../dist/yy-ui/es')
const uiLibDir = path.resolve(__dirname, '../dist/yy-ui/lib')

fs.readdirSync(typesDir)
	.filter((file) => file.endsWith('.d.ts'))
	.forEach((file) => {
		const content = fs
			.readFileSync(path.join(typesDir, 'yy-ui', file), 'utf8')
			.replaceAll('../', './')

		fs.writeFileSync(path.join(typesDir, file), content, 'utf8')
		fs.writeFileSync(path.join(uiEsDir, file), content, 'utf8')
		fs.writeFileSync(path.join(uiLibDir, file), content, 'utf8')
	})

removeSync(path.join(typesDir, 'yy-ui'))
removeSync(path.join(uiEsDir, 'yy-ui'))
removeSync(path.join(uiLibDir, 'yy-ui'))

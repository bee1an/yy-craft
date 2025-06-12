import path from 'node:path'
import fs from 'node:fs'
import pkg from 'fs-extra'
import { dTypesDir, dUiEsDir, dUiLibDir } from './utils/paths'

const { removeSync } = pkg

const dirs = [dTypesDir, dUiEsDir, dUiLibDir]

fs.readdirSync(dTypesDir).forEach((file) => {
	if (!file.endsWith('.d.ts')) return

	const content = fs
		.readFileSync(path.join(dTypesDir, 'yy-ui', file), 'utf8')
		.replaceAll(/\.\.\/(.*)'/g, "./$1/index'")

	// 重写 dts 入口文件
	rewriteFile(dirs, file, content)
})

dirs.forEach((dir) => removeSync(path.join(dir, 'yy-ui')))

function rewriteFile(dirs: string[], file: string, content: string) {
	dirs.forEach((dir) => {
		fs.writeFileSync(path.join(dir, file), content, 'utf8')
	})
}

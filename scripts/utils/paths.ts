import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const rootDir = path.resolve(__dirname, '..', '..')

export const pkgsDir = path.resolve(rootDir, 'packages')

export const cmpDir = path.resolve(pkgsDir, 'components')

export const themeDir = path.resolve(pkgsDir, 'theme-chalk')

export const dTypesDir = path.resolve(rootDir, './dist/types')

export const dUiEsDir = path.resolve(rootDir, './dist/yy-craft/es')

export const dUiLibDir = path.resolve(rootDir, './dist/yy-craft/lib')

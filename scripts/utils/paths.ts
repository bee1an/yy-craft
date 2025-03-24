import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const rootDir = path.resolve(__dirname, '..', '..')

export const pkgsDir = path.resolve(rootDir, 'packages')

export const dTypesDir = path.resolve(rootDir, './dist/types')

export const dUiEsDir = path.resolve(rootDir, './dist/yy-ui/es')

export const dUiLibDir = path.resolve(rootDir, './dist/yy-ui/lib')

import shelljs from 'shelljs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import glob from 'fast-glob'

const __dirname = path.resolve(fileURLToPath(import.meta.url))

const buildOutput = path.resolve(__dirname, '../../dist')

export const generateTypesDefinitions = async () => {
  shelljs.exec(
    'npx vue-tsc -p tsconfig.json --declaration --emitDeclarationOnly --declarationDir dist/types'
  )
  const typesDir = path.join(buildOutput, 'types', 'packages')

  const filePaths = await glob(`**/*.d.ts`, {
    cwd: typesDir,
    absolute: true
  })

  console.log('filePaths', filePaths)
}
generateTypesDefinitions()

import shelljs from 'shelljs'
import { program } from 'commander'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

program
  .option('-d, --dist', 'delete dist directory')
  .option('-n, --node_modules', 'delete node_modules directory')

program.parse()

function removeDist() {
  shelljs.rm('-rf', 'dist')
}

function removeNodeModules() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  shelljs.rm('-rf', 'node_modules')
  shelljs.rm('-rf', 'play/node_modules')
  const targetFile = path.resolve(__dirname, '../packages/')

  fs.readdirSync(targetFile).forEach((file) => {
    shelljs.rm('-rf', path.resolve(targetFile, file, 'node_modules'))
  })
}

const { dist, node_modules } = program.opts()

dist && removeDist()

node_modules && removeNodeModules()

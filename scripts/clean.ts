import shelljs from 'shelljs'
import { program } from 'commander'
import path from 'node:path'
import fs from 'node:fs'
import { pkgsDir } from './utils/paths'

program
  .option('-d, --dist', 'delete dist directory')
  .option('-n, --node_modules', 'delete node_modules directory')

program.parse()

function removeDist() {
  shelljs.rm('-rf', 'dist')
}

function removeNodeModules() {
  shelljs.rm('-rf', 'play/node_modules')

  fs.readdirSync(pkgsDir).forEach((file) => {
    shelljs.rm('-rf', path.resolve(pkgsDir, file, 'node_modules'))
  })
}

const { dist, node_modules } = program.opts()

dist && removeDist()

node_modules && removeNodeModules()

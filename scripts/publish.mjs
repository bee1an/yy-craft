// TODO
import shelljs from 'shelljs' // 命令执行器
import { program } from 'commander' // 命令行参数解析器
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.resolve(fileURLToPath(import.meta.url))

const targetFile = path.dirname(__dirname, '../dist/yy-ui/package.json')

console.log('targetFile', __dirname)

// 升级版本号
// const pkg = await import('../dist/yy-ui/version.js')
// const currentVersion = pkg.default
// const versionArr = pkg.default.split('.')
// versionArr.push(parseInt(versionArr.pop()) + 1) // 版本号加1
// let newVersion = versionArr.join('.')

// program.option(
//   '-v, --version <string>',
//   'Add release version number',
//   newVersion
// ) // 输入命令时可以指定版本号

// program.parse()

// newVersion = program.opts().version

function publish() {
  shelljs.exec('pnpm i --frozen-lockfile') // 该命令强制基于现有 lockfile 安装依赖（不更新 lockfile），用于确保依赖树绝对一致
  shelljs.exec('pnpm build')

  // shelljs.sed(
  //   '-i',
  //   `"version": "${currentVersion}"`,
  //   `"version": "${newVersion}"`,
  //   targetFile
  // ) // 替换版本号

  shelljs.cd('dist/yy-ui')
  shelljs.exec(`npm publish --tag bata`)
}

publish()

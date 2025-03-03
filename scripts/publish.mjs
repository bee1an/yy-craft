/**
 * @deprecated
 */

import shelljs from 'shelljs' // 命令执行器
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 升级版本号
// const currentVersion = version
// const versionArr = currentVersion.split('.')
// versionArr.push(parseInt(versionArr.pop()) + 1) // 版本号加1
// let newVersion = versionArr.join('.')

async function publish() {
  shelljs.exec('pnpm i --frozen-lockfile') // 该命令强制基于现有 lockfile 安装依赖（不更新 lockfile），用于确保依赖树绝对一致
  shelljs.exec('pnpm build')

  const { default: version } = await import('../dist/yy-ui/es/version.js')

  const pkgFile = path.resolve(__dirname, '../dist/yy-ui/package.json')

  shelljs.sed(
    '-i',
    /"version"\s*:\s*"([^"]*)"/,
    `"version": "${version}"`,
    pkgFile
  ) // 替换版本号

  console.log('version', version)

  // shelljs.cd('dist/yy-ui')
  // shelljs.exec(`npm publish --tag bata`)
}

publish()

import shelljs from 'shelljs' // 命令执行器
import path from 'node:path'
import { rootDir } from './utils/paths'

// 升级版本号
// const currentVersion = version
// const versionArr = currentVersion.split('.')
// versionArr.push(parseInt(versionArr.pop()) + 1) // 版本号加1
// let newVersion = versionArr.join('.')

async function publish() {
  shelljs.exec('pnpm i --frozen-lockfile') // 该命令强制基于现有 lockfile 安装依赖（不更新 lockfile），用于确保依赖树绝对一致
  shelljs.exec('pnpm build')

  // @ts-expect-error 打包后会有这个路径
  const { default: version } = await import('../dist/yy-ui/es/version.js')

  const pkgFile = path.resolve(rootDir, './dist/yy-ui/package.json')

  shelljs.sed(
    '-i',
    /"version"\s*:\s*"([^"]*)"/,
    `"version": "${version}"`,
    pkgFile
  ) // 替换版本号

  shelljs.cd('dist/yy-ui')
  shelljs.exec(`npm publish --tag bata`)
}

publish()

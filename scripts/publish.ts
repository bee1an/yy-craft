import path from 'node:path'
import prompts from 'prompts'
import shelljs from 'shelljs' // 命令执行器
import { rootDir } from './utils/paths'

async function publish() {
	shelljs.exec('pnpm i --frozen-lockfile') // 该命令强制基于现有 lockfile 安装依赖（不更新 lockfile），用于确保依赖树绝对一致
	shelljs.exec('pnpm build')

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { default: version } = await import('../dist/yy-ui/es/version.js')

	const pkgFile = path.resolve(rootDir, './dist/yy-ui/package.json')

	shelljs.sed('-i', /"version"\s*:\s*"([^"]*)"/, `"version": "${version}"`, pkgFile) // 替换版本号

	shelljs.cd('dist/yy-ui')

	const { otp } = await prompts({
		type: 'text',
		name: 'otp',
		message: 'please input your one-time password'
	})

	shelljs.exec(`npm publish --otp ${otp}`)
}

publish()

import { appendFileSync } from 'node:fs'
import path from 'node:path'
import prompts from 'prompts'
import { cmpDir, themeDir } from '../utils/paths'
import { createSfc } from './createSfc'
import { createStyle } from './createStyle'
import { createTsx } from './createTsx'

function exitWhenNullable(value: any) {
  if (typeof value === 'undefined') {
    // eslint-disable-next-line node/prefer-global/process
    process.exit(0)
  }
}

(async () => {
  // 注册组件名字
  const { name } = await prompts({
    type: 'text',
    name: 'name',
    message: 'component name',
  })

  if (!name) {
    console.log('component name is required')
    return
  }

  const { useSfc } = await prompts({
    type: 'confirm',
    name: 'useSfc',
    message: 'use sfc? if not will create tsx',
    initial: true,
  })
  exitWhenNullable(useSfc)

  const { withStyle } = await prompts({
    type: 'confirm',
    name: 'withStyle',
    message: 'with style?',
    initial: true,
  })
  exitWhenNullable(withStyle)

  const { withTheme } = await prompts({
    type: 'confirm',
    name: 'withTheme',
    message: 'with theme?',
    initial: true,
  })
  exitWhenNullable(withTheme)

  useSfc
    ? createSfc(name, { withStyle, withTheme })
    : createTsx(name, { withStyle, withTheme })

  appendFileSync(
    path.resolve(cmpDir, 'index.ts'),
    `export * from './${name}'\n`,
  )

  if (withTheme || withStyle) {
    createStyle(name, withTheme)
    appendFileSync(
      path.resolve(themeDir, 'index.ts'),
      `export * from './src/${name}'\n`,
    )
  }
})()

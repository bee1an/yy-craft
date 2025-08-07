import type { ExtractThemeVars, ThemeConfig } from '../common'
import _common from './_common'

const vars = {
  ..._common,
}

export const uploadLight: ThemeConfig<typeof vars> = {
  name: 'upload',
  vars: () => ({ ...vars }),
  exclude: Object.keys({}),
}

export type UploadThemeVars = ExtractThemeVars<typeof uploadLight>

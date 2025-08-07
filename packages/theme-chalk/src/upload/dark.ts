import type { ThemeConfig } from '../common'
import _common from './_common'

export const uploadDark = {
  name: 'upload',
  vars: () => ({
    ..._common,
  }),
} satisfies ThemeConfig

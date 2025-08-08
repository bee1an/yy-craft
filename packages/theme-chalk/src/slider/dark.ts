import type { ThemeConfig } from '../common'
import { commonDark } from '../common'
import _common from './_common'

export const sliderDark = {
  name: 'slider',
  vars: () => ({
    ..._common,
    bgColor: commonDark.bgColor5,
    barBgColor: commonDark.primaryColor,
    triggerBgColor: commonDark.bgColor4,
    triggerBoxShadow: commonDark.boxShadow4,
  }),
} satisfies ThemeConfig

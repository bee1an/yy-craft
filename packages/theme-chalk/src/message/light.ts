import { ExtractThemeVars, ThemeConfig } from '../common'

export const messageLight: ThemeConfig = {
  name: 'message',
  vars: () => ({})
}

export type MessageThemeVars = ExtractThemeVars<typeof messageLight>

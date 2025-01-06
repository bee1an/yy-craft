import { commonLight, ExtractThemeVars } from '../common'

export const cardLight = {
  name: 'card',
  vars: () => ({
    borderColor: commonLight.borderColor,
    cardPadding: '20px 14px'
  })
}

export type CardThemeVars = ExtractThemeVars<typeof cardLight>

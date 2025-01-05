import { commonLight, ThemeType } from '../common'

export const cardLight = {
  name: 'card',
  vars: () => ({
    borderColor: commonLight.borderColor,
    cardPadding: '20px 14px'
  })
}

export type CardTheme = ThemeType<typeof cardLight>

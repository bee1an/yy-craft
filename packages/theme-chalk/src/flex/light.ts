import { ThemeType } from '../common'
import common from './_common'

export const flexLight = {
  name: 'flex',
  vars: {
    ...common
  }
}

export type FlexTheme = ThemeType<typeof flexLight>

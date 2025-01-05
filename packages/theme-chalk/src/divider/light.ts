import { commonLight, ThemeType } from '@yy-ui/theme-chalk'

export const dividerLight = {
  name: 'divider',
  vars: () => ({
    dividerBorderStyle: '',
    borderColor: commonLight.borderColor,
    fontSize: commonLight.fontSize
  })
}

export type DividerTheme = ThemeType<typeof dividerLight>

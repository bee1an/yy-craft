import { ThemeConfig } from '../common'

const vars = {}

export const dropdownDark: ThemeConfig<typeof vars> = {
  name: 'dropdown',
  vars: () => ({ ...vars })
}

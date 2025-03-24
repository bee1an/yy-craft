import { type ThemeConfig } from '../common'

const vars = {}

export const popoverDark: ThemeConfig<typeof vars> = {
	name: 'popover',
	vars: () => ({ ...vars })
}

export type ThemeKey = 'light' | 'dark'

export type ThemeVars<
  T extends Record<string, string> = Record<string, string>
> = T

export type ThemeConfig<T extends ThemeVars = ThemeVars> = {
  name: string
  vars: () => T
  exclude?: (keyof T)[]
}

export type ExtractThemeVars<T extends ThemeConfig<any>> = Partial<
  ReturnType<T['vars']>
>

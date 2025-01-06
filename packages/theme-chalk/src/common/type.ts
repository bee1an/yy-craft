export type ThemeKey = 'light' | 'dark'

export type ThemeVars<
  T extends Record<string, string> = Record<string, string>
> = T

export type ThemeConfig<T extends ThemeVars = ThemeVars> = {
  name: string
  vars: () => Record<keyof T & string, string>
  exclude?: (keyof T)[] | string[]
}

export type ExtractThemeVars<T extends ThemeConfig<any>> = Partial<
  ReturnType<T['vars']>
>

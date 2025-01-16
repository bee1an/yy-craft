import { CSSProperties } from 'vue'

export type ThemeKey = 'light' | 'dark'

type CssVariableName = keyof CSSProperties

export type ThemeVars = {
  [k in string]?: any
}

export type ThemeConfig<T extends ThemeVars = ThemeVars> = {
  name: string
  vars: () => {
    // 只限制css属性范围
    [k in keyof T]: k extends CssVariableName ? CSSProperties[k] : any
  }
  exclude?: (keyof T)[] | string[]
}

export type ExtractThemeVars<T extends ThemeConfig<any>> = Partial<
  ReturnType<T['vars']>
>

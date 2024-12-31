import { InjectionKey, Ref } from 'vue'

export type ThemeKey = 'light' | 'dark'

export const injectTheme = Symbol('InjectTheme') as InjectionKey<{
  theme: Ref<ThemeKey>
}>

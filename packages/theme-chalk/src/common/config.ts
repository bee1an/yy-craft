import type { InjectionKey, Ref } from 'vue'
import type { ThemeKey } from './type'

export const injectTheme = Symbol('InjectTheme') as InjectionKey<{
  theme: Ref<ThemeKey>
}>

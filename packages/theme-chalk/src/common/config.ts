import { InjectionKey, Ref } from 'vue'
import { ThemeKey } from './type'

export const injectTheme = Symbol('InjectTheme') as InjectionKey<{
  theme: Ref<ThemeKey>
}>

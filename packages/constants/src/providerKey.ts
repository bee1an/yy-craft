import type { ThemeKey } from '@yy-craft/theme-chalk'
import type { InjectionKey } from 'vue'

export const providerKey = Symbol('providerKey') as InjectionKey<{
  theme: ThemeKey | (string & {})
}>

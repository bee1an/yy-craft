import type { InjectionKey } from 'vue'

export const providerKey = Symbol('providerKey') as InjectionKey<{
	theme: 'light' | 'dark' | (string & {})
}>

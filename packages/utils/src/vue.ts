import { getCurrentScope, onScopeDispose } from 'vue'
import type { AnyFn } from './types'

export function tryOnScopeDispose(fn: AnyFn) {
	if (getCurrentScope()) {
		onScopeDispose(fn)
		return true
	}
	return false
}

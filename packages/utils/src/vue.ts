import type { AnyFn } from './types'
import { getCurrentScope, onScopeDispose } from 'vue'

export function tryOnScopeDispose(fn: AnyFn) {
	if (getCurrentScope()) {
		onScopeDispose(fn)
		return true
	}
	return false
}

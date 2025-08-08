import type { MaybeRef } from '@yy-craft/utils'
import { computed, unref } from 'vue'

export function useMaxMin(value: MaybeRef<number>, min: MaybeRef<number>, max: MaybeRef<number>) {
  return computed(() => Math.min(Math.max(unref(min), unref(value)), unref(max)))
}

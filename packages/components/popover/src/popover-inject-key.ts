import type { CreateNamespace } from '@yy-craft/utils/src/create'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export const popoverInjectKey = Symbol('PopoverInjectKey') as InjectionKey<{
  setTargetRef: (target: HTMLElement | null) => void
  bem: CreateNamespace
  styleVars: ComputedRef<Record<string, string>>
  triggerRef: Ref<HTMLElement | null>
  wrapper: ComputedRef<boolean>
}>

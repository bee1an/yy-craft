import { CreateNamespace } from '@yy-ui/utils/src/create'
import { ComputedRef, InjectionKey, Ref } from 'vue'

export const popoverInjectKey = Symbol('PopoverInjectKey') as InjectionKey<{
  setTargetRef: (target: HTMLElement | null) => void
  bem: CreateNamespace
  styleVars: ComputedRef<Record<string, string>>
  triggerRef: Ref<HTMLElement | null>
  wrapper: ComputedRef<boolean>
}>

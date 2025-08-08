import type { Ref, ShallowRef } from 'vue'

/** Void function */
export type Fn = () => void

/** Any function */
export type AnyFn = (...args: any[]) => any

/** 元素ref */
export type ElRef = Readonly<ShallowRef<HTMLElement | null>>

declare const SlotSymbol: unique symbol
export interface SlotsType<
  T extends Record<string, any> = Record<string, any>,
> {
  [SlotSymbol]?: T
}

export type MaybeRef<T> = T | Ref<T>

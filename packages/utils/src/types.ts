import type { ShallowRef } from 'vue'

/** Void function */
export type Fn = () => void

/** Any function */
export type AnyFn = (...args: any[]) => any

/** 元素ref */
export type ElRef = Readonly<ShallowRef<HTMLElement | null>>

declare const SlotSymbol: unique symbol
export type SlotsType<T extends Record<string, any> = Record<string, any>> = {
  [SlotSymbol]?: T
}

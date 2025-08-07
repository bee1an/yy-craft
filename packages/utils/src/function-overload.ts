import type { AnyFn } from './types'

type ConditionType = string | number | AnyFn

/** 函数重载 */
export class Overload {
  private _overloads = new Map<ConditionType, AnyFn>()

  add(fn: AnyFn, condition?: ConditionType) {
    // 最基础的重载条件为函数的参数个数
    condition = typeof condition === 'undefined' ? fn.length : condition

    this._overloads.set(condition, fn)
  }

  get(condition?: ConditionType) {
    const call = (...rest: any[]) => {
      this._overloads.forEach((fn, key) => {
        if (typeof condition === 'string' && condition === key) {
          fn(...rest)
        }
        else if (typeof key === 'number' && rest.length === key) {
          fn(...rest)
        }
        else if (typeof key === 'function' && key(...rest)) {
          fn(...rest)
        }
      })
    }

    return { call }
  }
}

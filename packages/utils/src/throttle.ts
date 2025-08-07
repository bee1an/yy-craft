import type { AnyFn } from './types'
import { debounce } from './debounce'
import { isObject } from './object'

/**
 * @function throttle
 * @description 创建一个节流函数，在 wait 秒内最多执行 func 一次的函数。 该函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。 可以提供一个 options 对象决定如何调用 func 方法， options.leading 与|或 options.trailing 决定 wait 前后如何触发。 func 会传入最后一次传入的参数给这个函数。 随后调用的函数返回是最后一次 func 调用的结果。
 * @param { Function } func 要防抖动的函数
 * @param { number } [wait] 需要延迟的毫秒数
 * @param {object} [options] 选项对象
 * @param { boolean } [options.leading] 指定在延迟开始前调用
 * @param { boolean } [options.trailing] 指定在延迟结束后调用
 * @param { boolean } [options.maxWait] 设置 func 允许被延迟的最大值
 */
export function throttle(
  func: AnyFn,
  wait: number = 0,
  options: { leading: boolean, trailing: boolean, maxWait?: number } = {
    leading: false,
    trailing: true,
  },
) {
  let leading = true
  let trailing = true

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait,
  })
}

import { isObject } from './tools'

/**
 * @function debounce
 * @description 创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。 debounced（防抖动）函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。 可以提供一个 options（选项） 对象决定如何调用 func 方法，options.leading 与|或 options.trailing 决定延迟前后如何触发（注：是 先调用后等待 还是 先等待后调用）。 func 调用时会传入最后一次提供给 debounced（防抖动）函数 的参数。 后续调用的 debounced（防抖动）函数返回是最后一次 func 调用的结果。
 * @param { Function } func 要防抖动的函数
 * @param { number } [wait=0] 需要延迟的毫秒数
 * @param { Object } [options] 选项对象
 * @param { boolean } [options.leading=false] 指定在延迟开始前调用
 * @param { number } [options.maxWait] 设置 func 允许被延迟的最大值
 * @param { boolean } [options.trailing=true] 指定在延迟结束后调用
 * @returns
 */
export function debounce(
  func: Function,
  wait: number = 0,
  options: { leading: boolean; trailing: boolean; maxWait?: number } = {
    leading: false,
    trailing: true
  }
) {
  let lastArgs: any
  let lastThis: any
  let maxWait: number | undefined
  let result: Function
  let timerId: number | undefined
  let lastCallTime: number | undefined
  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  const useRAF =
    !wait && wait !== 0 && typeof window.requestAnimationFrame === 'function'

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  wait = +wait || 0
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(options.maxWait ?? 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time: number) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function startTimer(pendingFunc: Function, milliseconds: number) {
    if (useRAF) {
      window.cancelAnimationFrame(timerId as number)
      return window.requestAnimationFrame(pendingFunc as FrameRequestCallback)
    }
    return setTimeout(pendingFunc, milliseconds)
  }

  function cancelTimer(id: number) {
    if (useRAF) {
      window.cancelAnimationFrame(id)
      return
    }
    clearTimeout(id)
  }

  function leadingEdge(time: number) {
    lastInvokeTime = time
    timerId = startTimer(timerExpired, wait)
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - (lastCallTime as number)
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxing
      ? Math.min(timeWaiting, (maxWait as number) - timeSinceLastInvoke)
      : timeWaiting
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - (lastCallTime as number)
    const timeSinceLastInvoke = time - lastInvokeTime

    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= (maxWait as number))
    )
  }

  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    timerId = startTimer(timerExpired, remainingWait(time))
    return undefined
  }

  function trailingEdge(time: number) {
    timerId = undefined

    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function pending() {
    return timerId !== undefined
  }

  function debounced(this: any, ...args: Array<any>) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        timerId = startTimer(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending
  return debounced
}

/**
 * @description 消息订阅发布
 */

export class EventEmitter<T extends Record<string | symbol, any[]>> {
  protected eventMap: Record<keyof T, Array<(...args: any[]) => void>>
    = {} as any

  /** 添加对应事件的监听函数 */
  on<K extends keyof T>(eventName: K, listener: (...args: T[K]) => void) {
    if (!this.eventMap[eventName]) {
      this.eventMap[eventName] = []
    }
    this.eventMap[eventName].push(listener)
    return this
  }

  /** 监听函数在执行一次后不再执行 */
  once<K extends keyof T>(eventName: K, listener: (...args: T[K]) => void) {
    const fn = (...args: T[K]) => {
      listener(...args)
      this.off(eventName, fn)
    }
    this.on(eventName, fn)

    return this
  }

  /** 触发事件 */
  emit<K extends keyof T>(eventName: K, ...args: T[K]) {
    const listeners = this.eventMap[eventName]
    if (!listeners || listeners.length === 0) {
      return false
    }

    // 浅拷贝，防止在执行监听函数时，监听函数被删除导致foreach循环不到位
    Array.from(listeners).forEach((listener) => {
      listener(...args)
    })
    return true
  }

  /** 取消对应事件的监听 */
  off<K extends keyof T>(eventName: K, listener?: (...args: T[K]) => void) {
    if (!listener) {
      // 未传入函数则删除所有事件监听器
      delete this.eventMap[eventName]
      return this
    }

    const listeners = this.eventMap[eventName]
    if (listeners && listeners.length > 0) {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
    return this
  }
}

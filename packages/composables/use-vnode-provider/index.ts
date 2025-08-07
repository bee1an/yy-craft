import type { AppContext, Component, VNode } from 'vue'
import { h, reactive, render } from 'vue'

export type VNodeProviderInstance = ReturnType<typeof useVNodeProvider>

/**
 * @description
 * 创建一个vnode供养者
 * 旨在创建一个vnode的容器，并将该容器提供给子组件使用
 */
export function useVNodeProvider(
  providerCmp: Component,
  /** 供养者组件props */
  props: any,
  /** 组件上下文 */
  context?: AppContext | null,
): {
  /** 供养者vnode */
  providerVNode: VNode
  /** 子组件vnode  */
  get children(): VNode[]
  /** 供养者dom */
  el: HTMLElement
  /** 卸载供养者 */
  unmount: () => void
  /** 挂载子组件 */
  mountChild: (child: () => VNode, index?: number) => void
  /** 卸载子组件 */
  unmountChild: (child: () => VNode) => (() => VNode)[]
} {
  const borrower = document.createElement('div')
  const childrenFactoy = reactive([]) as (() => VNode)[]

  const providerVNode = h(providerCmp, {
    ...props,
    children: childrenFactoy,
  })

  context && (providerVNode.appContext = context)
  render(providerVNode, borrower)

  const el = borrower.firstElementChild as HTMLElement

  const unmount = () => {
    render(null, borrower)
  }

  const mountChild = (child: () => VNode, index?: number) => {
    typeof index === 'number'
      ? childrenFactoy.splice(index, 0, child)
      : childrenFactoy.push(child)
  }

  const unmountChild = (child: () => VNode) => {
    const idx = childrenFactoy.indexOf(child)

    if (idx !== -1) {
      childrenFactoy.splice(idx, 1)
    }

    return childrenFactoy
  }

  return {
    providerVNode,
    get children() {
      return providerVNode.component!.exposed!.childrenCpt.value as VNode[]
    },
    el,
    unmount,
    mountChild,
    unmountChild,
  }
}

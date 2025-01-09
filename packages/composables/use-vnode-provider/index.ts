import { AppContext, Component, h, reactive, render, VNode } from 'vue'

export type VNodeProviderInstance = ReturnType<typeof useVNodeProvider>

export const useVNodeProvider = (
  providerCmp: Component,
  props: any,
  context?: AppContext | null
) => {
  const borrower = document.createElement('div')
  const childrenFactoy = reactive([]) as (() => VNode)[]

  const providerVNode = h(providerCmp as any, {
    ...props,
    children: childrenFactoy
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
    unmountChild
  }
}

import { defineComponent, inject } from 'vue'
import { InjectSlots, treeNodeProps } from './tree'

export default defineComponent({
  props: {
    node: treeNodeProps['node']
  },

  setup(props) {
    // 获取tree组件的slots
    const treeCtx = inject(InjectSlots)

    return () =>
      // 优先使用tree组件的slots，如果没有则使用node.value
      treeCtx?.slots.default?.({ node: props.node }) ?? props.node.value
  }
})

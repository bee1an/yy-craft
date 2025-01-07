import { CreateNamespace } from '@yy-ui/utils'
import { defineComponent, ExtractPropTypes } from 'vue'

export const messageProviderProps = {}

export type MessageProviderProps = ExtractPropTypes<typeof messageProviderProps>

export default defineComponent({
  name: 'MessageProvider',
  props: messageProviderProps,
  setup() {
    const bem = new CreateNamespace('message-provider')

    return { bem }
  },
  render() {
    const {
      bem,
      $slots: { default: defaultSlots }
    } = this

    return <div class={bem.b().value}>{defaultSlots?.()}</div>
  }
})

import { CreateNamespace } from '@yy-ui/utils'
import {
  computed,
  defineComponent,
  ExtractPropTypes,
  PropType,
  VNode
} from 'vue'

export const messageProviderProps = {
  children: {
    type: Array as PropType<(() => VNode)[]>,
    default: () => []
  }
}

export type MessageProviderProps = ExtractPropTypes<typeof messageProviderProps>

export default defineComponent({
  name: 'MessageProvider',
  props: messageProviderProps,
  setup(props, { expose }) {
    const bem = new CreateNamespace('message-provider')

    const childrenCpt = computed(() => props.children.map(child => child()))

    expose({ childrenCpt })

    return { bem, childrenCpt }
  },
  render() {
    const { bem, childrenCpt } = this

    return <div class={bem.b().value}>{childrenCpt}</div>
  }
})

import { type ExtractPropTypes, type PropType, type VNode, computed, defineComponent, h } from 'vue'

export const messageProviderProps = {
	tag: {
		type: String,
		default: 'div'
	},

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
		const childrenCpt = computed(() => props.children.map((child) => child()))

		expose({ childrenCpt })

		return { childrenCpt }
	},
	render() {
		const {
			childrenCpt,
			$props: { tag }
		} = this

		return h(tag, null, childrenCpt)
	}
})

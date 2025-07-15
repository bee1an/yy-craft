import { providerKey } from '@yy-ui/constants/src/providerKey'
import {
	defineComponent,
	provide,
	type ExtractPropTypes,
	computed,
	reactive,
	type PropType
} from 'vue'

export const configProviderProps = {
	theme: {
		type: String as PropType<'light' | 'dark' | (string & {})>,
		default: 'light'
	}
}

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export default defineComponent({
	name: 'ConfigProvider',
	props: configProviderProps,
	setup(props) {
		const provideValue = reactive({
			theme: computed(() => props.theme)
		})

		provide(providerKey, provideValue)
	},
	render() {
		return this.$slots.default?.()
	}
})

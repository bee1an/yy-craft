import type { ThemeKey } from '@yy-ui/theme-chalk'
import { providerKey } from '@yy-ui/constants/src/providerKey'
import {
	type ExtractPropTypes,
	type PropType,
	computed,
	defineComponent,
	provide,
	reactive
} from 'vue'

export const configProviderProps = {
	theme: {
		type: String as PropType<ThemeKey | (string & {})>,
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

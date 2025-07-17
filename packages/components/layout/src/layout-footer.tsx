import { useTheme, useThemeProps } from '@yy-craft/composables/use-theme'
import {
	type LayoutFooterThemeVars,
	layoutFooterDark,
	layoutFooterLight,
	layoutFooterStyle
} from '@yy-craft/theme-chalk/src/layout'
import { CreateNamespace } from '@yy-craft/utils/src/create'
import { type ExtractPropTypes, computed, defineComponent } from 'vue'

export const layoutFooterProps = {
	...useThemeProps<LayoutFooterThemeVars>(),
	bordered: Boolean
}

export type LayoutFooterProps = ExtractPropTypes<typeof layoutFooterProps>

export default defineComponent({
	name: 'LayoutFooter',
	props: layoutFooterProps,
	setup(props) {
		const bem = new CreateNamespace('layout-footer')

		const lightVars = layoutFooterLight.vars()
		const darkVars = layoutFooterDark.vars()

		const theme = computed(() => {
			return {
				light: Object.assign({}, lightVars, {}),
				dark: Object.assign({}, darkVars, {})
			}
		})

		const { styleVars } = useTheme(theme, 'layout-footer', layoutFooterStyle, props)

		return { bem, styleVars }
	},
	render() {
		const {
			bem,
			styleVars,
			$props: { bordered },
			$slots: { default: defaultSlot }
		} = this

		return (
			<div style={styleVars} class={[bem.b().value, bem.m(bordered && 'bordered').value]}>
				{defaultSlot?.()}
			</div>
		)
	}
})

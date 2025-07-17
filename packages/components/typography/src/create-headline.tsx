import { useTheme, useThemeProps } from '@yy-craft/composables/use-theme'
import {
	type HeadlineThemeVars,
	headlineDark,
	headlineLight,
	headlineStyle
} from '@yy-craft/theme-chalk/src/typography'
import { CreateNamespace } from '@yy-craft/utils/src/create'
import { createKey } from '@yy-craft/utils/src/tools'
import { type ExtractPropTypes, type PropType, computed, defineComponent, h } from 'vue'

export const headlineProps = {
	...useThemeProps<HeadlineThemeVars>(),
	/** 标题类型 */
	type: {
		type: String as PropType<'default' | 'success' | 'warning' | 'error' | 'info'>,
		default: 'default'
	},
	/** 对齐文本 */
	alignText: {
		type: Boolean
	},
	/** 前缀竖条 */
	prefix: {
		type: Boolean
	},
	/** 前缀竖条颜色 */
	prefixColor: {
		type: String
	}
}

export type HeadlineProps = ExtractPropTypes<typeof headlineProps>

export default function (level: 1 | 2 | 3 | 4 | 5 | 6) {
	return defineComponent({
		name: `H${level}`,
		props: headlineProps,
		setup(props) {
			const bem = new CreateNamespace('h')

			const lightVars = headlineLight.vars()
			const darkVars = headlineDark.vars()

			const theme = computed(() => {
				const suffix = level.toString() as '1' | '2' | '3' | '4' | '5' | '6'
				const fontSizeKey = createKey('headerFontSize', suffix)
				const marginKey = createKey('headerMargin', suffix)

				const textColorKey = createKey('textColor', props.type)

				const prefixWidthKey = createKey('headerPrefixWidth', suffix)
				const prefixLeftKey = createKey('headerPrefixLeft', suffix)

				return {
					light: {
						...lightVars,
						fontSize: lightVars[fontSizeKey],
						margin: lightVars[marginKey],
						textColor: lightVars[textColorKey],
						prefixColor: props.prefix
							? props.prefixColor
								? props.prefixColor
								: props.type === 'default'
									? lightVars.prefixColor
									: lightVars[textColorKey]
							: '',
						prefixWidth: props.prefix ? lightVars[prefixWidthKey] : '',
						prefixLeft: props.prefix ? lightVars[prefixLeftKey] : ''
					},
					dark: {
						...darkVars,
						fontSize: darkVars[fontSizeKey],
						margin: darkVars[marginKey],
						textColor: darkVars[textColorKey],
						prefixColor: props.prefix
							? props.prefixColor
								? props.prefixColor
								: props.type === 'default'
									? darkVars.prefixColor
									: darkVars[textColorKey]
							: '',
						prefixWidth: props.prefix ? darkVars[prefixWidthKey] : '',
						prefixLeft: props.prefix ? darkVars[prefixLeftKey] : ''
					}
				}
			})

			const { styleVars } = useTheme(theme, 'h', headlineStyle, props, headlineLight.exclude)

			return { bem, styleVars }
		},
		render() {
			const {
				bem,
				styleVars,
				$props: { prefix, alignText },
				$slots: { default: defaultSlot }
			} = this

			return h(
				`h${level}`,
				{
					style: styleVars,
					class: [
						bem.b().value,
						bem.b('level' + level.toString()).value,
						bem.m(prefix && 'prefix').value,
						bem.m(alignText && 'prefix-align').value
					]
				},
				defaultSlot?.()
			)
		}
	})
}

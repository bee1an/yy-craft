import { CreateNamespace } from '@yy-ui/utils/src/create'
import {
	computed,
	defineComponent,
	type ExtractPropTypes,
	onMounted,
	type PropType,
	ref,
	type VNodeChild
} from 'vue'
import { useTheme, useThemeProps } from '@yy-ui/composables/use-theme'
import {
	type MessageThemeVars,
	messageDark,
	messageLight,
	messageStyle
} from '@yy-ui/theme-chalk/src/message'
import YyIcon from '@yy-ui/components/icon'
import {
	YBaseError,
	YBaseInfo,
	YBaseLoading,
	YBaseSuccess,
	YBaseWarning
} from '../../_internal/icons'
import { YFadeInExpandTransition } from '../../_internal/fade-in-expand-transition'
import { YIconSwitchTransition } from '../../_internal/icon-switch-transition'

export const messageProps = {
	...useThemeProps<MessageThemeVars>(),
	/** id */
	id: {
		type: String
	},
	/** message content */
	content: {
		type: [String, Function] as PropType<string | (() => VNodeChild)>,
		default: ''
	},
	/** show type */
	type: String as PropType<'success' | 'warning' | 'error' | 'info' | 'loading'>,
	/** 持续时间 */
	duration: {
		type: Number,
		default: 3000
	},
	/** hover不消失 */
	keepAliveOnHover: Boolean
}

export type MessageProps = ExtractPropTypes<typeof messageProps>

export const messageEmits = {
	destroy: () => true
}

export type MessageEmits = {}

export default defineComponent({
	name: 'Message',
	props: messageProps,
	emits: messageEmits,
	setup(props, { expose }) {
		const bem = new CreateNamespace('message')

		const lightVars = messageLight.vars()
		const darkVars = messageDark.vars()

		const theme = computed(() => {
			return {
				light: Object.assign({}, lightVars, {}),
				dark: Object.assign({}, darkVars, {})
			}
		})

		const { styleVars } = useTheme(theme, 'message', messageStyle, props)

		const visible = ref(false)
		let timerId: number | null = null
		const startTimer = () => {
			const { duration } = props
			if (duration === 0) return

			timerId = window.setTimeout(() => {
				visible.value = false
			}, duration)
		}
		const stopTimer = () => {
			timerId && clearTimeout(timerId)
		}

		const mouseEnterHandler = () => {
			props.keepAliveOnHover && stopTimer()
		}
		const mouseLeaveHandler = () => {
			props.keepAliveOnHover && startTimer()
		}

		onMounted(() => {
			visible.value = true
			startTimer()
		})

		const content = ref(props.content)
		const type = ref(props.type)

		expose({ visible, content, type })

		return {
			bem,
			styleVars,
			visible,
			mouseEnterHandler,
			mouseLeaveHandler,
			content,
			type
		}
	},
	render() {
		const { bem, styleVars, visible, mouseEnterHandler, mouseLeaveHandler, content, type, $emit } =
			this

		return (
			<YFadeInExpandTransition onAfterLeave={() => $emit('destroy')}>
				<div
					style={styleVars}
					class={bem.b().value}
					v-show={visible}
					onMouseenter={mouseEnterHandler}
					onMouseleave={mouseLeaveHandler}
				>
					<div class={bem.b('block').value}>
						{type && (
							<div class={[bem.b('block').e('icon').value, bem.b('block').e('icon').m(type).value]}>
								<YyIcon>
									<YIconSwitchTransition>
										{type === 'success' ? (
											<YBaseSuccess />
										) : type === 'warning' ? (
											<YBaseWarning />
										) : type === 'error' ? (
											<YBaseError />
										) : type === 'info' ? (
											<YBaseInfo />
										) : (
											<YBaseLoading />
										)}
									</YIconSwitchTransition>
								</YyIcon>
							</div>
						)}
						{
							<div class={bem.b('block').e('content').value}>
								{typeof content === 'string' ? content : content()}
							</div>
						}
					</div>
				</div>
			</YFadeInExpandTransition>
		)
	}
})

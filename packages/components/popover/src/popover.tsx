import { useTheme, useThemeProps } from '@yy-craft/composables/use-theme'
import { zindexable } from '@yy-craft/directives/src/_internal/zindexable'
import { clickOutside } from '@yy-craft/directives/src/click-outside'
import {
	type PopoverThemeVars,
	popoverDark,
	popoverLight,
	popoverStyle
} from '@yy-craft/theme-chalk/src/popover'
import { CreateNamespace } from '@yy-craft/utils/src/create'
import {
	type ExtractPropTypes,
	type PropType,
	type RendererElement,
	type StyleValue,
	Teleport,
	Transition,
	computed,
	defineComponent,
	h,
	mergeProps,
	provide,
	ref,
	shallowRef,
	watch,
	withDirectives
} from 'vue'
import PopoverBody, { popoverBodyProps } from './popover-body'
import PopoverHijack, { popoverHijackProps } from './popover-hijack'
import { popoverInjectKey } from './popover-inject-key'

export const popoverProps = {
	...useThemeProps<PopoverThemeVars>(),

	...popoverHijackProps,

	...popoverBodyProps,

	/** 手动控制显隐 */
	showPopover: Boolean,

	/** hover content 时不hide, 仅在trigger=hover时生效 */
	keepAliveOnHover: { type: Boolean, default: true },

	/** 延时触发, 仅在trigger=hover时生效 */
	delay: { type: Number, default: 100 },

	/** 延时隐藏, 仅在trigger=hover时生效 */
	duration: { type: Number, default: 200 },

	/** popover挂载位置 */
	to: {
		type: [String, Object, Boolean] as PropType<string | RendererElement | boolean>,
		default: 'body'
	},

	/** 是否使用包裹元素*/
	wrapper: Boolean,

	/** wrapper class */
	wrapperClass: null,

	/** wrapper style */
	wrapperStyle: null as unknown as PropType<StyleValue>
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export const popoverEmits = {
	/** 显示 */
	show: () => true,
	/** 显示动画结束 */
	showed: () => true,
	/** 隐藏 */
	hide: () => true,
	/** 隐藏动画结束 */
	hid: () => true,
	/** 点击内容区域外 */
	clickoutside: () => true
}

export type PopoverEmits = typeof popoverEmits

export default defineComponent({
	name: 'Popover',
	props: popoverProps,
	emits: popoverEmits,
	setup(props, { emit }) {
		const bem = new CreateNamespace('popover')

		const lightVars = popoverLight.vars()
		const darkVars = popoverDark.vars()

		const theme = computed(() => {
			return {
				light: Object.assign({}, props.raw ? {} : lightVars, {}),
				dark: Object.assign({}, props.raw ? {} : darkVars, {})
			}
		})

		const { styleVars } = useTheme(theme, 'popover', popoverStyle, props)

		watch(
			() => props.showPopover,
			() => {
				visible.value = !!props.showPopover
			}
		)
		const visible = ref(!!props.showPopover)
		const entireVisible = ref(false)
		const afterEnterHandler = () => {
			if (entireVisible.value) return
			entireVisible.value = true
			emit('showed')
		}
		const afterLeaveHandler = () => {
			if (!entireVisible.value) return
			entireVisible.value = false
			emit('hid')
		}

		const show = () => {
			if (visible.value) return
			visible.value = true
			emit('show')
		}
		const hide = () => {
			if (!visible.value) return
			visible.value = false
			emit('hide')
		}

		const triggerRef = shallowRef<HTMLElement | null>(null)
		const setTargetRef = (target: HTMLElement | null) => {
			triggerRef.value = target
		}

		const contentMouseenter = () => {
			if (
				props.trigger === 'hover' &&
				props.keepAliveOnHover &&
				visible.value // visible.value这个判断防止,在关闭动画时,hover到content,然后再次打开
			) {
				triggerMouseenter()
			}
		}
		const contentMouseleave = () => {
			if (props.trigger === 'hover' && props.keepAliveOnHover) {
				triggerMouseleave()
			}
		}

		let showTimerId: number | null = null
		const clearShowTimer = () => {
			showTimerId && clearTimeout(showTimerId)
		}
		const triggerMouseenter = () => {
			if (props.trigger !== 'hover') return

			clearHideTimer()

			if (props.delay === 0) {
				show()
				return
			}

			showTimerId = window.setTimeout(show, props.delay)
		}
		let hideTimerId: number | null = null
		const clearHideTimer = () => {
			hideTimerId && clearTimeout(hideTimerId)
		}
		const triggerMouseleave = () => {
			if (props.trigger !== 'hover') return

			clearShowTimer()

			if (props.duration === 0) {
				hide()
				return
			}

			hideTimerId = window.setTimeout(hide, props.duration)
		}

		const triggerClick = () => {
			if (props.trigger !== 'click' || entireVisible.value) return // hide动画未结束不能通过点击重新打开

			show()
		}
		const contentClickOutside = () => {
			props.trigger === 'click' && hide()
			emit('clickoutside')
		}

		provide(popoverInjectKey, {
			setTargetRef,
			bem,
			styleVars,
			triggerRef,
			wrapper: computed(() => props.wrapper)
		})
		return {
			bem,
			visible,
			afterEnterHandler,
			afterLeaveHandler,
			show,
			hide,
			triggerRef,
			contentMouseenter,
			contentMouseleave,
			triggerMouseenter,
			triggerMouseleave,
			triggerClick,
			contentClickOutside
		}
	},
	render() {
		const {
			bem,
			visible,
			afterEnterHandler,
			afterLeaveHandler,
			show,
			hide,
			contentMouseenter,
			contentMouseleave,
			triggerMouseenter,
			triggerMouseleave,
			triggerClick,
			contentClickOutside,
			$attrs,
			$props: {
				to,
				trigger,
				placement,
				width,
				showArrow,
				raw,
				contentClass,
				contentStyle,
				arrowClass,
				arrowStyle,
				zIndex,
				distanceFromTrigger,
				wrapper,
				wrapperClass,
				wrapperStyle,
				x,
				y
			},
			$slots: { trigger: triggerSlot, default: defaultSlot }
		} = this

		const shared = (
			<>
				<PopoverHijack
					trigger={trigger}
					onClick={triggerClick}
					onShow={show}
					onHide={hide}
					onMouseenter={triggerMouseenter}
					onMouseleave={triggerMouseleave}
				>
					{triggerSlot}
				</PopoverHijack>
				<Teleport to={to && typeof to !== 'boolean' ? to : 'body'} disabled={!to}>
					<Transition
						name="popover-transition"
						onAfterEnter={afterEnterHandler}
						onAfterLeave={afterLeaveHandler}
						appear
					>
						{visible &&
							withDirectives(
								h(
									PopoverBody,
									{
										...mergeProps({ style: { position: wrapper ? 'absolute' : 'fixed' } }, $attrs),
										trigger,
										placement,
										width,
										showArrow,
										raw,
										contentClass,
										contentStyle,
										arrowClass,
										arrowStyle,
										zIndex,
										distanceFromTrigger,
										wrapper,
										x,
										y,
										onMouseenter: contentMouseenter,
										onMouseleave: contentMouseleave
									},
									defaultSlot
								),
								[
									[clickOutside, contentClickOutside],
									typeof zIndex === 'undefined' ? [zindexable] : [{}]
								]
							)}
					</Transition>
				</Teleport>
			</>
		)

		return wrapper ? (
			// 空标签防止attr直接渲染到这个div, 也可以使用 defineComponent的inheritAttrs实现
			<>
				<div class={[bem.b('wrapper').value, wrapperClass]} style={wrapperStyle}>
					{shared}
				</div>
			</>
		) : (
			<>{shared}</>
		)
	}
})

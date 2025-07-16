import {
	type ExtractPropTypes,
	type PropType,
	defineComponent,
	h,
	inject,
	withDirectives
} from 'vue'
import { popoverInjectKey } from './popover-inject-key'

export const popoverHijackProps = {
	/** 触发方式 */
	trigger: {
		type: String as PropType<'click' | 'hover' | 'focus' | 'manual'>,
		default: 'click'
	}
}

export type PopoverHijackProps = ExtractPropTypes<typeof popoverHijackProps>

export const popoverHijackEmits = {
	show: (() => true) as (event: FocusEvent) => void,
	hide: (() => true) as (event: FocusEvent) => void,
	click: (() => true) as (event: MouseEvent) => void,
	mouseenter: (() => true) as (event: MouseEvent) => void,
	mouseleave: (() => true) as (event: MouseEvent) => void
}

export type PopoverHijackEmits = typeof popoverHijackEmits

export default defineComponent({
	name: 'PopoverHijack',
	props: popoverHijackProps,
	emits: popoverHijackEmits,
	setup(props, { emit }) {
		const { setTargetRef } = inject(popoverInjectKey)!

		const triggerFocusHandler = (event: FocusEvent, state: 'focus' | 'blur') => {
			if (props.trigger === 'focus') {
				state === 'focus' ? emit('show', event) : emit('hide', event)
			}
		}

		return {
			setTargetRef,
			triggerFocusHandler
		}
	},

	render() {
		const {
			setTargetRef,
			triggerFocusHandler,
			$emit,
			$props: { trigger },
			$slots: { default: defaultSlot }
		} = this

		return defaultSlot!().map((child, index) => {
			if (index) {
				return h(child)
			}

			const childProps: any = {
				onClick: (event: MouseEvent) => $emit('click', event),
				onMouseenter: (event: MouseEvent) => $emit('mouseenter', event),
				onMouseleave: (event: MouseEvent) => $emit('mouseleave', event),
				onFocus: (event: FocusEvent) => triggerFocusHandler(event, 'focus'),
				onBlur: (event: FocusEvent) => triggerFocusHandler(event, 'blur')
			}

			if (trigger === 'focus') {
				childProps.tabIndex = '0'
			}

			/** 使用指令的方式获取slot的dom, naive ui作者真的是甜菜 */
			return withDirectives(h(child, childProps), [[setTargetRef]])
		})
	}
})

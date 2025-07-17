import {
	type DefaultPlacement,
	getOppositeDirection,
	usePlacement
} from '@yy-craft/composables/use-placement'
import { px } from '@yy-craft/utils/src/css'
import { getIntersection } from '@yy-craft/utils/src/tools'
import {
	type ExtractPropTypes,
	type PropType,
	type StyleValue,
	computed,
	defineComponent,
	inject,
	shallowRef
} from 'vue'
import { popoverInjectKey } from './popover-inject-key'

export const popoverBodyProps = {
	/** 触发方式 */
	trigger: {
		type: String as PropType<'click' | 'hover' | 'focus' | 'manual'>,
		default: 'click'
	},

	/** 位置 */
	placement: { type: String as PropType<DefaultPlacement>, default: 'bottom' },

	/** 内容宽度, width=trigger时内容宽度与触发器宽度一致 */
	width: [Number, String] as PropType<number | 'trigger'>,

	/** 不要箭头 */
	showArrow: { type: Boolean, default: true },

	/** 不要样式 */
	row: Boolean,

	/** 内容类名 */
	contentClass: null as unknown as PropType<any>,

	/** 内容样式 */
	contentStyle: null as unknown as PropType<StyleValue>,

	/** 箭头类名 */
	arrowClass: null as unknown as PropType<any>,

	/** 箭头样式 */
	arrowStyle: null as unknown as PropType<StyleValue>,

	/** zIndex */
	zIndex: Number,

	/** 吸附元素距离触发器的距离 */
	distanceFromTrigger: { type: Number, default: 10 },

	/**
	 * 手动控制位置x
	 *
	 * 手动控制位置时会根据点击位置为中心获取一个矩形对象的位置和宽高信息, 再根据这个矩形的信息返回其他所需的配置
	 */
	x: Number,

	/**	手动控制位置y */
	y: Number
}

export type PopoverBodyProps = ExtractPropTypes<typeof popoverBodyProps>

// 箭头的宽高
const ARROWRECTLENGTH = 10
// 箭头旋转后包围盒的宽度
const ARROWWRAPPERRECTLENGTH = Math.sqrt(ARROWRECTLENGTH ** 2 + ARROWRECTLENGTH ** 2)

export const popoverBodyEmits = {
	mouseenter: (() => true) as (event: MouseEvent) => void,
	mouseleave: (() => true) as (event: MouseEvent) => void
}

export type PopoverBodyEmits = typeof popoverBodyEmits

export default defineComponent({
	name: 'PopoverBody',
	props: popoverBodyProps,
	emits: popoverBodyEmits,
	// inheritAttrs: false,
	setup(props) {
		const { bem, styleVars, triggerRef, wrapper } = inject(popoverInjectKey)!

		const contentRef = shallowRef<HTMLElement | null>(null)

		const manualSite = computed(() => {
			let w = 0,
				h = 0

			// 根据placement模拟一个矩形
			if (props.placement.split('-').length > 0) {
				if (props.placement.includes('top') || props.placement.includes('bottom')) {
					w = ARROWWRAPPERRECTLENGTH + 4
				}

				if (props.placement.includes('left') || props.placement.includes('right')) {
					h = ARROWWRAPPERRECTLENGTH + 4
				}
			}

			return { x: props.x!, y: props.y!, w, h }
		})

		const triggerRefOrManual = computed(() => {
			return props.trigger === 'manual' ? manualSite.value : triggerRef.value
		})

		const {
			top: uncorrectedTop,
			left: uncorrectedLeft,
			placementDirection,
			triggerTop,
			triggerLeft,
			triggerRight,
			triggerBottom,
			triggerWidth,
			triggerHeight,
			contentWidth,
			contentHeight
		} = usePlacement(
			triggerRefOrManual,
			contentRef,
			computed(() => ({
				placement: props.placement,
				visibleAreaThreshold: 10,
				distanceFromTrigger: props.distanceFromTrigger
			}))
		)

		const top = computed(() => {
			return uncorrectedTop.value - (wrapper.value ? triggerTop.value : 0)
		})
		const left = computed(() => {
			return uncorrectedLeft.value - (wrapper.value ? triggerLeft.value : 0)
		})

		const arrowPosition = computed(() => {
			if (['top', 'bottom'].includes(placementDirection.value)) {
				const [min, max] = getIntersection(
					[triggerLeft.value, triggerRight.value],
					[uncorrectedLeft.value, uncorrectedLeft.value + contentWidth.value]
				)!

				return { left: (min + max) / 2 - uncorrectedLeft.value + 'px' }
			}

			const [min, max] = getIntersection(
				[triggerTop.value, triggerBottom.value],
				[uncorrectedTop.value, uncorrectedTop.value + contentHeight.value]
			)!

			return { top: (min + max) / 2 - uncorrectedTop.value + 'px' }
		})

		const oppositeDirection = computed(() => getOppositeDirection(placementDirection.value))

		return {
			bem,
			styleVars,
			contentRef,
			top,
			left,
			arrowPosition,
			oppositeDirection,
			triggerWidth,
			triggerHeight,
			placementDirection
		}
	},

	render() {
		const {
			bem,
			styleVars,
			top,
			left,
			arrowPosition,
			oppositeDirection,
			triggerWidth,
			placementDirection,
			$emit,
			$props: { width, showArrow, row, contentClass, contentStyle, arrowClass, arrowStyle, zIndex },
			$slots: { default: defaultSlot }
		} = this

		const wapperStyle = [
			styleVars,
			{
				zIndex: zIndex,
				top: px(top),
				left: px(left),
				transformOrigin: `${arrowPosition.left ?? oppositeDirection} ${
					arrowPosition.top ?? oppositeDirection
				}`,
				width: width && px(width === 'trigger' ? triggerWidth : width)
			} as const
		]

		return (
			<div
				class={[
					bem.b().value,
					bem.m('placement-' + placementDirection).value,
					bem.m(row && 'row').value
				]}
				style={wapperStyle}
				ref="contentRef"
				onMouseenter={(event: MouseEvent) => $emit('mouseenter', event)}
				onMouseleave={(event: MouseEvent) => $emit('mouseleave', event)}
			>
				{showArrow && (
					<div
						class={[bem.b('arrow').value, arrowClass]}
						style={[arrowPosition, arrowStyle!]}
					></div>
				)}
				<div class={[bem.b('content').value, contentClass]} style={contentStyle}>
					{defaultSlot?.()}
				</div>
			</div>
		)
	}
})

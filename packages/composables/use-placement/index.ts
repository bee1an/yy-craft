import { computed, type Ref, ref, type ShallowRef, unref } from 'vue'
import { useElementBounding } from '../use-element-bounding'
import { useWindowSize } from '../use-window-size'
import { useElementSize } from '../use-element-size'

export type DefaultPlacement =
	| 'top'
	| 'bottom'
	| 'left'
	| 'right'
	| 'top-start'
	| 'top-end'
	| 'bottom-start'
	| 'bottom-end'
	| 'left-start'
	| 'left-end'
	| 'right-start'
	| 'right-end'

export type PlacementOptions = {
	placement: DefaultPlacement

	/** 吸附元素距离触发器的距离 */
	distanceFromTrigger?: number

	/**
	 * @descrption 判定触发器是否在可视区域的冗余值
	 * @example 若值为20, 则触发器还有20px在可视区域时, 触发器也会被判定为不在可视区域
	 */
	visibleAreaThreshold?: number
}

/**
 * @param trigger 支持传递一个dom或者一个带有位置和宽高信息的对象
 *
 * 如果只有位置信息, 则会trigger会被当作是一个宽高为1的矩形, 再根据一个矩形算出其他配置
 */

export const usePlacement = (
	trigger: Readonly<
		ShallowRef<HTMLElement | null | { x: number; y: number; w?: number; h?: number }>
	>,
	content: Readonly<ShallowRef<HTMLElement | null>>,
	options: PlacementOptions | Ref<PlacementOptions>
) => {
	let triggerWidth: Ref<number>,
		triggerHeight: Ref<number>,
		triggerTop: Ref<number>,
		triggerLeft: Ref<number>,
		triggerRight: Ref<number>,
		triggerBottom: Ref<number>

	if (trigger.value && 'x' in trigger.value && 'y' in trigger.value) {
		const t = trigger as any

		triggerWidth = computed(() => t.value.w ?? 1)
		triggerHeight = computed(() => t.value.h ?? 1)
		triggerTop = computed(() => t.value.y - triggerHeight.value / 2)
		triggerLeft = computed(() => t.value.x - triggerWidth.value / 2)
		triggerRight = computed(() => triggerLeft.value + triggerWidth.value)
		triggerBottom = computed(() => triggerTop.value + triggerHeight.value)
	} else {
		;({
			width: triggerWidth,
			height: triggerHeight,
			top: triggerTop,
			left: triggerLeft,
			right: triggerRight,
			bottom: triggerBottom
		} = useElementBounding(trigger as Readonly<ShallowRef<HTMLElement | null>>))
	}

	const { width: windowWidth, height: windowHeight } = useWindowSize()

	const { width: contentWidth, height: contentHeight } = useElementSize(content)

	const primePlacement = computed(() => {
		return unref(options).placement.split('-')[0] as 'top' | 'bottom' | 'left' | 'right'
	})
	const placementDirection = ref(primePlacement.value)

	const distanceFromTrigger = computed(() => {
		return unref(options).distanceFromTrigger ?? 10
	})
	const visibleAreaThreshold = computed(() => {
		return unref(options).visibleAreaThreshold ?? 0
	})

	const secondPlacement = computed(() => {
		return unref(options).placement.split('-')[1] as 'start' | 'end' | undefined
	})

	function getPosition(placement: 'top' | 'bottom' | 'left' | 'right'): number {
		if (placement === 'top') {
			return contentHeight.value
				? triggerTop.value - contentHeight.value - distanceFromTrigger.value
				: getPosition('bottom') // 内容元素未加载, 则先置于底部, 防止内容元素遮挡触发器
		}
		if (placement === 'bottom') {
			return triggerTop.value + triggerHeight.value + distanceFromTrigger.value
		}
		if (placement === 'left') {
			return contentWidth.value
				? triggerLeft.value - contentWidth.value - distanceFromTrigger.value
				: getPosition('right')
		}
		if (placement === 'right') {
			return triggerLeft.value + triggerWidth.value + distanceFromTrigger.value
		}

		return null as never
	}

	function getSecondPosition(
		placement: 'start' | 'end' | undefined,
		triggerPos: number,
		triggerSize: number,
		contentSize: number
	) {
		if (placement === 'start') {
			return triggerPos
		}
		if (placement === 'end') {
			return triggerPos + triggerSize - contentSize
		}

		return triggerPos + triggerSize / 2 - contentSize / 2
	}

	const unregulatedTop = computed(() => {
		if (primePlacement.value === 'top' || primePlacement.value === 'bottom') {
			return getPosition(primePlacement.value)
		}

		return getSecondPosition(
			secondPlacement.value,
			triggerTop.value,
			triggerHeight.value,
			contentHeight.value
		)
	})

	const overViewport = (direction: 'vertical' | 'horizontal', posValue?: number) => {
		const payload = { overStart: false, overEnd: false }

		const endLimit =
			direction === 'vertical'
				? windowHeight.value - contentHeight.value
				: windowWidth.value - contentWidth.value

		payload.overStart = (posValue ?? getPosition(direction === 'vertical' ? 'top' : 'left')) < 0

		payload.overEnd =
			(posValue ?? getPosition(direction === 'vertical' ? 'bottom' : 'right')) > endLimit

		return payload
	}

	const resolveTop = computed(() => {
		if (['top', 'bottom'].includes(primePlacement.value)) {
			const { overStart, overEnd } = overViewport('vertical')
			if (overStart && !overEnd) {
				placementDirection.value = 'bottom'
				return getPosition('bottom')
			}

			if (overEnd && !overStart) {
				placementDirection.value = 'top'
				return getPosition('top')
			}

			placementDirection.value = primePlacement.value
		} else {
			const { overStart, overEnd } = overViewport('vertical', unregulatedTop.value)
			if (overStart && !overEnd) {
				const triggerVisible = triggerTop.value + triggerHeight.value > visibleAreaThreshold.value

				return triggerVisible
					? 0
					: triggerTop.value + triggerHeight.value - visibleAreaThreshold.value
			}
			if (overEnd && !overStart) {
				const triggerVisible = triggerTop.value + visibleAreaThreshold.value < windowHeight.value

				return triggerVisible
					? windowHeight.value - contentHeight.value
					: triggerTop.value + visibleAreaThreshold.value - contentHeight.value
			}
		}

		return unregulatedTop.value
	})

	const unregulatedLeft = computed(() => {
		if (primePlacement.value === 'left' || primePlacement.value === 'right') {
			return getPosition(primePlacement.value)
		}

		return getSecondPosition(
			secondPlacement.value,
			triggerLeft.value,
			triggerWidth.value,
			contentWidth.value
		)
	})
	const resolveLeft = computed(() => {
		if (['left', 'right'].includes(primePlacement.value)) {
			const { overStart, overEnd } = overViewport('horizontal')
			if (overStart && !overEnd) {
				placementDirection.value = 'right'
				return getPosition('right')
			}

			if (overEnd && !overStart) {
				placementDirection.value = 'left'
				return getPosition('left')
			}

			placementDirection.value = primePlacement.value
		} else {
			const { overStart, overEnd } = overViewport('horizontal', unregulatedLeft.value)
			if (overStart && !overEnd) {
				const triggerVisible = triggerLeft.value + triggerWidth.value > visibleAreaThreshold.value

				return triggerVisible
					? 0
					: triggerLeft.value + triggerWidth.value - visibleAreaThreshold.value
			}
			if (overEnd && !overStart) {
				const triggerVisible = triggerLeft.value + visibleAreaThreshold.value < windowWidth.value
				return triggerVisible
					? windowWidth.value - contentWidth.value
					: triggerLeft.value + visibleAreaThreshold.value - contentWidth.value
			}
		}

		return unregulatedLeft.value
	})

	return {
		top: resolveTop,
		left: resolveLeft,
		placementDirection,
		triggerWidth,
		triggerHeight,
		triggerTop,
		triggerLeft,
		triggerRight,
		triggerBottom,
		windowWidth,
		windowHeight,
		contentWidth,
		contentHeight
	}
}

export const getOppositeDirection = (direction: 'top' | 'bottom' | 'left' | 'right') => {
	if (direction === 'top') return 'bottom'
	if (direction === 'bottom') return 'top'
	if (direction === 'left') return 'right'
	if (direction === 'right') return 'left'
}

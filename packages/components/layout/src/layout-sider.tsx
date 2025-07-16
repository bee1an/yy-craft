import { useTheme, useThemeProps } from '@yy-ui/composables/use-theme'
import {
	type LayoutSiderThemeVars,
	layoutSiderDark,
	layoutSiderLight,
	layoutSiderStyle
} from '@yy-ui/theme-chalk/src/layout'
import { CreateNamespace } from '@yy-ui/utils/src/create'
import { depx, px } from '@yy-ui/utils/src/css'
import {
	type ExtractPropTypes,
	type PropType,
	type StyleValue,
	computed,
	defineComponent,
	ref,
	shallowRef,
	watch
} from 'vue'
import { YBaseCollapsed } from '../../_internal/icons'
import YyScrollbar from '../../scrollbar'

export const layoutSiderProps = {
	...useThemeProps<LayoutSiderThemeVars>(),
	bordered: Boolean,
	/** 内容类名 */
	contentClass: null as unknown as PropType<any>,
	/** 内容样式 */
	contentStyle: null as unknown as PropType<StyleValue>,
	/** 宽度 */
	width: [String, Number] as PropType<string | number>,
	/** 默认收起状态 */
	collapsed: Boolean,
	/** 收起时宽度 */
	collapsedWidth: [String, Number] as PropType<string | number>,
	/** 收起时内容的显示状态 */
	showCollapsedContent: { type: Boolean, default: true }
}

export type LayoutSiderProps = ExtractPropTypes<typeof layoutSiderProps>

export const layoutSiderEmits = {
	/** 侧边栏展开前 */
	beforeExpand: () => true,
	/** 侧边栏展开后 */
	expanded: () => true,
	/** 侧边栏收起前 */
	beforeCollapse: () => true,
	/** 侧边栏收起后 */
	collapsed: () => true
}

export type LayoutSiderEmits = typeof layoutSiderEmits

export default defineComponent({
	name: 'LayoutSider',
	props: layoutSiderProps,
	emits: layoutSiderEmits,
	setup(props, { emit }) {
		const bem = new CreateNamespace('layout-sider')

		const lightVars = layoutSiderLight.vars()
		const darkVars = layoutSiderDark.vars()

		const theme = computed(() => {
			return {
				light: Object.assign({}, lightVars, {}),
				dark: Object.assign({}, darkVars, {})
			}
		})

		const { styleVars } = useTheme(theme, 'layout-sider', layoutSiderStyle, props)

		const collapsed = ref(props.collapsed ?? false)
		watch(
			() => props.collapsed,
			(val) => {
				collapsed.value = val
			}
		)

		const resolveWidth = computed(() => {
			return px(collapsed.value ? props.collapsedWidth : props.width)
		})

		const toggleHandler = () => {
			collapsed.value = !collapsed.value
			if (collapsed.value) {
				emit('beforeCollapse')
			} else {
				emit('beforeExpand')
			}
		}

		const showCollapsedTrigger = computed(() => {
			return typeof props.collapsedWidth !== 'undefined'
		})

		const layoutSiderContainer = shallowRef<HTMLElement | null>(null)

		const transitionendHandler = (e: TransitionEvent) => {
			if (e.propertyName === 'width' && e.target === layoutSiderContainer.value) {
				if (collapsed.value) {
					// 收起
					emit('collapsed')
				} else {
					// 展开
					emit('expanded')
				}
			}
		}

		return {
			bem,
			styleVars,
			collapsed,
			resolveWidth,
			toggleHandler,
			showCollapsedTrigger,
			layoutSiderContainer,
			transitionendHandler
		}
	},
	render() {
		const {
			bem,
			styleVars,
			collapsed,
			resolveWidth,
			toggleHandler,
			showCollapsedTrigger,
			transitionendHandler,
			$props: { bordered, contentClass, contentStyle, collapsedWidth, showCollapsedContent },
			$slots: { default: defaultSlot }
		} = this

		return (
			<aside
				style={{ ...styleVars, width: resolveWidth }}
				class={[bem.b().value, bem.m(bordered && 'bordered').value]}
				onTransitionend={transitionendHandler}
				ref="layoutSiderContainer"
			>
				<YyScrollbar
					contentClass={[
						contentClass,
						bem.e('content').value,
						bem.e('content').m(!showCollapsedContent && collapsed && 'hide').value
					]}
					contentStyle={contentStyle}
				>
					{defaultSlot?.()}
				</YyScrollbar>

				{showCollapsedTrigger && (
					<div
						class={[
							bem.e('collapsed-trigger').value,
							bem.e('collapsed-trigger').m(collapsed && 'collapsed').value
						]}
						style={{
							right: collapsed && depx(collapsedWidth!) <= 12 ? '-20px' : undefined
						}}
						onClick={toggleHandler}
					>
						<YBaseCollapsed></YBaseCollapsed>
					</div>
				)}
			</aside>
		)
	}
})

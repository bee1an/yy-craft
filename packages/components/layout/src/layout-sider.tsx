import { CreateNamespace, px } from '@yy-ui/utils'
import {
  computed,
  defineComponent,
  ExtractPropTypes,
  PropType,
  ref,
  StyleValue,
  watch
} from 'vue'
import {
  layoutSiderDark,
  layoutSiderLight,
  layoutSiderStyle,
  LayoutSiderThemeVars
} from '@yy-ui/yy-ui'
import { useTheme, useThemeProps } from '@yy-ui/composables'
import YyScrollbar from '../../scrollbar'
import { YBaseCollapsed } from '../../_internal'

export const layoutSiderProps = {
  ...useThemeProps<LayoutSiderThemeVars>(),
  bordered: Boolean,
  /** 内容类名 */
  contentClass: [Object, Array, String] as PropType<any>,
  /** 内容样式 */
  contentStyle: [Object, Array, String] as PropType<StyleValue>,
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

export default defineComponent({
  name: 'LayoutSider',
  props: layoutSiderProps,
  setup(props) {
    const bem = new CreateNamespace('layout-sider')

    const lightVars = layoutSiderLight.vars()
    const darkVars = layoutSiderDark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars, {}),
        dark: Object.assign({}, darkVars, {})
      }
    })

    const { styleVars } = useTheme(
      theme,
      'layout-sider',
      layoutSiderStyle,
      props
    )

    const collapsed = ref(props.collapsed ?? false)
    watch(
      () => props.collapsed,
      val => {
        collapsed.value = val
      }
    )

    const resolveWidth = computed(() => {
      return px(collapsed.value ? props.collapsedWidth : props.width)
    })

    const toggleHandler = () => {
      collapsed.value = !collapsed.value
    }

    const showCollapsedTrigger = computed(() => {
      return typeof props.collapsedWidth !== 'undefined'
    })

    return {
      bem,
      styleVars,
      collapsed,
      resolveWidth,
      toggleHandler,
      showCollapsedTrigger
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
      $props: { bordered, contentClass, contentStyle, showCollapsedContent },
      $slots: { default: defaultSlot }
    } = this

    return (
      <aside
        style={{ ...styleVars, width: resolveWidth }}
        class={[bem.b().value, bem.m(bordered && 'bordered').value]}
      >
        <YyScrollbar
          contentClass={[
            contentClass,
            bem.e('content').value,
            bem.e('content').m(!showCollapsedContent && collapsed && 'hide')
              .value
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
            onClick={toggleHandler}
          >
            <YBaseCollapsed></YBaseCollapsed>
          </div>
        )}
      </aside>
    )
  }
})

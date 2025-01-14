import { CreateNamespace } from '@yy-ui/utils'
import {
  computed,
  defineComponent,
  ExtractPropTypes,
  InjectionKey,
  PropType,
  provide,
  StyleValue
} from 'vue'
import { useTheme, useThemeProps } from '@yy-ui/composables'
import {
  LayoutThemeVars,
  layoutDark,
  layoutLight,
  layoutStyle
} from '@yy-ui/theme-chalk'
import YyScrollbar from '../../scrollbar'

export const layoutProps = {
  ...useThemeProps<LayoutThemeVars>(),
  /** 是否有侧边栏 */
  hasSider: Boolean,
  /** 内容类名 */
  contentClass: [Object, Array, String] as PropType<any>,
  /** 内容样式 */
  contentStyle: [Object, Array, String] as PropType<StyleValue>
}

export const layoutInjectKey = Symbol('layoutInjectKey') as InjectionKey<{
  bem: CreateNamespace
}>

export type LayoutProps = ExtractPropTypes<typeof layoutProps>

export default defineComponent({
  name: 'Layout',
  props: layoutProps,
  setup(props) {
    const bem = new CreateNamespace('layout')

    const lightVars = layoutLight.vars()
    const darkVars = layoutDark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars, {}),
        dark: Object.assign({}, darkVars, {})
      }
    })

    const { styleVars } = useTheme(theme, 'layout', layoutStyle, props)

    provide(layoutInjectKey, { bem })

    return { bem, styleVars }
  },
  render() {
    const {
      bem,
      styleVars,
      $props: { hasSider, contentClass, contentStyle },
      $slots: { default: defaultSlot }
    } = this

    const siderStyle = {
      display: 'flex',
      flexFlow: 'row',
      width: '100%'
    }

    return (
      <div
        style={styleVars}
        class={[bem.b().value, bem.m(hasSider && 'has-sider').value]}
      >
        <YyScrollbar
          contentStyle={[hasSider && siderStyle, contentStyle]}
          contentClass={contentClass}
        >
          {defaultSlot?.()}
        </YyScrollbar>
      </div>
    )
  }
})

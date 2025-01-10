import { CreateNamespace } from '@yy-ui/utils'
import {
  computed,
  defineComponent,
  ExtractPropTypes,
  InjectionKey,
  provide
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
  hasSider: Boolean
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
      $props: { hasSider },
      $slots: { default: defaultSlot }
    } = this

    return (
      <div
        style={styleVars}
        class={[bem.b().value, bem.m(hasSider && 'has-sider').value]}
      >
        <div class={bem.b('scroll-container').value}>
          <YyScrollbar>
            <div
              style={
                hasSider
                  ? {
                      display: 'flex',
                      flexFlow: 'row',
                      width: '100%'
                    }
                  : ''
              }
              class={bem.b('container').value}
            >
              {defaultSlot?.()}
            </div>
          </YyScrollbar>
        </div>
      </div>
    )
  }
})

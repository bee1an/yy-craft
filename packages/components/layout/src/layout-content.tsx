import { CreateNamespace } from '@yy-ui/utils/src/create'
import {
  computed,
  defineComponent,
  ExtractPropTypes,
  inject,
  PropType,
  StyleValue
} from 'vue'
import YyScrollbar from '../../scrollbar'
import { useTheme, useThemeProps } from '@yy-ui/composables/use-theme'
import {
  layoutDark,
  layoutLight,
  LayoutThemeVars
} from '@yy-ui/theme-chalk/src/layout'
import { layoutInjectKey } from './layout'

export const layoutContentProps = {
  ...useThemeProps<LayoutThemeVars>(),
  /** 内容类名 */
  contentClass: null as unknown as PropType<any>,
  /** 内容样式 */
  contentStyle: null as unknown as PropType<StyleValue>
}

export type LayoutContentProps = ExtractPropTypes<typeof layoutContentProps>

export default defineComponent({
  name: 'LayoutContent',
  props: layoutContentProps,
  setup(props) {
    const { bem: layoutBem } = inject(layoutInjectKey)!

    const bem = new CreateNamespace('layout-content')

    const lightVars = layoutLight.vars()
    const darkVars = layoutDark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars, {}),
        dark: Object.assign({}, darkVars, {})
      }
    })

    const { styleVars } = useTheme(theme, 'layout', undefined, props)

    return { layoutBem, bem, styleVars }
  },
  render() {
    const {
      layoutBem,
      bem,
      styleVars,
      $props: { contentClass, contentStyle },
      $slots: { default: defaultSlot }
    } = this

    return (
      <div style={styleVars} class={[layoutBem.b().value, bem.b().value]}>
        <YyScrollbar contentClass={contentClass} contentStyle={contentStyle}>
          {defaultSlot?.()}
        </YyScrollbar>
      </div>
    )
  }
})

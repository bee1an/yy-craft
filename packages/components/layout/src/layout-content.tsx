import { CreateNamespace } from '@yy-ui/utils'
import { computed, defineComponent, ExtractPropTypes, inject } from 'vue'
import YyScrollbar from '../../scrollbar'
import { useTheme, useThemeProps } from '@yy-ui/composables'
import { layoutDark, layoutLight, LayoutThemeVars } from '@yy-ui/yy-ui'
import { layoutInjectKey } from './layout'

export const layoutContentProps = {
  ...useThemeProps<LayoutThemeVars>(),

  contentStyle: String
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
      $props: { contentStyle },
      $slots: { default: defaultSlot }
    } = this

    return (
      <div style={styleVars} class={[layoutBem.b().value, bem.b().value]}>
        <div style={contentStyle} class={layoutBem.b('scroll-container').value}>
          <YyScrollbar>{defaultSlot?.()}</YyScrollbar>
        </div>
      </div>
    )
  }
})

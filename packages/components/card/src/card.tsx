import { useTheme, useThemeProps } from '@yy-ui/composables'
import { cardDark, cardLight, cardStyle, CardTheme } from '@yy-ui/theme-chalk'
import { CreateNamespace } from '@yy-ui/utils'
import { defineComponent, PropType, VNodeChild } from 'vue'

import { ExtractPropTypes } from 'vue'

export const cardProps = {
  ...useThemeProps<CardTheme>(),
  /** 标题 */
  title: {
    type: [String, Function] as PropType<string | (() => VNodeChild)>
  }
}

export type CardProps = ExtractPropTypes<typeof cardProps>

export default defineComponent({
  name: 'Card',
  props: cardProps,
  setup(props) {
    const bem = new CreateNamespace('card')

    const { styleVars } = useTheme(
      { light: cardLight.vars(), dark: cardDark.vars() },
      'card',
      cardStyle,
      props
    )

    return { bem, styleVars }
  },
  render() {
    const { bem, styleVars, $slots, $props } = this
    const { title } = $props

    const {
      cover,
      header,
      headerExtra,
      default: dftSlot,
      footer,
      action
    } = $slots

    return (
      <div style={styleVars} class={bem.b().value}>
        <div class={bem.b('header').value}>
          {header ? (
            header()
          ) : typeof title === 'function' ? (
            title()
          ) : (
            <div class={bem.b('header').e('title').value}>{title}</div>
          )}

          {headerExtra?.()}
        </div>
      </div>
    )
  }
})

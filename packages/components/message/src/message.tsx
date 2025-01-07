import { CreateNamespace } from '@yy-ui/utils'
import { computed, defineComponent, ExtractPropTypes } from 'vue'
import { useTheme, useThemeProps } from '@yy-ui/composables'
import {
  MessageThemeVars,
  messageDark,
  messageLight,
  messageStyle
} from '@yy-ui/theme-chalk'

export const messageProps = {
  ...useThemeProps<MessageThemeVars>()
}

export type MessageProps = ExtractPropTypes<typeof messageProps>

export default defineComponent({
  name: 'Message',
  props: messageProps,
  setup(props) {
    const bem = new CreateNamespace('message')

    const lightVars = messageLight.vars()
    const darkVars = messageDark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars, {}),
        dark: Object.assign({}, darkVars, {})
      }
    })

    const { styleVars } = useTheme(theme, 'message', messageStyle, props)

    return { bem, styleVars }
  },
  render() {
    const { bem, styleVars } = this

    return (
      <div style={styleVars} class={bem.b().value}>
        message
      </div>
    )
  }
})

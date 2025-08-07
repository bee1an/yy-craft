import type { UploadThemeVars } from '@yy-craft/theme-chalk/src/upload'
import type { ExtractPropTypes } from 'vue'
import { useTheme, useThemeProps } from '@yy-craft/composables/use-theme'
import {
  uploadDark,
  uploadLight,
  uploadStyle,
} from '@yy-craft/theme-chalk/src/upload'
import { CreateNamespace } from '@yy-craft/utils'
import { computed, defineComponent } from 'vue'

export const uploadProps = {
  ...useThemeProps<UploadThemeVars>(),
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>

export default defineComponent({
  name: 'upload',
  props: uploadProps,
  setup(props) {
    const bem = new CreateNamespace('upload')

    const lightVars = uploadLight.vars()
    const darkVars = uploadDark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars, {}),
        dark: Object.assign({}, darkVars, {}),
      }
    })

    const { styleVars } = useTheme(theme, 'upload', uploadStyle, props)

    return { bem, styleVars }
  },
  render() {
    const { bem, styleVars } = this

    return <div style={styleVars} class={bem.b().value}></div>
  },
})

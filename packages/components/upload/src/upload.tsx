import type { UploadThemeVars } from '@yy-craft/theme-chalk/src/upload'
import type { ExtractPropTypes, PropType } from 'vue'
import { useTheme, useThemeProps } from '@yy-craft/composables/use-theme'
import {
  uploadDark,
  uploadLight,
  uploadStyle,
} from '@yy-craft/theme-chalk/src/upload'
import { CreateNamespace } from '@yy-craft/utils'
import { computed, defineComponent, ref } from 'vue'

export const uploadProps = {
  ...useThemeProps<UploadThemeVars>(),

  /**
   * 是否支持多选
   */
  multiple: {
    type: Boolean,
    default: false,
  },

  /**
   * 文件选择后的回调
   */
  onChange: {
    type: Function as PropType<(files: FileList, event: Event) => void>,
  },
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>

export default defineComponent({
  name: 'Upload',
  props: uploadProps,
  setup(props, { emit }) {
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

    const inputRef = ref<HTMLInputElement>()

    const triggerFileSelector = () => inputRef.value?.click()

    const fileSelected = (event: Event) => {
      const files = (event.target as any).files

      emit('change', files, event)
    }

    return { bem, styleVars, triggerFileSelector, inputRef, fileSelected }
  },
  render() {
    const { bem, styleVars, triggerFileSelector, fileSelected, $slots, multiple } = this

    return (
      <div style={styleVars} class={bem.b().value}>
        <input type="file" style="display: none" ref="inputRef" onChange={fileSelected} multiple={multiple} />
        <div class={bem.b('trigger').value} onClick={triggerFileSelector}>
          {$slots.default?.()}
        </div>
      </div>
    )
  },
})

import { CreateNamespace } from '@yy-ui/utils'
import {
  computed,
  defineComponent,
  ExtractPropTypes,
  PropType,
  ref,
  Teleport
} from 'vue'
import { useTheme, useThemeProps } from '@yy-ui/composables'
import {
  PopoverThemeVars,
  popoverDark,
  popoverLight,
  popoverStyle
} from '@yy-ui/theme-chalk'
import PopoverHijack from './popover-hijack'

export type PopoverPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end'

export const popoverProps = {
  ...useThemeProps<PopoverThemeVars>(),

  /** 位置 */
  placement: {
    type: String as PropType<PopoverPlacement>
  }
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export default defineComponent({
  name: 'Popover',
  props: popoverProps,
  setup(props) {
    const bem = new CreateNamespace('popover')

    const lightVars = popoverLight.vars()
    const darkVars = popoverDark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars, {}),
        dark: Object.assign({}, darkVars, {})
      }
    })

    const visible = ref(false)

    const triggerHandler = () => {
      console.log('trigger')
      visible.value = !visible.value
    }

    const { styleVars } = useTheme(theme, 'popover', popoverStyle, props)

    return { bem, styleVars, visible, triggerHandler }
  },
  render() {
    const {
      bem,
      styleVars,
      visible,
      triggerHandler,
      $slots: { trigger }
    } = this

    return (
      <>
        <PopoverHijack onTrigger={triggerHandler}>{trigger}</PopoverHijack>
        <Teleport to="body">
          {visible ? (
            <div class={bem.b().value} style={styleVars}></div>
          ) : (
            <></>
          )}
        </Teleport>
      </>
    )
  }
})

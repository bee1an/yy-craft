import { CreateNamespace, px } from '@yy-ui/utils'
import {
  computed,
  defineComponent,
  ExtractPropTypes,
  InjectionKey,
  PropType,
  provide,
  ref,
  Teleport,
  useTemplateRef
} from 'vue'
import { usePlacement, useTheme, useThemeProps } from '@yy-ui/composables'
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
    type: String as PropType<PopoverPlacement>,
    default: 'bottom'
  }
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export const popoverInjectKey = Symbol('PopoverInjectKey') as InjectionKey<{
  setTargetRef: (target: HTMLElement | null) => void
}>

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

    const { styleVars } = useTheme(theme, 'popover', popoverStyle, props)

    const visible = ref(false)

    const triggerHandler = () => {
      visible.value = !visible.value
    }

    const triggerRef = ref<HTMLElement | null>(null)
    const setTargetRef = (target: HTMLElement | null) => {
      triggerRef.value = target
    }

    const contentRef = useTemplateRef<HTMLElement | null>('contentRef')

    const { top, left } = usePlacement(triggerRef, contentRef, props)

    provide(popoverInjectKey, { setTargetRef })
    return { bem, styleVars, visible, triggerHandler, top, left }
  },
  render() {
    const {
      bem,
      styleVars,
      visible,
      triggerHandler,
      top,
      left,
      $slots: { trigger }
    } = this

    const contentStyle = [styleVars, { top: px(top), left: px(left) }]

    return (
      <>
        <PopoverHijack onTrigger={triggerHandler}>{trigger}</PopoverHijack>
        <Teleport to="body">
          {visible ? (
            <div
              class={bem.b().value}
              style={contentStyle}
              ref="contentRef"
            ></div>
          ) : (
            <></>
          )}
        </Teleport>
      </>
    )
  }
})

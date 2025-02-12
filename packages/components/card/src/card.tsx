import { useTheme, useThemeProps } from '@yy-ui/composables/use-theme'
import {
  cardDark,
  cardLight,
  cardStyle,
  type CardThemeVars
} from '@yy-ui/theme-chalk/src/card'
import { CreateNamespace } from '@yy-ui/utils/src/create'
import { createCSSVar } from '@yy-ui/utils/src/css'
import { createKey } from '@yy-ui/utils/src/tools'
import {
  computed,
  defineComponent,
  type ExtractPropTypes,
  type PropType,
  type SlotsType,
  type VNodeChild
} from 'vue'

export const cardProps = {
  ...useThemeProps<CardThemeVars>(),
  /** 标题 */
  title: {
    type: [String, Function] as PropType<string | (() => VNodeChild)>
  },
  /** 卡片尺寸 */
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
    default: 'medium'
  },
  /** 显示边框 */
  bordered: {
    type: Boolean,
    default: true
  },
  /** 可悬浮 */
  hoverable: {
    type: Boolean,
    default: false
  },
  /** 卡片的分段区域设置 */
  segmented: {
    type: [Boolean, Object] as PropType<boolean | CardSegmented>
  }
}

export type CardProps = ExtractPropTypes<typeof cardProps>

export type CardSegmented = {
  [part in 'content' | 'footer' | 'action']?: boolean | 'soft'
}

export type CardSlots = {
  cover: void
  headerExtra: void
  header: void
  default: void
  footer: void
  action: void
}

export default defineComponent({
  name: 'Card',
  props: cardProps,
  slots: Object as SlotsType<CardSlots>,
  setup(props) {
    const bem = new CreateNamespace('card')

    const { styleVars: _styleVars, vars } = useTheme(
      { light: cardLight.vars(), dark: cardDark.vars() },
      'card',
      cardStyle,
      props,
      cardLight.exclude
    )

    const styleVars = computed(() => {
      const paddingKey = createKey('padding', props.size)
      const paddings = vars.value[paddingKey].split(' ')
      const [
        paddingTop = '0',
        paddingRight = '0',
        paddingBottom = paddingTop,
        paddingLeft = paddingRight
      ] = paddings

      const titleFontSizeKey = createKey('titleFontSize', props.size)
      const titleFontSize = vars.value[titleFontSizeKey]

      return {
        ..._styleVars.value,
        [createCSSVar('paddingTop')]: paddingTop,
        [createCSSVar('paddingRight')]: paddingRight,
        [createCSSVar('paddingBottom')]: paddingBottom,
        [createCSSVar('paddingLeft')]: paddingLeft,
        [createCSSVar('titleFontSize')]: titleFontSize
      }
    })

    const classes = computed(() => {
      const baseName = [
        bem.b().value,
        bem.b().m(props.bordered && 'bordered').value,
        bem.b().m(props.hoverable && 'hoverable').value
      ]

      let segmented = props.segmented

      if (segmented) {
        if (typeof segmented === 'boolean') {
          segmented = { content: true, footer: true, action: true }
        }

        const segments = [
          {
            key: 'content',
            softClass: 'content-soft-segmented',
            class: 'content-segmented'
          },
          {
            key: 'footer',
            softClass: 'footer-soft-segmented',
            class: 'footer-segmented'
          },
          { key: 'action', softClass: null, class: 'action-segmented' } // 'action' 没有软分割的逻辑
        ] as const

        segments.forEach(({ key, softClass, class: className }) => {
          if ((segmented as CardSegmented)[key] === 'soft' && softClass) {
            baseName.push(bem.b().m(softClass).value)
          } else if ((segmented as CardSegmented)[key]) {
            baseName.push(bem.b().m(className).value)
          }
        })
      }

      return baseName
    })

    return { bem, styleVars, classes }
  },
  render() {
    const { bem, styleVars, classes, $slots, $props } = this
    const { title } = $props

    const {
      cover: coverSlot,
      header: headerSlot,
      headerExtra: headerExtraSlot,
      default: defaultSlot,
      footer: footerSlot,
      action: actionSlot
    } = $slots

    return (
      <div style={styleVars} class={classes}>
        {coverSlot && <div class={bem.b('cover').value}>{coverSlot()}</div>}

        <div class={bem.b('header').value}>
          {headerSlot ? (
            headerSlot()
          ) : typeof title === 'function' ? (
            title()
          ) : (
            <div class={bem.b('header').e('title').value}>{title}</div>
          )}

          {headerExtraSlot?.()}
        </div>

        {defaultSlot && (
          <div class={bem.b('content').value}>{defaultSlot()}</div>
        )}
        {footerSlot && <div class={bem.b('footer').value}>{footerSlot()}</div>}
        {actionSlot && <div class={bem.b('action').value}>{actionSlot()}</div>}
      </div>
    )
  }
})

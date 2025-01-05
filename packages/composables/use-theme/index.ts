import { createCSSVar } from '@yy-ui/utils'
import {
  ThemeKey,
  ThemeType,
  injectTheme as _injectTheme
} from '@yy-ui/yy-ui/style'
import { CNode } from 'css-render'
import {
  computed,
  ComputedRef,
  ExtractPropTypes,
  inject,
  isRef,
  PropType
} from 'vue'

function useTheme<T extends ThemeType>(
  themes: { light: T; dark: T } | ComputedRef<{ light: T; dark: T }>,
  mountId: string,
  style: CNode,
  props: ExtractPropTypes<ReturnType<typeof useThemeProps>>,
  prefix?: string
): {
  styleVars: ComputedRef<
    {
      [x: string]: string
    }[]
  >
}
function useTheme<T extends ThemeType>(
  themes: T | ComputedRef<T>,
  mountId: string,
  style: CNode,
  props: ExtractPropTypes<ReturnType<typeof useThemeProps>>,
  prefix?: string
): {
  styleVars: ComputedRef<
    {
      [x: string]: string
    }[]
  >
}
function useTheme(
  themes: undefined,
  mountId: string,
  style: CNode,
  props?: ExtractPropTypes<ReturnType<typeof useThemeProps>>,
  prefix?: string
): void

function useTheme<T extends ThemeType>(
  themes:
    | { light: T; dark: T }
    | ComputedRef<{ light: T; dark: T }>
    | T
    | ComputedRef<T>
    | undefined,
  mountId: string,
  style: CNode,
  props?: ExtractPropTypes<ReturnType<typeof useThemeProps>>,
  prefix = 'y'
) {
  style.mount({ id: prefix + '-' + mountId })

  if (typeof themes === 'undefined') {
    return
  }

  const getTheme = (type: ThemeKey) => {
    const themesVal = isRef(themes) ? themes.value : themes

    if ('light' in themesVal || 'dark' in themesVal) {
      return themesVal[type]
    }
    return themesVal
  }

  const ctmVars = computed(() => {
    return Object.entries(props!.themeOverrides || {}).map(([key, value]) => {
      return { [createCSSVar(key, prefix)]: value }
    })
  })

  const injectTheme = inject(_injectTheme, null)

  const theme = computed(() => {
    const themeStr = props?.theme ?? injectTheme?.theme.value ?? 'light'

    return themeStr === 'light' ? getTheme('light') : getTheme('dark')
  })

  const styleVars = computed(() => {
    return [
      ...Object.entries(theme.value).map(([key, value]) => {
        return { [createCSSVar(key, prefix)]: value }
      }),
      ...ctmVars.value
    ]
  })

  return { styleVars }
}

export { useTheme }

/** 生成主题prop */
export const useThemeProps = <T extends ThemeType>() => {
  return {
    theme: { type: String as PropType<ThemeKey> },
    themeOverrides: Object as PropType<T>
  }
}

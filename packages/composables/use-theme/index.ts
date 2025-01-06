import { createCSSVar } from '@yy-ui/utils'
import {
  ThemeKey,
  ThemeVars,
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

function useTheme<T extends ThemeVars>(
  themes: { light: T; dark: T } | ComputedRef<{ light: T; dark: T }>,
  mountId: string,
  style?: CNode,
  props?: ExtractPropTypes<ReturnType<typeof useThemeProps>>,
  exclude?: string[],
  prefix?: string
): {
  styleVars: ComputedRef<{
    [x: string]: string
  }>
  vars: ComputedRef<T>
}
function useTheme<T extends ThemeVars>(
  themes: T | ComputedRef<T>,
  mountId: string,
  style?: CNode,
  props?: ExtractPropTypes<ReturnType<typeof useThemeProps>>,
  exclude?: string[],
  prefix?: string
): {
  styleVars: ComputedRef<{
    [x: string]: string
  }>
  vars: ComputedRef<T>
}
function useTheme(
  themes: undefined,
  mountId: string,
  style?: CNode,
  props?: ExtractPropTypes<ReturnType<typeof useThemeProps>>,
  exclude?: string[],
  prefix?: string
): void

function useTheme<T extends ThemeVars>(
  themes:
    | { light: T; dark: T }
    | ComputedRef<{ light: T; dark: T }>
    | T
    | ComputedRef<T>
    | undefined,
  mountId: string,
  style?: CNode,
  props?: ExtractPropTypes<ReturnType<typeof useThemeProps>>,
  exclude?: string[],
  prefix = 'y'
) {
  style?.mount({ id: prefix + '-' + mountId })

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

  const injectTheme = inject(_injectTheme, null)

  const theme = computed(() => {
    const themeStr = props?.theme ?? injectTheme?.theme.value ?? 'light'

    return themeStr === 'light' ? getTheme('light') : getTheme('dark')
  })

  const vars = computed(() => {
    return Object.assign({}, theme.value, props?.themeOverrides || {})
  })

  const styleVars = computed(() => {
    return Object.entries(vars.value).reduce((acc, [key, value]) => {
      if (exclude?.includes(key)) return acc
      acc[createCSSVar(key, prefix)] = value

      return acc
    }, {} as Record<string, any>)
  })

  return { styleVars, vars }
}

export { useTheme }

/** 生成主题prop */
export const useThemeProps = <T extends ThemeVars>() => {
  return {
    theme: { type: String as PropType<ThemeKey> },
    themeOverrides: Object as PropType<T>
  }
}

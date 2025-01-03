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
  PropType,
  reactive,
  Ref
} from 'vue'

// TODO: refactor
function useTheme<T extends ThemeType>(
  themes: { light?: T; dark: T } | { light: T; dark?: T },
  style: CNode,
  props: ExtractPropTypes<ReturnType<typeof useThemeProps>>,
  prefix?: string
): {
  styleVars: ComputedRef<
    {
      [x: string]: string
    }[]
  >
  vars: T['vars']
  injectTheme: {
    theme: Ref<ThemeKey>
  } | null
}
function useTheme(
  themes: string,
  style: CNode,
  props?: ExtractPropTypes<ReturnType<typeof useThemeProps>>,
  prefix?: string
): void

function useTheme(
  themes:
    | { light?: ThemeType; dark: ThemeType }
    | { light: ThemeType; dark?: ThemeType }
    | string,
  style: CNode,
  props?: ExtractPropTypes<ReturnType<typeof useThemeProps>>,
  prefix = 'y'
) {
  if (typeof themes !== 'string') {
    themes = reactive(themes)
    style.mount({ id: prefix + '-' + (themes.light || themes.dark)!.name })
  } else {
    style.mount({ id: prefix + '-' + themes })
    return undefined
  }

  const ctmVars = computed(() => {
    return Object.entries(props!.themeOverrides || {}).map(([key, value]) => {
      return { [createCSSVar(key, prefix)]: value }
    })
  })

  const injectTheme = inject(_injectTheme, null)

  const theme = computed(() => {
    if (ctmVars.value.length) {
      return themes.light
    }

    return injectTheme?.theme.value !== 'dark' ? themes.light : themes.dark
  })

  const vars = { ...theme.value!.vars }

  const styleVars = computed(() => {
    return [
      ...Object.entries(vars).map(([key, value]) => {
        return { [createCSSVar(key, prefix)]: value }
      }),
      ...ctmVars.value
    ]
  })

  return { styleVars, vars, injectTheme }
}

export { useTheme }

export const useThemeProps = <T extends ThemeType['vars']>() => {
  return { themeOverrides: Object as PropType<T> }
}

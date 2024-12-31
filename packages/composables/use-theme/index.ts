import { createCSSVar } from '@yy-ui/utils'
import { ThemeConfig, injectTheme as _injectTheme } from '@yy-ui/yy-ui'
import { CNode } from 'css-render'
import { computed, ExtractPropTypes, inject, PropType } from 'vue'

export const useTheme = (
  themes: { light: ThemeConfig; dark: ThemeConfig },
  style: CNode,
  props: ExtractPropTypes<ReturnType<typeof useThemeProps>> = {},
  prefix = 'y'
) => {
  style.mount({ id: prefix + '-' + themes.light.name })

  const ctmVars = computed(() => {
    return Object.entries(props.themeOverrides || {}).map(([key, value]) => {
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

  const styleVars = computed(() => {
    return Object.entries(theme.value.vars).map(([key, value]) => {
      return { [createCSSVar(key, prefix)]: value }
    })
  })

  const vars = computed(() => {
    return [...ctmVars.value, ...styleVars.value]
  })

  return vars
}

export const useThemeProps = <T extends ThemeConfig['vars']>() => {
  return { themeOverrides: Object as PropType<T> }
}

import type { CNode } from 'css-render'
import { providerKey } from '@yy-ui/constants'
import { type ThemeKey, type ThemeVars } from '@yy-ui/theme-chalk/src/common'
import { createCSSVar } from '@yy-ui/utils/src/css'
import {
	computed,
	type ComputedRef,
	type ExtractPropTypes,
	inject,
	type PropType,
	unref
} from 'vue'

/**
 * @description 主题注入
 */

function useTheme<T extends ThemeVars>(
	/** 双主题, 支持响应式数据 */
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
	/** 单主题, 支持响应式数据 */
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
	/** 没有主题, 只挂载样式 */
	mountId: string,
	style: CNode
): void
function useTheme<T extends ThemeVars>(
	themes: { light: T; dark: T } | ComputedRef<{ light: T; dark: T }> | T | ComputedRef<T> | string,
	mountId: string | CNode,
	style?: CNode,
	props?: ExtractPropTypes<ReturnType<typeof useThemeProps>>,
	exclude?: string[],
	prefix = 'y'
) {
	if (typeof themes === 'string' && typeof mountId !== 'string') {
		mountId.mount({ id: prefix + '-' + themes })
		return
	}

	style?.mount({ id: prefix + '-' + mountId })

	const getTheme = (type: ThemeKey) => {
		const themesVal = unref(themes) as T

		if ('light' in themesVal || 'dark' in themesVal) {
			return themesVal[type]
		}
		return themesVal
	}

	const injectTheme = inject(providerKey, null)

	const theme = computed(() => {
		const themeStr = props?.theme ?? injectTheme?.theme ?? 'light' // props优先

		return themeStr === 'light' ? getTheme('light') : getTheme('dark')
	})

	const vars = computed(() => {
		return Object.assign({}, theme.value, props?.themeOverrides || {}) // props优先
	})

	const styleVars = computed(() => {
		return Object.entries(vars.value).reduce(
			(acc, [key, value]) => {
				if (exclude?.includes(key)) return acc
				acc[createCSSVar(key, prefix)] = value

				return acc
			},
			{} as Record<string, any>
		)
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

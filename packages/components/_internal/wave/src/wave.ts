import type { WaveThemeVars } from '@yy-craft/theme-chalk/src/wave'
import type { ExtractPropTypes } from 'vue'
import { useThemeProps } from '@yy-craft/composables/use-theme'

export const waveProps = {
	...useThemeProps<WaveThemeVars>()
}

export type WaveProps = ExtractPropTypes<typeof waveProps>

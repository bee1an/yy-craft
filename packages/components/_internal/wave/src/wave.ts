import { useThemeProps } from '@yy-ui/composables/use-theme'
import type { WaveThemeVars } from '@yy-ui/theme-chalk/src/wave'
import type { ExtractPropTypes } from 'vue'

export const waveProps = {
  ...useThemeProps<WaveThemeVars>()
}

export type WaveProps = ExtractPropTypes<typeof waveProps>

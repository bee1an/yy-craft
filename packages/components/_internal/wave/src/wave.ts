import { useThemeProps } from '@yy-ui/composables'
import { WaveThemeVars } from '@yy-ui/theme-chalk'
import { ExtractPropTypes } from 'vue'

export const waveProps = {
  ...useThemeProps<WaveThemeVars>(),
  animationDuration: {
    type: String
  },
  animationName: {
    type: String
  }
}

export type WaveProps = ExtractPropTypes<typeof waveProps>

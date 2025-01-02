import { useThemeProps } from '@yy-ui/composables'
import { WaveTheme } from './style/index.cssr'
import { ExtractPropTypes } from 'vue'

export const waveProps = {
  ...useThemeProps<WaveTheme['vars']>(),
  animationDuration: {
    type: String
  },
  animationName: {
    type: String
  }
}

export type WaveProps = ExtractPropTypes<typeof waveProps>

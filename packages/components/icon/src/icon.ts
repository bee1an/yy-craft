import type { ExtractPropTypes } from 'vue'

export const iconProps = {
  color: String,
  size: [String, Number],
}

export type IconProps = ExtractPropTypes<typeof iconProps>

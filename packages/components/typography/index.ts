import { withInstall } from '@yy-ui/utils'
import P from './src/p'
import Text from './src/text'

const pWithIntall = withInstall(P)
const textWithIntall = withInstall(Text)

export * from './src/p'
export * from './src/text'
export { pWithIntall, P, textWithIntall, Text }

declare module 'vue' {
  export interface GlobalComponents {
    YyP: typeof P
    YyText: typeof Text
  }
}

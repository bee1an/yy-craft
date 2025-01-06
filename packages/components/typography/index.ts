import { withInstall } from '@yy-ui/utils'
import P from './src/p'
import Text from './src/text'

const pWithIntall = withInstall(P)
const textWithIntall = withInstall(Text)

export { pWithIntall, P, textWithIntall, Text }

declare module 'vue' {
  export interface GlobalComponents {
    YyP: typeof P
    TyText: typeof Text
  }
}

import { withInstall } from '@yy-ui/utils'
import A from './src/a'
import P from './src/p'
import Text from './src/text'

const aWithIntall = withInstall(A)
const pWithIntall = withInstall(P)
const textWithIntall = withInstall(Text)

export * from './src/p'
export * from './src/text'
export { aWithIntall, A, pWithIntall, P, textWithIntall, Text }

declare module 'vue' {
  export interface GlobalComponents {
    YyA: typeof A
    YyP: typeof P
    YyText: typeof Text
  }
}

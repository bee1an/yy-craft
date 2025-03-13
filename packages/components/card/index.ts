import { withInstall } from '@yy-ui/utils/src/with-install'
import Card from './src/card'

const cardWithInstall = withInstall(Card)
export * from './src/card'
export { cardWithInstall, Card }
export default Card

declare module 'vue' {
  export interface GlobalComponents {
    YyCard: typeof Card
  }
}

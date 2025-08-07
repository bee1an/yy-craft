import { withInstall } from '@yy-craft/utils/src/with-install'
import Card from './src/card'

const cardWithInstall = withInstall(Card)
export * from './src/card'
export { Card, cardWithInstall }
export default Card

declare module 'vue' {
  export interface GlobalComponents {
    YyCard: typeof Card
  }
}

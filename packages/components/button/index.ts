import { withInstall } from '@yy-ui/utils'
import Button from './src/button.vue'

const buttonWithInstall = withInstall(Button)

export { buttonWithInstall, Button }
export default Button

declare module 'vue' {
  export interface GlobalComponents {
    YyButton: typeof Button
  }
}

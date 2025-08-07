import { withInstall } from '@yy-craft/utils/src/with-install'
import Button from './src/button.vue'

const buttonWithInstall = withInstall(Button)

export * from './src/button'
export { Button, buttonWithInstall }
export default Button

declare module 'vue' {
  export interface GlobalComponents {
    YyButton: typeof Button
  }
}

import { withInstall } from '@yy-craft/utils/src/with-install'
import Checkbox from './src/checkbox.vue'

const checkboxWithInstall = withInstall(Checkbox)

export * from './src/checkbox'
export { Checkbox, checkboxWithInstall }
export default Checkbox

declare module 'vue' {
  export interface GlobalComponents {
    YyCheckbox: typeof Checkbox
  }
}

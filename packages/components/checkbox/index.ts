import { withInstall } from '@yy-ui/utils'
import Checkbox from './src/checkbox.vue'

const checkboxWithInstall = withInstall(Checkbox)

export { checkboxWithInstall, Checkbox }
export default Checkbox

declare module 'vue' {
  export interface GlobalComponents {
    YyCheckbox: typeof Checkbox
  }
}

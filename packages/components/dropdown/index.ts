import { withInstall } from '@yy-ui/utils'
import Dropdown from './src/dropdown'

const dropdownWithInstall = withInstall(Dropdown)
export * from './src/dropdown'
export { dropdownWithInstall, Dropdown }
export default Dropdown

declare module 'vue' {
  export interface GlobalComponents {
    YyDropdown: typeof Dropdown
  }
}

import { withInstall } from '@yy-ui/utils/src/with-install'
import Menu from './src/menu'

const menuWithInstall = withInstall(Menu)
export * from './src/menu'
export { menuWithInstall, Menu }
export default Menu

declare module 'vue' {
  export interface GlobalComponents {
    YyMenu: typeof Menu
  }
}

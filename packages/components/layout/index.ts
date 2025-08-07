import { withInstall } from '@yy-craft/utils/src/with-install'
import Layout from './src/layout'
import LayoutContent from './src/layout-content'
import LayoutFooter from './src/layout-footer'
import LayoutHeader from './src/layout-header'
import LayoutSider from './src/layout-sider'

const layoutWithInstall = withInstall(Layout)
const layoutSiderWithInstall = withInstall(LayoutSider)
const layoutHeaderWithInstall = withInstall(LayoutHeader)
const layoutContentWithInstall = withInstall(LayoutContent)
const layoutFooterWithInstall = withInstall(LayoutFooter)
export * from './src/layout'
export {
  Layout,
  LayoutContent,
  layoutContentWithInstall,
  LayoutFooter,
  layoutFooterWithInstall,
  LayoutHeader,
  layoutHeaderWithInstall,
  LayoutSider,
  layoutSiderWithInstall,
  layoutWithInstall,
}
export default Layout

declare module 'vue' {
  export interface GlobalComponents {
    YyLayout: typeof Layout
    YyLayoutSider: typeof LayoutSider
    YyLayoutHeader: typeof LayoutHeader
    YyLayoutContent: typeof LayoutContent
    YyLayoutFooter: typeof LayoutFooter
  }
}

import { withInstall } from '@yy-ui/utils/src/with-install'
import Layout from './src/layout'
import LayoutSider from './src/layout-sider'
import LayoutHeader from './src/layout-header'
import LayoutContent from './src/layout-content'
import LayoutFooter from './src/layout-footer'

const layoutWithInstall = withInstall(Layout)
const layoutSiderWithInstall = withInstall(LayoutSider)
const layoutHeaderWithInstall = withInstall(LayoutHeader)
const layoutContentWithInstall = withInstall(LayoutContent)
const layoutFooterWithInstall = withInstall(LayoutFooter)
export * from './src/layout'
export {
  layoutWithInstall,
  Layout,
  layoutSiderWithInstall,
  LayoutSider,
  layoutHeaderWithInstall,
  LayoutHeader,
  layoutContentWithInstall,
  LayoutContent,
  layoutFooterWithInstall,
  LayoutFooter
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

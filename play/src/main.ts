import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@yy-ui/components/icon'
import Tree from '@yy-ui/components/tree'
import VirtualList from '@yy-ui/components/virtual-list'

// 全局引入样式
import '@yy-ui/theme-chalk/src/index.scss'

const app = createApp(App)

// 全局引入组件
const plugins = [Icon, Tree, VirtualList]
plugins.forEach(plugin => app.use(plugin))

app.mount('#app')

import { createApp } from 'vue'
import YyCraft from 'yy-craft'

import App from './App.vue'

import plugin from './plugins'
import router from './router'

import 'virtual:uno.css'

const app = createApp(App)

app.use(YyCraft).use(plugin).use(router).mount('#app')

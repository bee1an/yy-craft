import DefaultTheme from 'vitepress/theme'
import Icon from '@yy-ui/components/icon'
import '@yy-ui/theme-chalk/src/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(Icon)
  }
}

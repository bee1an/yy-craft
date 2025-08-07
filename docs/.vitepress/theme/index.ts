import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, defineComponent, h, toValue } from 'vue'
import Craft, { ConfigProvider } from 'yy-craft'
import './styles.css'

const CustomLayout = defineComponent({
  setup() {
    const { isDark } = useData()
    const theme = computed(() => (isDark.value ? 'dark' : 'light'))
    return { theme }
  },
  render() {
    return h(ConfigProvider, { theme: toValue(this.theme) }, () =>
      h(DefaultTheme.Layout))
  },
})

export default {
  Layout: CustomLayout,
  enhanceApp({ app }) {
    if (!(import.meta as any).env.SSR)
      app.use(Craft)
  },
}

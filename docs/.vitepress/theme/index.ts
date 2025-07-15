import YyUi, { ConfigProvider } from '@yyui/yy-ui'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, defineComponent, h, toValue } from 'vue'
import './styles.css'

const CustomLayout = defineComponent({
	setup() {
		const { isDark } = useData()
		const theme = computed(() => (isDark.value ? 'dark' : 'light'))
		return { theme }
	},
	render() {
		return h(ConfigProvider, { theme: toValue(this.theme) }, () => h(DefaultTheme.Layout))
	}
})

export default {
	...DefaultTheme,
	Layout: CustomLayout,
	enhanceApp({ app }) {
		app.use(YyUi)
	}
}

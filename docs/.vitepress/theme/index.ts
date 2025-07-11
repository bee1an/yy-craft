import DefaultTheme from 'vitepress/theme'
import YyUi from '@yyui/yy-ui'
import './styles.css'

export default {
	...DefaultTheme,
	enhanceApp({ app }) {
		app.use(YyUi)
	}
}

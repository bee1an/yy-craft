import YyUi from '@yyui/yy-ui'
import DefaultTheme from 'vitepress/theme'
import './styles.css'

export default {
	...DefaultTheme,
	enhanceApp({ app }) {
		app.use(YyUi)
	}
}

import DefaultTheme from 'vitepress/theme'
import Icon from '@yy-ui/components/icon'
import './styles.css'

export default {
	...DefaultTheme,
	enhanceApp({ app }) {
		app.use(Icon)
	}
}

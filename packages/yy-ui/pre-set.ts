import * as components from './components'
import * as directives from './directives'

import create from './create'

export default create({
	pluginMakers: [
		...Object.keys(components).map((key) => components[key as keyof typeof components]),
		...Object.keys(directives).map((key) => directives[key as keyof typeof directives])
	]
})

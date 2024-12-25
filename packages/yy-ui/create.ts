import { App } from 'vue'
import * as components from './components'

function create({
  componentPrefix = 'yy-',
  pluginMakers
}: {
  componentPrefix?: string
  pluginMakers?: any[]
} = {}) {
  function install(app: App) {
    if (!pluginMakers) {
      pluginMakers = Object.keys(components).map(
        key => components[key as keyof typeof components]
      )
    }

    pluginMakers.forEach(pluginMaker => {
      if (typeof pluginMaker === 'function') {
        const plugin = pluginMaker(componentPrefix)

        'install' in plugin && app.use(plugin)
      }
    })
  }

  return { install }
}

export { create }
export default create()

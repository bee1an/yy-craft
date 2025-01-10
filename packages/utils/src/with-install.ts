import type { App, Component, DefineComponent } from 'vue'

export function withInstall<T extends Component | DefineComponent>(
  component: T
) {
  function installFunciton(componentPrefix: string) {
    return {
      install(app: App) {
        const { name } = component
        const { alias } = component as { alias?: string[] }

        if (!name) {
          // 组件必须注册名称
          throw new Error(`Component must have a name`)
        }

        app.component(componentPrefix + name, component)
        alias?.forEach(aliasName => {
          app.component(componentPrefix + aliasName, component)
        })
      }
    }
  }

  installFunciton.useInstall = true

  return installFunciton
}

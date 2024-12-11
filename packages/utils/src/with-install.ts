import type { App, Component, DefineComponent } from 'vue'

export function withInstall<T extends Component | DefineComponent>(
  component: T
) {
  const withInstallObj = {
    install(app: App) {
      const { name } = component

      if (!name) {
        // 组件必须注册名称
        throw new Error(`Component must have a name`)
      }

      app.component(name, component)
    }
  }

  return withInstallObj
}

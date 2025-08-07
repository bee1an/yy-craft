import type { App } from 'vue'
import { useMessage } from './src/use-message'

export * from './src/message'

export * from './src/use-message'

export function messageWithInstall() {
  return {
    install: (app: App) => {
      useMessage._context = app._context
    },
  }
}
messageWithInstall.useInstall = true
export { useMessage }

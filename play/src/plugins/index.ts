import type { App } from 'vue'

import { texts } from './texts'

export * from './texts'

export default {
  install(app: App) {
    app.use(texts)
  },
}

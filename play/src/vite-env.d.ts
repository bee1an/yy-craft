/// <reference types="vite/client" />
import type { textArr } from './plugins'

export {}
declare module 'vue' {
  interface ComponentCustomProperties {
    $t: typeof textArr
    $rt: () => (typeof textArr)[number]
  }
}

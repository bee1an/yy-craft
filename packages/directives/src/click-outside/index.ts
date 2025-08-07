import { directiveWithInstall } from '@yy-craft/utils/src/with-install'
import { clickOutside } from './click-outside'

const clickOutsideWithInstall = directiveWithInstall(
  clickOutside,
  'clickOutside',
)

export * from './click-outside'
export { clickOutside, clickOutsideWithInstall }

declare module 'vue' {
  export interface GlobalDirectives {
    vClickOutside: typeof clickOutside
  }
}

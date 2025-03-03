import { directiveWithInstall } from '@yy-ui/utils/src/with-install'
import { clickOutside } from './click-outside'

const clickOutsideWithInstall = directiveWithInstall(
  clickOutside,
  'clickOutside'
)

export * from './click-outside'
export { clickOutsideWithInstall, clickOutside }

declare module 'vue' {
  export interface GlobalDirectives {
    vClickOutside: typeof clickOutside
  }
}

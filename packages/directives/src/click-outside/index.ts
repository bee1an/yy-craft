import { directiveWithInstall } from '@yy-ui/utils'
import { clickOutside } from './click-outside'

const clickOutsideWithInstall = directiveWithInstall(
  clickOutside,
  'clickOutside'
)

export * from './click-outside'
export { clickOutsideWithInstall, clickOutside }

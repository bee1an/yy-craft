import { directiveWithInstall } from '@yy-ui/utils'
import { zindexable } from './zindexable'

const zindexableWithInstall = directiveWithInstall(zindexable, 'zindexable')

export * from './zindexable'
export { zindexableWithInstall, zindexable }

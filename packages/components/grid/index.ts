import { withInstall } from '@yy-craft/utils/src/with-install'
import Grid from './src/grid'
import GridItem from './src/grid-item'

const gridWithInstall = withInstall(Grid)
const gridItemWithInstall = withInstall(GridItem)
export * from './src/grid'
export * from './src/grid-item'
export { gridWithInstall, Grid, gridItemWithInstall, GridItem }
export default Grid

declare module 'vue' {
	export interface GlobalComponents {
		YyGrid: typeof Grid
		YyGridItem: typeof GridItem
		YyGi: typeof GridItem
	}
}

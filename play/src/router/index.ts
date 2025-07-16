import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import ButtonView from '../components/button-view.vue'
import CardView from '../components/card-view.vue'
import CheckboxView from '../components/checkbox-view.vue'
import DividerView from '../components/divider-view.vue'
import DropdownView from '../components/dropdown-view.vue'
import FlexView from '../components/flex-view.vue'
import GridView from '../components/grid-view.vue'
import IconView from '../components/icon-view.vue'
import LayoutView from '../components/layout-view.vue'
import MenuView from '../components/menu-view.vue'
import MessageView from '../components/message-view.vue'
import PopoverView from '../components/popover-view.vue'
import ScrollbarView from '../components/scrollbar-view.vue'
import TreeView from '../components/tree-view.vue'
import TypographyView from '../components/typography-view.vue'
import VirtualListView from '../components/virtual-list-view.vue'
import ComponentsView from '../views/components-view/components.vue'
import HomeView from '../views/home-view/home-view.vue'
import playGround from '../views/play-ground.vue'

export const components: RouteRecordRaw[] = [
	{
		path: 'button',
		name: 'button',
		meta: {
			sider: '按钮'
		},
		component: ButtonView
	},
	{
		path: 'card',
		name: 'card',
		meta: {
			sider: '卡片'
		},
		component: CardView
	},
	{
		path: 'checkbox',
		name: 'checkbox',
		meta: {
			sider: '复选框'
		},
		component: CheckboxView
	},
	{
		path: 'divider',
		name: 'divider',
		meta: {
			sider: '分割线'
		},
		component: DividerView
	},
	{
		path: 'dropdown',
		name: 'dropdown',
		meta: {
			sider: '下拉菜单'
		},
		component: DropdownView
	},
	{
		path: 'flex',
		name: 'flex',
		meta: {
			sider: '弹性布局'
		},
		component: FlexView
	},
	{
		path: 'grid',
		name: 'grid',
		meta: {
			sider: '网格布局'
		},
		component: GridView
	},
	{
		path: 'icon',
		name: 'icon',
		meta: {
			sider: '图标'
		},
		component: IconView
	},
	{
		path: 'layout',
		name: 'layout',
		meta: {
			sider: '布局'
		},
		component: LayoutView
	},
	{
		path: 'menu',
		name: 'menu',
		meta: {
			sider: '菜单'
		},
		component: MenuView
	},
	{
		path: 'message',
		name: 'message',
		meta: {
			sider: '消息提示'
		},
		component: MessageView
	},
	{
		path: 'popover',
		name: 'popover',
		meta: {
			sider: '弹出框'
		},
		component: PopoverView
	},
	{
		path: 'scrollbar',
		name: 'scrollbar',
		meta: {
			sider: '滚动条'
		},
		component: ScrollbarView
	},
	{
		path: 'tree',
		name: 'tree',
		meta: {
			sider: '树形控件'
		},
		component: TreeView
	},
	{
		path: 'typography',
		name: 'typography',
		meta: {
			sider: '文字排版'
		},
		component: TypographyView
	},
	{
		path: 'virtualList',
		name: 'virtualList',
		meta: {
			sider: '虚拟列表'
		},
		component: VirtualListView
	}
]

const routes: Readonly<RouteRecordRaw[]> = [
	{
		path: '/',
		name: 'home',
		redirect: '/playground'
	},
	{
		path: '/components',
		redirect: '/components/button',
		component: HomeView,
		children: [
			{
				path: '',
				name: '',
				redirect: '/components/button',
				component: ComponentsView,
				children: components
			}
		]
	},
	{
		path: '/playground',
		component: playGround
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router

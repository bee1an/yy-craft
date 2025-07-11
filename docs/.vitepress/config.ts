import { defineConfig } from 'vitepress'

export default defineConfig({
	title: 'Yy Ui',
	description: 'vue3组件库',
	themeConfig: {
		logo: { src: '/yy-ui-logo.svg', width: 24, height: 24 },
		nav: [{ text: '组件', link: '/components/icon', activeMatch: '/components/' }],
		sidebar: [
			{
				text: '基础组件',
				items: [
					{
						text: 'Icon',
						link: '/components/icon'
					}
				]
			}
		],
		socialLinks: [{ icon: 'github', link: 'https://github.com/bee1an/yy-ui' }],
		outline: {
			label: '页面导航'
		},
		langMenuLabel: '多语言',
		returnToTopLabel: '回到顶部',
		sidebarMenuLabel: '菜单',
		darkModeSwitchLabel: '主题',
		lightModeSwitchTitle: '切换到浅色模式',
		darkModeSwitchTitle: '切换到深色模式'
	},
	head: [
		['link', { rel: 'icon', type: 'image/svg+xml', href: '/yy-ui-logo.svg' }],
		['meta', { name: 'theme-color', content: '#5f67ee' }],
		['meta', { property: 'og:site_name', content: 'VitePress' }]
	]
})

import { defineConfig } from 'vitepress'

export default defineConfig({
	title: 'Yy Ui',
	description: 'vue3组件库',
	themeConfig: {
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
		]
	}
})

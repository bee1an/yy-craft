// .vitepress/config.js
export default {
	// 站点级选项
	title: 'yy-ui',
	description: 'yy-ui',

	themeConfig: {
		// 主题级选项
		lastUpdated: '2024-12-9',
		docsDIr: 'docs',
		editLinks: true,
		editLinkText: '编辑此页',
		nav: [{ text: '组件', link: '/components/icon', activeMatch: '/components/' }],
		sidebar: {
			'/components/': [
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
	}
}

import path from 'node:path'
import fg from 'fast-glob'
import { defineConfig } from 'vitepress'
import { capitalize } from 'vue'

const targetDirs = ['components']

const docsPath = new URL('..', import.meta.url).pathname

const targetPaths = targetDirs.map((dir) => ({ [`/${dir}`]: path.resolve(docsPath, dir) }))

const sidebar = targetPaths.reduce(
	(acc, cur) => {
		for (const key in cur) {
			const sidebarItem: { text: string; link: string }[] = []

			const components = fg.sync('*', { cwd: cur[key], onlyFiles: false })

			components.forEach((component) => {
				const isFile = component.endsWith('.md')

				if (isFile)
					sidebarItem.push({
						text: capitalize(component.replace('.md', '')),
						link: `${key}/${component}`
					})
				else sidebarItem.push({ text: capitalize(component), link: `${key}/${component}/index.md` })
			})

			acc[key] = sidebarItem
		}

		return acc
	},
	{} as {
		[x: string]: { text: string; link: string }[]
	}
)

const nav = targetDirs.map((dir) => ({
	text: capitalize(dir),
	link: sidebar[`/${dir}`][0].link,
	activeMatch: `/${dir}/`
}))

export default defineConfig({
	title: 'Yy Ui',
	description: 'vue3组件库',
	themeConfig: {
		logo: { src: '/yy-ui-logo.svg', width: 24, height: 24 },
		nav,
		sidebar,
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
	head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/yy-ui-logo.svg' }]]
})

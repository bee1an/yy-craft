<script setup lang="ts">
import { useMessage } from '@yy-craft/components'

const { message } = useMessage()
</script>

<template>
	<div class="container_padding">
		<yy-h1 prefix align-text>布局</yy-h1>
		<yy-p
			>这个组件写的我<yy-text delete type="error">很烦</yy-text
			><yy-text type="success">很不烦</yy-text>, 它确实让页面好看了一点...?</yy-p
		>
		<yy-flex vertical>
			<yy-card title="基础布局">
				<yy-flex vertical size="large">
					<yy-layout>
						<yy-layout-header class="gray02 p24">{{ $rt() }}</yy-layout-header>
						<yy-layout has-sider>
							<yy-layout-sider content-class="h100p center" class="gray03" width="50"
								>sider</yy-layout-sider
							>
							<yy-layout-content class="gray04 p24">{{ $rt() }} </yy-layout-content>
						</yy-layout>
						<yy-layout-footer class="gray02 p24">{{ $rt() }}</yy-layout-footer>
					</yy-layout>

					<yy-layout has-sider>
						<yy-layout-sider content-class="h100p center" class="gray03" width="50"
							>sider</yy-layout-sider
						>
						<yy-layout>
							<yy-layout-header class="gray02 p24">{{ $rt() }}</yy-layout-header>
							<yy-layout-content class="gray04 p24">{{ $rt() }}</yy-layout-content>
							<yy-layout-footer class="gray02 p24">{{ $rt() }}</yy-layout-footer>
						</yy-layout>
					</yy-layout>

					<yy-p>使用了<yy-text code>scrollbar</yy-text>组件作为滚动条</yy-p>

					<yy-layout>
						<yy-layout-header class="gray02 p24">{{ $rt() }}</yy-layout-header>
						<yy-layout has-sider>
							<yy-layout-sider
								content-class="h100p f_column flex a_center"
								class="gray03"
								width="80"
								style="height: 360px"
							>
								<div v-for="item in 20" :key="item" class="p5">sider</div>
							</yy-layout-sider>
							<yy-layout-content class="gray04" style="height: 360px">
								<div v-for="item in 20" :key="item" class="p5">content</div>
							</yy-layout-content>
						</yy-layout>
						<yy-layout-footer class="gray02 p24">{{ $rt() }}</yy-layout-footer>
					</yy-layout>
				</yy-flex>
			</yy-card>

			<yy-card title="设置边框">
				<yy-p>sider header,footer可以设置边框 <yy-text code>bordered</yy-text></yy-p>

				<yy-layout has-sider>
					<yy-layout-sider bordered content-class="h100p center" width="50">sider</yy-layout-sider>
					<yy-layout>
						<yy-layout-header bordered class="p24">{{ $rt() }}</yy-layout-header>
						<yy-layout-content class="p24">{{ $rt() }}</yy-layout-content>
						<yy-layout-footer bordered class="p24">{{ $rt() }}</yy-layout-footer>
					</yy-layout>
				</yy-layout>
			</yy-card>

			<yy-card title="收起侧边栏">
				<yy-p
					>通过传入<yy-text code>width</yy-text>和<yy-text code>collapsed-width</yy-text
					>决定收起和展开的宽度</yy-p
				>

				<yy-layout has-sider>
					<yy-layout-sider
						bordered
						width="100"
						collapsed-width="50"
						content-class="h100p"
						@before-collapse="message('执行收起侧边栏')"
						@collapsed="message('收起侧边栏')"
						@before-expand="message('执行展开侧边栏')"
						@expanded="message('展开侧边栏')"
					>
						<div class="center bbox h100p p24">这里可以收缩起来</div>
					</yy-layout-sider>
					<yy-layout-content>
						<div class="p24">{{ $rt() }}</div>
						<div class="p24">{{ $rt() }}</div>
						<div class="p24">{{ $rt() }}</div>
					</yy-layout-content>
				</yy-layout>
			</yy-card>

			<yy-card title="侧边栏收起时隐藏内容">
				<yy-p
					>通过传入<yy-text code>show-collapsed-content</yy-text>为<yy-text code>false</yy-text
					>隐藏收起后的内容</yy-p
				>

				<yy-layout has-sider>
					<yy-layout-sider
						bordered
						width="100"
						collapsed-width="50"
						content-class="h100p"
						:show-collapsed-content="false"
					>
						<div class="center bbox h100p p24">这里可以收缩起来</div>
					</yy-layout-sider>
					<yy-layout-content>
						<div class="p24">{{ $rt() }}</div>
						<div class="p24">{{ $rt() }}</div>
						<div class="p24">{{ $rt() }}</div>
					</yy-layout-content>
				</yy-layout>
			</yy-card>

			<yy-card title="侧边栏默认展开状态">
				<yy-p>传入<yy-text code>collapsed</yy-text>设置默认收起状态</yy-p>

				<yy-layout has-sider>
					<yy-layout-sider
						bordered
						width="100"
						collapsed-width="50"
						content-class="h100p"
						collapsed
					>
						<div class="center bbox h100p p24">点击展开我</div>
					</yy-layout-sider>
					<yy-layout-content>
						<div class="p24">{{ $rt() }}</div>
						<div class="p24">{{ $rt() }}</div>
						<div class="p24">{{ $rt() }}</div>
					</yy-layout-content>
				</yy-layout>
			</yy-card>
		</yy-flex>
	</div>
</template>

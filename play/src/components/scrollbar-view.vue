<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { Scrollbar as YyScrollbar } from '@yyui/yy-ui'
import { t } from '../plugins'

const scrollbarRef = ref<InstanceType<typeof YyScrollbar>>()

const scrollBy = () => {
	scrollbarRef.value!.scrollBy(0, 10)
}
const scrollTo = () => {
	scrollbarRef.value!.scrollTo({
		top: 10,
		behavior: 'smooth'
	})
}

const texts = inject(t)!

const list = Array.from({ length: 30 }, () => texts[Math.floor(Math.random() * texts.length)])

const maxList = reactive(Array.from(list))
</script>

<template>
	<div class="container_padding">
		<yy-h1 prefix align-text>滚动条</yy-h1>
		<yy-grid cols="2" :gap="10">
			<yy-flex vertical>
				<yy-card title="基础用法">
					<yy-p>会自动识别父元素的高度生成滚动条</yy-p>
					<div class="container">
						<yy-scrollbar>
							<div class="vertical">
								<div v-for="text in list" :key="text">
									{{ text }}
								</div>
							</div>
						</yy-scrollbar>
					</div>
				</yy-card>

				<yy-card title="横向滚动条">
					<yy-p>记得按住shift哦</yy-p>

					<div class="container2">
						<yy-scrollbar>
							<div class="horizontal">
								<div v-for="text in list" :key="text">
									{{ text }}
								</div>
							</div>
						</yy-scrollbar>
					</div>
				</yy-card>

				<yy-card title="最大高(宽)度">
					<yy-flex vertical>
						<yy-flex>
							<yy-button @click="maxList.splice(1, maxList.length - 1)">减少内容</yy-button>
							<yy-button @click="maxList.splice(0, maxList.length, ...list)">还原内容</yy-button>
						</yy-flex>

						<div class="container3">
							<yy-scrollbar>
								<div class="vertical">
									<div v-for="text in maxList" :key="text">
										{{ text }}
									</div>
								</div>
							</yy-scrollbar>
						</div>
					</yy-flex>
				</yy-card>
			</yy-flex>

			<yy-flex vertical>
				<yy-card title="使用内部滚动方法">
					<yy-p>
						原生的<yy-text code>scrollBy</yy-text>或者
						<yy-text code>scrollBy</yy-text>
					</yy-p>

					<yy-flex vertical>
						<yy-flex>
							<yy-button @click="scrollBy">滚动+10</yy-button>
							<yy-button @click="scrollTo">平滑滚动到10</yy-button>
						</yy-flex>
						<div class="container">
							<yy-scrollbar ref="scrollbarRef">
								<div class="vertical">
									<div v-for="text in list" :key="text">
										{{ text }}
									</div>
								</div>
							</yy-scrollbar>
						</div>
					</yy-flex>
				</yy-card>

				<yy-card title="滚动条显示方式">
					<yy-p
						>默认为hover显示, <yy-text code>trigger</yy-text>为<yy-text code>none</yy-text
						>时长显</yy-p
					>
					<div class="container">
						<yy-scrollbar trigger="none">
							<div class="vertical">
								<div v-for="text in list" :key="text">
									{{ text }}
								</div>
							</div>
						</yy-scrollbar>
					</div>
				</yy-card>
			</yy-flex>
		</yy-grid>
	</div>
</template>

<style scoped>
.container {
	height: 300px;
	width: fit-content;
	border: 1px solid #ececec;
	padding: 10px;
}

.container2 {
	width: 500px;
	border: 1px solid #ececec;
	padding: 10px;
}

.container3 {
	max-height: 300px;
	width: fit-content;
	border: 1px solid #ececec;
	padding: 10px;
}

.vertical > div:not(:first-child) {
	margin-top: 3px;
}

.horizontal {
	display: flex;
	width: 100px;
}

.horizontal > div:not(:first-child) {
	margin-left: 3px;
}

.horizontal > div {
	min-width: 100px;
}
</style>

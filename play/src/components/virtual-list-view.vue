<script lang="ts" setup>
import { inject, ref } from 'vue'
import type { VirtualListExposed } from '@yy-ui/components'
import { t } from '../plugins'

const texts = inject(t)!

const small = 20
const medium = 30
const large = 50
const sizes = [small, medium, large]
const data = ref(
	new Array(100).fill(0).map((_, i) => {
		const sizesIndex = Math.round(Math.random() * 2)
		return {
			id: i + 1,
			lable: texts[Math.floor(Math.random() * texts.length)],
			key: i + 10,
			size: sizes[sizesIndex],
			sizesIndex
		}
	})
)
// data.unshift({ id: 0, size: 1500, sizesIndex: 0 })
// data.push({ id: data.length + 1, size: 500, sizesIndex: 0 })

const vlInstance = ref<VirtualListExposed>()

const scrollTo: VirtualListExposed['scrollTo'] = (...options: any[]) => {
	vlInstance.value!.scrollTo(...options)
}

// export default defineComponent({
//   components: {
//     yyVirtualList: GenericVirtualList<(typeof data)[number]>()
//   },
//   setup() {

//     return { data }
//   }
// })
</script>

<template>
	<div class="virtual-list-test container_padding">
		<yy-h1 prefix align-text>虚拟列表</yy-h1>
		<yy-p>这一页有很多字...</yy-p>

		<yy-grid cols="2" :gap="10">
			<yy-flex vertical>
				<yy-card title="基础用法">
					<yy-virtual-list :data="data" ref="vlInstance">
						<!-- paddingTop: `var(--padding-${item.sizesIndex})` -->
						<template #default="{ item }">
							<div
								:key="item.id"
								:data-set-index="item.id"
								:style="{
									padding: `var(--padding-${item.sizesIndex})`
								}"
							>
								<div class="item">
									{{ item.lable }}
								</div>
							</div>
						</template>
					</yy-virtual-list>
				</yy-card>

				<yy-card title="滚动条">
					<yy-p>可以通过<yy-text code>scrollbar-props</yy-text>修改滚动条配置</yy-p>

					<yy-virtual-list :data="data" ref="vlInstance">
						<!-- paddingTop: `var(--padding-${item.sizesIndex})` -->
						<template #default="{ item }">
							<div
								:key="item.id"
								:data-set-index="item.id"
								:style="{
									padding: `var(--padding-${item.sizesIndex})`
								}"
							>
								<div class="item">
									{{ item.lable }}
								</div>
							</div>
						</template>
					</yy-virtual-list>
				</yy-card>
			</yy-flex>

			<yy-flex vertical>
				<yy-card title="横向虚拟列表">
					<yy-p>列表可以是横着的!吗?...</yy-p>

					<yy-virtual-list
						:data="data"
						:vertical="false"
						:scrollbar-props="{
							trigger: 'none'
						}"
					>
						<!-- paddingTop: `var(--padding-${item.sizesIndex})` -->
						<template #default="{ item }">
							<div
								:key="item.id"
								:data-set-index="item.id"
								:style="{
									padding: `var(--padding-${item.sizesIndex})`
								}"
							>
								<div class="item">
									{{ item.lable }}
								</div>
							</div>
						</template>
					</yy-virtual-list>
				</yy-card>

				<yy-card title="手动滚动">
					<yy-p>你也可以使用提供的滚动方法</yy-p>

					<yy-flex vertical>
						<yy-flex>
							<yy-button @click="scrollTo(0, 1500)">滚动到指定y距离</yy-button>
							<yy-button @click="scrollTo({ top: 1500, behavior: 'smooth' })">
								平滑滚动到指定top距离
							</yy-button>
							<yy-button @click="scrollTo({ distance: 1500, behavior: 'smooth' })">
								平滑滚动到指定距离
							</yy-button>
							<yy-button @click="scrollTo({ index: 50 })">滚动到指定index</yy-button>
							<yy-button @click="scrollTo({ index: 50, behavior: 'smooth' })">
								平滑滚动到指定index
							</yy-button>
							<yy-button @click="scrollTo({ position: 'top' })">滚动到top</yy-button>
							<yy-button @click="scrollTo({ position: 'top', behavior: 'smooth' })">
								平滑滚动到top
							</yy-button>
							<yy-button @click="scrollTo({ position: 'bottom' })">滚动到bottom</yy-button>
							<yy-button @click="scrollTo({ position: 'bottom', behavior: 'smooth' })">
								平滑滚动到bottom
							</yy-button>
							<yy-button @click="scrollTo({ key: 50 })">滚动到key50</yy-button>
							<yy-button @click="scrollTo({ key: 50, behavior: 'smooth' })">
								平滑滚动到key50
							</yy-button>
						</yy-flex>

						<yy-virtual-list :data="data" ref="vlInstance">
							<!-- paddingTop: `var(--padding-${item.sizesIndex})` -->
							<template #default="{ item }">
								<div
									:key="item.id"
									:data-set-index="item.id"
									:style="{
										padding: `var(--padding-${item.sizesIndex})`
									}"
								>
									<div class="item">
										{{ item.lable }}
									</div>
								</div>
							</template>
						</yy-virtual-list>
					</yy-flex>
				</yy-card>
			</yy-flex>
		</yy-grid>
	</div>
</template>

<style scoped>
.virtual-list-test {
	--padding-0: 2px;
	--padding-1: 4px;
	--padding-2: 6px;
}

.item {
	display: flex;
	align-items: center;
	box-sizing: border-box;
}
</style>

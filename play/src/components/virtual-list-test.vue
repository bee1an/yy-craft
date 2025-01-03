<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import { VirtualListExposed } from '@yy-ui/components'

const texts = [
  '不要因为走得太远而忘记为什么出发',
  '生活就像海洋，只有意志坚强的人才能到达彼岸',
  '成功不是将来才有的，而是从现在开始努力，一步一步累积而成',
  '不要等待机会，而要创造机会',
  '只有不断学习，才能不断进步',
  '人生就像一场马拉松，不在乎速度，而在乎坚持'
]

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

const vlInstance = useTemplateRef<VirtualListExposed>('vlInstance')

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
  <div class="virtual-list-test">
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
    <yy-button @click="scrollTo({ position: 'bottom' })"
      >滚动到bottom</yy-button
    >
    <yy-button @click="scrollTo({ position: 'bottom', behavior: 'smooth' })">
      平滑滚动到bottom
    </yy-button>
    <yy-button @click="scrollTo({ key: 50 })">滚动到key50</yy-button>
    <yy-button @click="scrollTo({ key: 50, behavior: 'smooth' })">
      平滑滚动到key50
    </yy-button>

    <div class="warpper">
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
    </div>
    <div class="warpper">
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
    </div>
  </div>
</template>

<style scoped>
.virtual-list-test {
  --padding-0: 2px;
  --padding-1: 4px;
  --padding-2: 6px;
  font-size: 14px;
}

.warpper {
  border: 1px solid #ccc;
  width: 500px;
}

.item {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
</style>

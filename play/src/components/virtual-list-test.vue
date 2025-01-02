<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import { VirtualListExposed } from '@yy-ui/components'

const small = 20
const medium = 30
const large = 50
const sizes = [small, medium, large]
const data = ref(
  new Array(100).fill(0).map((_, i) => {
    const sizesIndex = Math.round(Math.random() * 2)
    return {
      id: i + 1,
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
    <yy-button @click="scrollTo(1500, 0)">滚动到指定x距离</yy-button>
    <yy-button @click="scrollTo({ left: 1500, behavior: 'smooth' })">
      平滑滚动到指定left距离
    </yy-button>
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

    <yy-virtual-list
      :data="data"
      ref="vlInstance"
      :vertical="false"
      :scrollbar-props="{
        trigger: 'hover'
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
          <div
            class="item"
            :style="{
              width: `${item.size}px`,
              minHeight: `${item.size}px`
            }"
          >
            {{ item.id }}
          </div>
        </div>
      </template>
    </yy-virtual-list>
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
  justify-content: center;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>

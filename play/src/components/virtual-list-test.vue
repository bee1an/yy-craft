<script lang="ts" setup>
import { reactive, ref, useTemplateRef } from 'vue'
import yyVirtualList, {
  ScrollTo
} from '@yy-ui/components/virtual-list/src/virtual-list'

const small = 20
const medium = 30
const large = 50
const sizes = [small, medium, large]
const data = reactive(
  new Array(100).fill(0).map((_, i) => {
    const sizesIndex = Math.round(Math.random() * 2)
    return {
      id: i + 1,
      size: sizes[sizesIndex],
      sizesIndex
    }
  })
)
data.unshift({ id: 0, size: 1500, sizesIndex: 0 })
data.push({ id: data.length + 1, size: 500, sizesIndex: 0 })

const vlInstance = ref<InstanceType<typeof yyVirtualList>>()

const scrollTo: ScrollTo = (...options: any[]) => {
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
    <button @click="scrollTo(0, 1500)">滚动到直接距离</button>
    <button @click="scrollTo({ distance: 1500, behavior: 'smooth' })">
      平滑滚动到直接距离
    </button>
    <button @click="scrollTo({ top: 1500, behavior: 'smooth' })">
      平滑滚动到直接距2
    </button>

    <yy-virtual-list :data="data" ref="vlInstance">
      <!-- paddingTop: `var(--padding-${item.sizesIndex})` -->
      <template #default="{ item }">
        <div
          :key="item.id"
          :data-set-index="item.id"
          :style="{
            paddingTop: `var(--padding-${item.sizesIndex})`
          }"
        >
          <div
            class="item"
            :style="{
              width: `${item.size}px`,
              height: `${item.size}px`,
              backgroundColor: `var(--color-${item.sizesIndex})`
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
  --color-0: rgb(214, 223, 135);
  --color-1: rgb(0, 255, 191);
  --color-2: rgb(255, 0, 221);
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

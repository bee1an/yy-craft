<script setup lang="ts">
import { CreateNamespace } from '@yy-ui/utils'
import { computed, ref, useTemplateRef } from 'vue'
import { scrollbarProps } from './scrollbar'
import { useBaseDrag, useResizeObserver } from '@yy-ui/composables'

defineOptions({ name: 'scrollbar' })
const props = defineProps(scrollbarProps)

const scrollWrapper = useTemplateRef('scrollWrapper')

const verticalRail = useTemplateRef('verticalRail')

const horizontalRail = useTemplateRef('horizontalRail')

const verticalBar = ref({ height: 0, top: 0, visible: true })

const verticalBarStyle = computed(() => {
  return {
    height: `${verticalBar.value.height}px`,
    top: `${verticalBar.value.top}px`
  }
})

const horizontalBar = ref({ width: 0, left: 0, visible: true })
const horizontalBarStyle = computed(() => {
  return {
    width: `${horizontalBar.value.width}px`,
    left: `${horizontalBar.value.left}px`
  }
})

const update = () => {
  const {
    scrollHeight,
    clientHeight,
    scrollWidth,
    clientWidth,
    scrollTop,
    scrollLeft
  } = scrollWrapper.value!

  verticalBar.value.visible = scrollHeight > clientHeight
  if (verticalBar.value.visible) {
    const { clientHeight: verticalRailHeight } = verticalRail.value!

    verticalBar.value.height =
      verticalRailHeight * (clientHeight / scrollHeight)

    verticalBar.value.top = (scrollTop / scrollHeight) * verticalRailHeight
  }

  horizontalBar.value.visible = scrollWidth > clientWidth
  if (horizontalBar.value.visible) {
    const { clientWidth: horizontalRailWidth } = horizontalRail.value!
    horizontalBar.value.width =
      horizontalRailWidth * (clientWidth / scrollWidth)

    horizontalBar.value.left = (scrollLeft / scrollWidth) * horizontalRailWidth
  }
}
useResizeObserver(scrollWrapper, update)

const verticalController = useTemplateRef('verticalController')
useBaseDrag(verticalController, {
  down: () => scrollWrapper.value!.scrollTop,
  move: ({ moveY, downReturnVal }) => {
    const { clientHeight: verticalRailHeight } = verticalRail.value!
    const { scrollHeight } = scrollWrapper.value!

    scrollWrapper.value!.scrollTop =
      scrollHeight * (moveY / verticalRailHeight) + downReturnVal
  }
})

const hoirzontalController = useTemplateRef('horizontalController')
useBaseDrag(hoirzontalController, {
  down: () => scrollWrapper.value!.scrollLeft,
  move: ({ moveX, downReturnVal }) => {
    const { clientWidth: horizontalRailWidth } = horizontalRail.value!
    const { scrollWidth } = scrollWrapper.value!

    scrollWrapper.value!.scrollLeft =
      scrollWidth * (moveX / horizontalRailWidth) + downReturnVal
  }
})

const bem = new CreateNamespace('scrollbar')

function scrollTo(...args: Parameters<typeof window.scrollTo>) {
  return scrollWrapper.value?.scrollTo(...args)
}

function scrollBy(...args: Parameters<typeof window.scrollBy>) {
  return scrollWrapper.value?.scrollBy(...args)
}

defineExpose({ scrollTo, scrollBy })
</script>

<template>
  <div
    :class="[
      bem.b().value,
      bem.is('display_controller', props.trigger === 'none')
    ]"
  >
    <div :class="bem.b('container').value" ref="scrollWrapper" @scroll="update">
      <div :class="bem.b('content').value">
        <slot></slot>
      </div>
    </div>

    <div
      v-if="verticalBar.visible"
      :class="bem.b('rail').m('vertical').value"
      ref="verticalRail"
    >
      <div
        :class="bem.b('rail').e('controller').value"
        :style="verticalBarStyle"
        ref="verticalController"
      ></div>
    </div>

    <div
      v-if="horizontalBar.visible"
      :class="bem.b('rail').m('horizontal').value"
      ref="horizontalRail"
    >
      <div
        :class="bem.b('rail').e('controller').value"
        :style="horizontalBarStyle"
        ref="horizontalController"
      ></div>
    </div>
  </div>
</template>

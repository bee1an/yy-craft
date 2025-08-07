<script setup lang="ts">
import type { ScrollbarExpose } from './scrollbar'
import { useBaseDrag } from '@yy-craft/composables/use-base-drag'
import { useEventListener } from '@yy-craft/composables/use-event-listener'
import { useResizeObserver } from '@yy-craft/composables/use-resize-observer'
import { useTheme } from '@yy-craft/composables/use-theme'
import {
  scrollbarDark,
  scrollbarLight,
  scrollbarStyle,
} from '@yy-craft/theme-chalk/src/scrollbar'
import { CreateNamespace } from '@yy-craft/utils/src/create'
import { computed, nextTick, ref } from 'vue'
import { scrollbarInternalProps } from './scrollbar'

defineOptions({ name: 'Scrollbar' })

const props = defineProps(scrollbarInternalProps)

const containerRef = ref<HTMLElement | null>(null)
const mergedContainerRef = computed(() => {
  const { container } = props

  return container ? container() : containerRef.value
})
useEventListener(mergedContainerRef, 'scroll', () => update())

const verticalRail = ref<HTMLElement | null>(null)

const horizontalRail = ref<HTMLElement | null>(null)

const verticalBar = ref({ height: 0, top: 0, visible: true, active: false })
const verticalBarStyle = computed(() => {
  return {
    height: `${verticalBar.value.height}px`,
    top: `${verticalBar.value.top}px`,
  }
})

const horizontalBar = ref({ width: 0, left: 0, visible: true, active: false })
const horizontalBarStyle = computed(() => {
  return {
    width: `${horizontalBar.value.width}px`,
    left: `${horizontalBar.value.left}px`,
  }
})

function update() {
  const {
    scrollHeight,
    clientHeight,
    scrollWidth,
    clientWidth,
    scrollTop,
    scrollLeft,
  } = mergedContainerRef.value!

  // verticalBar.value.visible = scrollHeight > clientHeight
  // if (verticalBar.value.visible) {
  //   const { clientHeight: verticalRailHeight } = verticalRail.value!

  //   verticalBar.value.height =
  //     verticalRailHeight * (clientHeight / scrollHeight)

  //   verticalBar.value.top = (scrollTop / scrollHeight) * verticalRailHeight
  // }

  // horizontalBar.value.visible = scrollWidth > clientWidth
  // if (horizontalBar.value.visible) {
  //   const { clientWidth: horizontalRailWidth } = horizontalRail.value!
  //   horizontalBar.value.width =
  //     horizontalRailWidth * (clientWidth / scrollWidth)

  //   horizontalBar.value.left = (scrollLeft / scrollWidth) * horizontalRailWidth
  // }
  updateVerticalBar(scrollHeight, clientHeight, scrollTop)
  updateHorizontalBar(scrollWidth, clientWidth, scrollLeft)
}
async function updateVerticalBar(
  scrollHeight: number,
  clientHeight: number,
  scrollTop: number,
) {
  verticalBar.value.visible = scrollHeight > clientHeight
  if (verticalBar.value.visible) {
    if (!verticalRail.value)
      await new Promise<void>(r => nextTick(r))
    const { clientHeight: verticalRailHeight } = verticalRail.value!

    verticalBar.value.height
      = verticalRailHeight * (clientHeight / scrollHeight)

    verticalBar.value.top = (scrollTop / scrollHeight) * verticalRailHeight
  }
}
async function updateHorizontalBar(
  scrollWidth: number,
  clientWidth: number,
  scrollLeft: number,
) {
  horizontalBar.value.visible = scrollWidth > clientWidth
  if (horizontalBar.value.visible) {
    if (!horizontalRail.value)
      await new Promise<void>(r => nextTick(r))
    const { clientWidth: horizontalRailWidth } = horizontalRail.value!
    horizontalBar.value.width
      = horizontalRailWidth * (clientWidth / scrollWidth)

    horizontalBar.value.left = (scrollLeft / scrollWidth) * horizontalRailWidth
  }
}

useResizeObserver(mergedContainerRef, update)

const verticalController = ref<HTMLElement | null>(null)
useBaseDrag(verticalController, {
  down: () => {
    verticalBar.value.active = true
    return mergedContainerRef.value!.scrollTop
  },
  move: ({ moveY, downReturnVal }) => {
    const { clientHeight: verticalRailHeight } = verticalRail.value!
    const { scrollHeight } = mergedContainerRef.value!

    mergedContainerRef.value!.scrollTop
      = scrollHeight * (moveY / verticalRailHeight) + downReturnVal
  },
  up: () => {
    verticalBar.value.active = false
  },
})

const hoirzontalController = ref<HTMLElement | null>(null)
useBaseDrag(hoirzontalController, {
  down: () => {
    horizontalBar.value.active = true
    return mergedContainerRef.value!.scrollLeft
  },
  move: ({ moveX, downReturnVal }) => {
    const { clientWidth: horizontalRailWidth } = horizontalRail.value!
    const { scrollWidth } = mergedContainerRef.value!

    mergedContainerRef.value!.scrollLeft
      = scrollWidth * (moveX / horizontalRailWidth) + downReturnVal
  },
  up: () => {
    horizontalBar.value.active = false
  },
})

function scrollTo(...args: any[]) {
  return mergedContainerRef.value?.scrollTo(...args)
}

function scrollBy(...args: any[]) {
  return mergedContainerRef.value?.scrollBy(...args)
}

defineExpose({ scrollTo, scrollBy } as ScrollbarExpose)

const bem = new CreateNamespace('scrollbar')

const { styleVars } = useTheme(
  { light: scrollbarLight.vars(), dark: scrollbarDark.vars() },
  'scrollbar',
  scrollbarStyle,
  props,
)
</script>

<template>
  <div
    :style="styleVars"
    :class="[
      bem.b().value,
      bem.m(props.trigger === 'none' && 'display_controller').value,
    ]"
  >
    <slot v-if="props.container" />
    <div v-else ref="containerRef" :class="bem.b('container').value">
      <div
        :class="[bem.b('content').value, contentClass]"
        :style="contentStyle"
      >
        <slot />
      </div>
    </div>

    <div
      v-if="verticalBar.visible"
      ref="verticalRail"
      :class="[bem.b('rail').value, bem.b('rail').m('vertical').value]"
    >
      <div
        ref="verticalController"
        :class="[
          bem.b('rail').e('controller').value,
          bem
            .b('rail')
            .e('controller')
            .m(verticalBar.active && 'active').value,
        ]"
        :style="verticalBarStyle"
      />
    </div>

    <div
      v-if="horizontalBar.visible"
      ref="horizontalRail"
      :class="[bem.b('rail').value, bem.b('rail').m('horizontal').value]"
    >
      <div
        :class="[
          bem.b('rail').e('controller').value,
          bem
            .b('rail')
            .e('controller')
            .m(horizontalBar.active && 'active').value,
        ]"
        :style="horizontalBarStyle"
      />
    </div>
  </div>
</template>

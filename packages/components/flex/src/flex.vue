<script setup lang="ts">
import { createKey, CreateNamespace, depx, getGap } from '@yy-ui/utils'
import { flexProps } from './flex'
import { computed } from 'vue'
import { useTheme } from '@yy-ui/composables'
import { common, flexStyle } from '@yy-ui/theme-chalk'

defineOptions({ name: 'Flex' })

const props = defineProps(flexProps)

useTheme('flex', flexStyle, props)

const margin = computed<{ horizontal: number; vertical: number }>(() => {
  const { size } = props

  if (Array.isArray(size)) {
    return {
      horizontal: size[0],
      vertical: size[1]
    }
  }
  if (typeof size === 'number') {
    return {
      horizontal: size,
      vertical: size
    }
  }

  const { [createKey('gap', size)]: gap } = common
  const { row, col } = getGap(gap)
  return {
    horizontal: depx(col),
    vertical: depx(row)
  }
})

const bem = new CreateNamespace('flex')
</script>

<template>
  <div
    :class="bem.b().value"
    :style="{
      display: inline ? 'inline-flex' : 'flex',
      justifyContent: justify,
      alignItems: align,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      flexDirection: vertical ? 'column' : 'row',
      gap: `${margin.vertical}px ${margin.horizontal}px`
    }"
  >
    <slot></slot>
  </div>
</template>

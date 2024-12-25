<script setup lang="ts">
import { computed } from 'vue'
import { IconProps } from './icon'
import { CreateNamespace } from '@yy-ui/utils'

defineOptions({ name: 'icon' })

const props = defineProps<IconProps>()
const style = computed(() => {
  const style: Record<string, any> = {}

  if (typeof props.color !== 'undefined') {
    style.color = props.color
  }

  if (typeof props.size === 'number') {
    style.fontSize = `${props.size}px`
  } else if (typeof props.size === 'string') {
    style.fontSize = props.size
  }

  return style
})

const bem = new CreateNamespace('icon')
</script>

<template>
  <i :style="style" :class="bem.value">
    <slot></slot>
  </i>
</template>

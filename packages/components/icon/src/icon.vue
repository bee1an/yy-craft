<script setup lang="ts">
import { computed } from 'vue'
import { IconProps } from './icon'
import { CreateNamespace } from '@yy-ui/utils'
import { useTheme } from '@yy-ui/composables'
import { iconStyle } from '@yy-ui/theme-chalk'

defineOptions({ name: 'Icon' })

const props = defineProps<IconProps>()
const propsStyle = computed(() => {
  const style: Record<string, any> = {}

  if (typeof props.color !== 'undefined') {
    style['--y-icon-color'] = props.color
  }

  if (typeof props.size === 'number') {
    style['--y-icon-size'] = `${props.size}px`
  } else if (typeof props.size === 'string') {
    style['--y-icon-size'] = props.size
  }

  return style
})

useTheme(undefined, 'icon', iconStyle)

const bem = new CreateNamespace('icon')
</script>

<template>
  <i :style="propsStyle" :class="bem.value">
    <slot></slot>
  </i>
</template>

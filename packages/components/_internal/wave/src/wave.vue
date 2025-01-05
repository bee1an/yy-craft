<script setup lang="ts">
import { useTheme } from '@yy-ui/composables'
import { CreateNamespace } from '@yy-ui/utils'
import { computed, ref, useTemplateRef, watchEffect } from 'vue'
import { waveProps } from './wave'
import { waveStyle, waveTheme } from '@yy-ui/theme-chalk'

defineOptions({ name: 'Wave' })

const props = defineProps(waveProps)

const bem = new CreateNamespace('wave')
const waveRef = useTemplateRef('waveRef')

const active = ref(false)

const start = () => {
  active.value = true
  waveRef.value?.getAnimations().forEach(animation => {
    animation.currentTime = 0
  })
}

defineExpose({ start })

const waveThemeVars = waveTheme.vars()

const theme = computed(() => {
  const vars = { ...waveThemeVars }

  if (props.animationDuration) {
    vars.waveAnimationDuration = props.animationDuration
  }

  if (props.animationName) {
    vars.waveAnimationName = props.animationName
  }

  return vars
})

const { styleVars } = useTheme(theme, 'wave', waveStyle, props)

watchEffect(() => {})
</script>

<template>
  <div
    ref="waveRef"
    :style="styleVars"
    :class="[bem.b().value, bem.m(active && 'active').value]"
    @animationend="active = false"
  ></div>
</template>

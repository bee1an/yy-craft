<script setup lang="ts">
import { useTheme } from '@yy-ui/composables'
import { CreateNamespace } from '@yy-ui/utils'
import { ref, useTemplateRef, watchEffect } from 'vue'
import style, { waveTheme } from './style/index.cssr'
import { waveProps } from './wave'

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

const { styleVars, vars } = useTheme({ light: waveTheme }, style, props)

watchEffect(() => {
  if (props.animationDuration) {
    vars.waveAnimationDuration = props.animationDuration
  }

  if (props.animationName) {
    vars.waveAnimationName = props.animationName
  }
})
</script>

<template>
  <div
    ref="waveRef"
    :style="styleVars"
    :class="[bem.b().value, bem.m(active && 'active').value]"
    @animationend="active = false"
  ></div>
</template>

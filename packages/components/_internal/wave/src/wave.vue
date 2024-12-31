<script setup lang="ts">
import { CreateNamespace } from '@yy-ui/utils'
import { ref, useTemplateRef } from 'vue'

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
</script>

<template>
  <div
    ref="waveRef"
    :class="[bem.b().value, bem.b('wave').m(active ? 'active' : '').value]"
    @animationend="active = false"
  ></div>
</template>

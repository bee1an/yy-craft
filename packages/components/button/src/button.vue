<script setup lang="ts">
import { CreateNamespace } from '@yy-ui/utils'
import { buttonProps } from './button'
import { computed, ref, useTemplateRef } from 'vue'

defineOptions({ name: 'button' })

const props = defineProps(buttonProps)

const bem = new CreateNamespace('button')

const primary = computed(() => {
  return !props.secondary && !props.tertiary && !props.quaternary
})

const warpperClass = computed(() => {
  return [
    bem.b().value,
    bem.b().m(props.type).value,
    bem.is('secondary', props.secondary),
    bem.is('tertiary', props.tertiary),
    bem.is('quaternary', props.quaternary),
    bem.is('dashed', props.dashed)
  ]
})

const waveRef = useTemplateRef('waveRef')
const wave = ref(false)
const restartAnimation = () => {
  if (!primary.value) return
  waveRef.value?.getAnimations().forEach(item => {
    item.currentTime = 0
  })
  wave.value = true
}

const clickHandler = () => {
  restartAnimation()
}

const animationendHandler = () => {
  wave.value = false
}
</script>

<template>
  <button :class="warpperClass" tabindex="0" @click="clickHandler">
    <span :class="[bem.b().e('content').value, bem.is('strong', strong)]">
      <slot></slot>
    </span>

    <div
      v-if="primary"
      ref="waveRef"
      :class="[
        bem.b('wave').value,
        bem.b('wave').m(wave ? 'active' : '').value
      ]"
      @animationend="animationendHandler"
    ></div>
  </button>
</template>

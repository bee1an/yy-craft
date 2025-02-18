<script setup lang="ts">
import { CreateNamespace } from '@yy-ui/utils/src/create'
import { buttonEmits, buttonProps } from './button'
import { computed, ref } from 'vue'
import { useTheme } from '@yy-ui/composables/use-theme'
import YWave from '../../_internal/wave/src/wave.vue'
import {
  buttonDark,
  buttonDarkColors,
  buttonLight,
  buttonLightColors,
  buttonStyle
} from '@yy-ui/theme-chalk/src/button'

defineOptions({ name: 'Button' })

const props = defineProps(buttonProps)

const emits = defineEmits(buttonEmits)

const bem = new CreateNamespace('button')

const primary = computed(() => {
  return !props.secondary && !props.tertiary && !props.quaternary
})

const waveRef = ref<InstanceType<typeof YWave> | null>(null)

const clickHandler = (payload: MouseEvent) => {
  waveRef.value?.start()
  emits('click', payload)
}

const lightVars = buttonLight.vars()
const darkVars = buttonDark.vars()

const themeVars = computed(() => {
  const grade = props.secondary
    ? 'secondary'
    : props.tertiary
    ? 'tertiary'
    : props.quaternary
    ? 'quaternary'
    : props.dashed
    ? 'dashed'
    : 'default'

  return {
    light: Object.assign({}, lightVars, buttonLightColors[props.type][grade]),
    dark: Object.assign({}, darkVars, buttonDarkColors[props.type][grade])
  }
})

const { styleVars } = useTheme(themeVars, 'button', buttonStyle, props)
</script>

<template>
  <button
    :style="styleVars"
    :class="bem.b().value"
    tabindex="0"
    @click="clickHandler"
  >
    <span
      :class="[
        bem.e('content').value,
        bem.e('content').m(strong && 'strong').value
      ]"
    >
      <slot></slot>
    </span>

    <y-wave
      v-if="primary"
      ref="waveRef"
      :theme-overrides="{
        waveAnimationName: 'button-wave-spread,button-wave-opacity'
      }"
    ></y-wave>
  </button>
</template>

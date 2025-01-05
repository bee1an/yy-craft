<script setup lang="ts">
import { CreateNamespace } from '@yy-ui/utils'
import { buttonProps } from './button'
import { computed, useTemplateRef } from 'vue'
import { useTheme } from '@yy-ui/composables'
import YWave from '../../_internal/wave/src/wave.vue'
import {
  buttonDark,
  buttonDarkColors,
  buttonLight,
  buttonLightColors,
  buttonStyle
} from '@yy-ui/theme-chalk'

defineOptions({ name: 'Button' })

const props = defineProps(buttonProps)

const bem = new CreateNamespace('button')

const primary = computed(() => {
  return !props.secondary && !props.tertiary && !props.quaternary
})

const waveRef = useTemplateRef('waveRef')

const clickHandler = () => {
  waveRef.value?.start()
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
      animation-name="button-wave-spread,button-wave-opacity"
    ></y-wave>
  </button>
</template>

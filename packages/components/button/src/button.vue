<script setup lang="ts">
import { CreateNamespace } from '@yy-ui/utils'
import { buttonProps } from './button'
import { computed, useTemplateRef, watchEffect } from 'vue'
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

// const { styleVars, vars, injectTheme } = useTheme(
//   { light: buttonLight, dark: buttonDark },
//   buttonStyle,
//   props
// )

const style = computed(() => {
  const grade = props.secondary
    ? 'secondary'
    : props.tertiary
    ? 'tertiary'
    : props.quaternary
    ? 'quaternary'
    : props.dashed
    ? 'dashed'
    : 'default'

  const { styleVars } = useTheme(
    {
      light: {
        name: buttonLight.name,
        vars: {
          ...buttonLight.vars,
          ...buttonLightColors[props.type][grade]
        }
      },
      dark: {
        name: buttonDark.name,
        vars: { ...buttonDark.vars, ...buttonDarkColors[props.type][grade] }
      }
    },
    buttonStyle,
    props
  )

  return styleVars
})

// watchEffect(() => {
//   const theme = injectTheme?.theme.value || 'light'

//   const colors = theme === 'light' ? buttonLightColors : buttonDarkColors

//   const grade = props.secondary
//     ? 'secondary'
//     : props.tertiary
//     ? 'tertiary'
//     : props.quaternary
//     ? 'quaternary'
//     : props.dashed
//     ? 'dashed'
//     : 'default'

//   Object.assign(vars, colors[props.type][grade])
// })
</script>

<template>
  <button
    :style="style.value"
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

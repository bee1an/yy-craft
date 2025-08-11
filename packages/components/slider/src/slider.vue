<script setup lang="ts">
import { useBaseDrag, useElementSize } from '@yy-craft/composables'
import { useTheme } from '@yy-craft/composables/use-theme'
import { sliderDark, sliderLight, sliderStyle } from '@yy-craft/theme-chalk/src/slider'
import { CreateNamespace } from '@yy-craft/utils/src/create'
import { computed, ref, watch } from 'vue'
import { sliderProps } from './slider'

defineOptions({ name: 'Slider' })

const props = defineProps(sliderProps)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
  (e: 'input', value: number): void
}>()

const bem = new CreateNamespace('slider')

const lightVars = sliderLight.vars()
const darkVars = sliderDark.vars()

const theme = computed(() => {
  return {
    light: Object.assign({}, lightVars, {}),
    dark: Object.assign({}, darkVars, {}),
  }
})

const { styleVars } = useTheme(theme, 'slider', sliderStyle, props, sliderLight.exclude)

const triggerRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

const { width } = useElementSize(trackRef)

const triggerLeft = ref(0)

// [0, 1]
const fraction = ref(0)

// initial
watch(() => [props.modelValue, props.max, props.min], ([modelValue, max, min]) => {
  fraction.value = (modelValue - min) / (max - min)
}, { immediate: true })

const resolveValue = computed(() => (props.max - props.min) * fraction.value + props.min)

let lastInputVal: undefined | number
function tryEmitInput() {
  if (lastInputVal === resolveValue.value)
    return

  lastInputVal = resolveValue.value
  emit('input', resolveValue.value)
}

function cb(beforeDown?: (e: MouseEvent) => any) {
  return {
    down(e: MouseEvent) {
      beforeDown?.(e)
      triggerLeft.value = fraction.value * width.value
    },
    move({ stepX }: { stepX: number }) {
      triggerLeft.value += stepX

      fraction.value = Math.min(1, Math.max(0, triggerLeft.value / width.value))

      tryEmitInput()
    },
    up() {
      triggerLeft.value = fraction.value * width.value
      tryEmitInput()
      emit('change', resolveValue.value)
    },
  }
}

// trigger drag
useBaseDrag(triggerRef, cb())

// track drag
useBaseDrag(trackRef, cb(e => fraction.value = e.offsetX / width.value))

// update
watch(triggerLeft, () => {
  if (resolveValue.value !== props.modelValue) {
    emit('update:modelValue', resolveValue.value)
  }
})
</script>

<template>
  <div :style="styleVars" :class="bem.b().value">
    <div ref="trackRef" :class="bem.e('track').value">
      <div :style="{ width: `${fraction * 100}%` }" :class="bem.e('bar').value" />
      <div
        ref="triggerRef"
        :style="{ left: `${fraction * 100}%` }" :class="bem.e('trigger').value"
        @mousedown.stop
      />
    </div>
  </div>
</template>

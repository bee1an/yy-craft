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

const resolveLeft = ref(0)

// initial
watch(() => [props.modelValue, props.max, props.min], ([modelValue, max, min]) => {
  resolveLeft.value = (modelValue - min) / (max - min)
}, { immediate: true })

// drag
useBaseDrag(triggerRef, {
  down() {
    triggerLeft.value = resolveLeft.value * width.value
  },
  move({ stepX }) {
    triggerLeft.value += stepX

    resolveLeft.value = Math.min(1, Math.max(0, triggerLeft.value / width.value))
  },
  up() {
    triggerLeft.value = resolveLeft.value * width.value
  },
})

// update
watch(triggerLeft, () => {
  const nextValue = (props.max - props.min) * resolveLeft.value + props.min

  if (nextValue !== props.modelValue) {
    emit('update:modelValue', nextValue)
  }
})
</script>

<template>
  <div :style="styleVars" :class="bem.b().value">
    <div ref="trackRef" :class="bem.e('track').value">
      <div :style="{ width: `${resolveLeft * 100}%` }" :class="bem.e('bar').value" />
      <div ref="triggerRef" :style="{ left: `${resolveLeft * 100}%` }" :class="bem.e('trigger').value" />
    </div>
  </div>
</template>

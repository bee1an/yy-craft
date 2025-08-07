<script setup lang="ts">
import { Icon as YIcon } from '@yy-craft/components/icon'
import { useTheme } from '@yy-craft/composables/use-theme'
import {
  checkboxDark,
  checkboxLight,
  checkboxStyle,
} from '@yy-craft/theme-chalk/src/checkbox'
import { CreateNamespace } from '@yy-craft/utils/src/create'
import { YBaseChecked, YBaseIndeterminate } from '../../_internal/icons'
import { checkboxEmits, checkboxProps } from './checkbox'

defineOptions({ name: 'Checkbox' })

const props = defineProps(checkboxProps)

const emits = defineEmits(checkboxEmits)

function toggleChecked() {
  emits('update:modelValue', !props.modelValue)
}

const bem = new CreateNamespace('checkbox')

const { styleVars } = useTheme(
  { light: checkboxLight.vars(), dark: checkboxDark.vars() },
  'checkbox',
  checkboxStyle,
  props,
)
</script>

<template>
  <div
    :style="styleVars"
    :class="[
      bem.b().value,
      bem.m((modelValue || indeterminate) && 'checked').value,
      bem.m(indeterminate && 'indeterminate').value,
    ]"
    tabindex="0"
    @click="toggleChecked"
  >
    <div :class="bem.b('box').value">
      <div :class="bem.e('icon').value">
        <YIcon>
          <YBaseIndeterminate v-if="indeterminate" />
          <YBaseChecked v-else />
        </YIcon>
      </div>
    </div>

    <div v-if="label" :class="bem.e('label').value">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { CreateNamespace } from '@yy-ui/utils/src/create'
import { CheckboxEmits, checkboxProps } from './checkbox'
import {
  checkboxDark,
  checkboxLight,
  checkboxStyle
} from '@yy-ui/theme-chalk/src/checkbox'
import { Icon as YIcon } from '@yy-ui/components/icon'
import { useTheme } from '@yy-ui/composables/use-theme'
import { YBaseChecked, YBaseIndeterminate } from '../../_internal/icons'

defineOptions({ name: 'Checkbox' })

const props = defineProps(checkboxProps)

const emits = defineEmits<CheckboxEmits>()

const toggleChecked = () => {
  emits('update:modelValue', !props.modelValue)
}

const bem = new CreateNamespace('checkbox')

const { styleVars } = useTheme(
  { light: checkboxLight.vars(), dark: checkboxDark.vars() },
  'checkbox',
  checkboxStyle,
  props
)
</script>

<template>
  <div
    :style="styleVars"
    :class="[
      bem.b().value,
      bem.m((modelValue || indeterminate) && 'checked').value,
      bem.m(indeterminate && 'indeterminate').value
    ]"
    tabindex="0"
    @click="toggleChecked"
  >
    <div :class="bem.b('box').value">
      <div :class="bem.e('icon').value">
        <y-icon>
          <y-base-indeterminate v-if="indeterminate" />
          <y-base-checked v-else />
        </y-icon>
      </div>
    </div>

    <div :class="bem.e('label').value" v-if="label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { CreateNamespace } from '@yy-ui/utils'
import { CheckboxEmits, checkboxProps } from './checkbox'
import CChecked from './icon/Checked'
import CIndeterminate from './icon/Indeterminate'
import { Icon as YIcon } from '@yy-ui/yy-ui'

defineOptions({ name: 'Checkbox' })

const props = defineProps(checkboxProps)

const emits = defineEmits<CheckboxEmits>()

const toggleChecked = () => {
  emits('update:modelValue', !props.modelValue)
}

const bem = new CreateNamespace('checkbox')
</script>

<template>
  <div
    :class="[
      bem.b().value,
      bem.is('checked', modelValue || indeterminate),
      bem.is('indeterminate', indeterminate)
    ]"
    tabindex="0"
    @click="toggleChecked"
  >
    <div :class="bem.b('box').value">
      <div :class="bem.e('icon').value">
        <y-icon>
          <c-indeterminate v-if="indeterminate" />
          <c-checked v-else />
        </y-icon>
      </div>
    </div>

    <div :class="bem.e('label').value" v-if="label">{{ label }}</div>
  </div>
</template>

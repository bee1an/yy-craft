<script setup lang="ts">
import { ButtonType } from '@yy-ui/components'
import { ref } from 'vue'

const type = ref<ButtonType>('primary')
const dashed = ref(false)

const themeOverrides = ref({ buttonHeight: '40px' })

setTimeout(() => {
  dashed.value = true
  type.value = 'error'
}, 2000)
</script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>按钮</yy-h1>
    <yy-grid cols="2" :gap="10">
      <yy-card title="主要按钮">
        <yy-flex>
          <yy-button>Default</yy-button>
          <yy-button type="tertiary">Tertiary</yy-button>
          <yy-button type="primary">Primary</yy-button>
          <yy-button type="success">Success</yy-button>
          <yy-button type="warning">Warning</yy-button>
          <yy-button type="error">Error</yy-button>
          <yy-button type="info">Info</yy-button>
          <yy-button type="info" strong>Strong</yy-button>
        </yy-flex>
      </yy-card>

      <yy-card title="次要按钮">
        <yy-flex>
          <yy-button secondary>Default</yy-button>
          <yy-button secondary type="tertiary">Tertiary</yy-button>
          <yy-button secondary type="primary">Primary</yy-button>
          <yy-button secondary type="success">Success</yy-button>
          <yy-button secondary type="warning">Warning</yy-button>
          <yy-button secondary type="error">Error</yy-button>
          <yy-button secondary type="info">Info</yy-button>
          <yy-button secondary type="info" strong>Strong</yy-button>
        </yy-flex>
      </yy-card>

      <yy-card title="次次要按钮">
        <yy-flex>
          <yy-button tertiary>Default</yy-button>
          <yy-button tertiary type="tertiary">Tertiary</yy-button>
          <yy-button tertiary type="primary">Primary</yy-button>
          <yy-button tertiary type="success">Success</yy-button>
          <yy-button tertiary type="warning">Warning</yy-button>
          <yy-button tertiary type="error">Error</yy-button>
          <yy-button tertiary type="info">Info</yy-button>
          <yy-button tertiary type="info" strong>Strong</yy-button>
        </yy-flex>
      </yy-card>

      <yy-card title="次次次要按钮">
        <yy-flex>
          <yy-button quaternary>Default</yy-button>
          <yy-button quaternary type="tertiary">Tertiary</yy-button>
          <yy-button quaternary type="primary">Primary</yy-button>
          <yy-button quaternary type="success">Success</yy-button>
          <yy-button quaternary type="warning">Warning</yy-button>
          <yy-button quaternary type="error">Error</yy-button>
          <yy-button quaternary type="info">Info</yy-button>
          <yy-button quaternary type="info" strong>Strong</yy-button>
        </yy-flex>
      </yy-card>

      <yy-card title="虚线按钮">
        <yy-flex>
          <yy-button dashed>Default</yy-button>
          <yy-button dashed type="tertiary">Tertiary</yy-button>
          <yy-button dashed type="primary">Primary</yy-button>
          <yy-button dashed type="success">Success</yy-button>
          <yy-button dashed type="warning">Warning</yy-button>
          <yy-button dashed type="error">Error</yy-button>
          <yy-button dashed type="info">Info</yy-button>
          <yy-button dashed type="info" strong>Strong</yy-button>
        </yy-flex>
      </yy-card>

      <yy-card title="修改主题">
        <yy-button
          :type="type"
          :dashed="dashed"
          :themeOverrides="themeOverrides"
          >修改主题</yy-button
        >
      </yy-card>
    </yy-grid>
  </div>
</template>

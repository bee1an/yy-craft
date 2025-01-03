<script setup lang="ts"></script>

<template>
  <div class="container">
    主要按钮
    <div class="flex">
      <yy-button>Default</yy-button>
      <yy-button type="tertiary">Tertiary</yy-button>
      <yy-button type="primary">Primary</yy-button>
      <yy-button type="success">Success</yy-button>
      <yy-button type="warning">Warning</yy-button>
      <yy-button type="error">Error</yy-button>
      <yy-button type="info">Info</yy-button>
      <yy-button type="info" strong>Strong</yy-button>
    </div>
    次要按钮
    <div class="flex">
      <yy-button secondary>Default</yy-button>
      <yy-button secondary type="tertiary">Tertiary</yy-button>
      <yy-button secondary type="primary">Primary</yy-button>
      <yy-button secondary type="success">Success</yy-button>
      <yy-button secondary type="warning">Warning</yy-button>
      <yy-button secondary type="error">Error</yy-button>
      <yy-button secondary type="info">Info</yy-button>
      <yy-button secondary type="info" strong>Strong</yy-button>
    </div>
    次次要按钮
    <div class="flex">
      <yy-button tertiary>Default</yy-button>
      <yy-button tertiary type="tertiary">Tertiary</yy-button>
      <yy-button tertiary type="primary">Primary</yy-button>
      <yy-button tertiary type="success">Success</yy-button>
      <yy-button tertiary type="warning">Warning</yy-button>
      <yy-button tertiary type="error">Error</yy-button>
      <yy-button tertiary type="info">Info</yy-button>
      <yy-button tertiary type="info" strong>Strong</yy-button>
    </div>
    次次次要按钮
    <div class="flex">
      <yy-button quaternary>Default</yy-button>
      <yy-button quaternary type="tertiary">Tertiary</yy-button>
      <yy-button quaternary type="primary">Primary</yy-button>
      <yy-button quaternary type="success">Success</yy-button>
      <yy-button quaternary type="warning">Warning</yy-button>
      <yy-button quaternary type="error">Error</yy-button>
      <yy-button quaternary type="info">Info</yy-button>
      <yy-button quaternary type="info" strong>Strong</yy-button>
    </div>
    虚线按钮
    <div class="flex">
      <yy-button dashed>Default</yy-button>
      <yy-button dashed type="tertiary">Tertiary</yy-button>
      <yy-button dashed type="primary">Primary</yy-button>
      <yy-button dashed type="success">Success</yy-button>
      <yy-button dashed type="warning">Warning</yy-button>
      <yy-button dashed type="error">Error</yy-button>
      <yy-button dashed type="info">Info</yy-button>
      <yy-button dashed type="info" strong>Strong</yy-button>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-size: 14px;
}

.flex {
  display: flex;
  gap: 10px;
}
</style>

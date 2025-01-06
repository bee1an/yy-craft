<script setup lang="ts"></script>

<template>
  <div class="container">
    <yy-card title="段落">
      <yy-p>{{ $t[Math.floor(Math.random() * $t.length) + 1] }}</yy-p>
      <yy-p depth="2">{{ $t[Math.floor(Math.random() * $t.length) + 1] }}</yy-p>
      <yy-p depth="3">{{ $t[Math.floor(Math.random() * $t.length) + 1] }}</yy-p>
    </yy-card>
    <yy-card title="文字">
      <yy-text>Text</yy-text>
      <yy-text>Success</yy-text>
      <yy-text>Warning</yy-text>
      <yy-text>Error</yy-text>
      <yy-text>Info</yy-text>
      <yy-text>Primary depth</yy-text>
      <yy-text>Secondary depth</yy-text>
      <yy-text>Tertiary depth</yy-text>
    </yy-card>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
</style>

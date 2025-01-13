<script setup lang="ts"></script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>分割线</yy-h1>
    <yy-grid cols="10">
      <div>
        <yy-divider></yy-divider>
      </div>

      <div>
        <yy-divider border-style="dashed"></yy-divider>
      </div>

      <div>
        <yy-divider :vertical="true"></yy-divider>
      </div>

      <div>
        <yy-divider :vertical="true" border-style="dashed"></yy-divider>
      </div>

      <div>
        <yy-divider>center</yy-divider>
      </div>

      <div>
        <yy-divider :vertical="true">center</yy-divider>
      </div>

      <div>
        <yy-divider content-position="left">left</yy-divider>
      </div>

      <div>
        <yy-divider :vertical="true" content-position="left">left</yy-divider>
      </div>

      <div>
        <yy-divider content-position="right">right</yy-divider>
      </div>

      <div>
        <yy-divider :vertical="true" content-position="right">right</yy-divider>
      </div></yy-grid
    >
  </div>
</template>

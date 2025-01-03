<script setup lang="ts"></script>

<template>
  <div class="container">
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
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100px;
}

.container > div {
  flex: 1;
  display: flex;
  justify-content: center;
}
</style>

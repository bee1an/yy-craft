<template>
  <yy-popover arrow-class="custom-class" arrow-style="background-color: red;">
    <template #trigger>
      <yy-button>点我</yy-button>
    </template>
    <div>我是内容</div>
  </yy-popover>
</template>

<style scoped>
.custom-class {
  width: 20px;
  height: 20px;
}
</style>

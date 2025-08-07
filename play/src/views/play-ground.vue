<script setup lang="ts">
function fileSelected(files: FileList, event: Event) {
  console.log('change', files, event)
}
</script>

<template>
  <div class="wrapper">
    <yy-upload
      @change="fileSelected"
    >
      <yy-button>
        上传文件
      </yy-button>
    </yy-upload>
  </div>
</template>

<style>
  html {
  color-scheme: dark;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>

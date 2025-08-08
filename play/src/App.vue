<script setup lang="ts">
import { ref, watch } from 'vue'

const theme = ref('dark')

theme.value = localStorage.getItem('theme') ?? 'dark'

watch(theme, () => {
  document.documentElement.classList.toggle('dark', theme.value === 'dark')

  localStorage.setItem('theme', theme.value)
}, { immediate: true })
</script>

<template>
  <yy-config-provider :theme="theme">
    <yy-scrollbar trigger="none">
      <div h-20 flex="~" items-center justify-center text-4xl>
        <yy-icon cursor-pointer>
          <span i-carbon-sun dark:i-carbon-moon text-4xl @click="theme = theme === 'dark' ? 'light' : 'dark'" />
        </yy-icon>
      </div>

      <router-view />
    </yy-scrollbar>
  </yy-config-provider>
</template>

<style>
html.dark {
  color-scheme: dark;
}

* {
  padding: 0;
  margin: 0;
}

#app {
  height: 100vh;
  overflow: hidden;
}

.container_padding {
  padding: 4px 24px 56px 56px;
}

.flex {
  display: flex;
}

.f_column {
  flex-direction: column;
}

.j_center {
  justify-content: center;
}

.a_center {
  align-items: center;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.padding {
  padding-top: 10px;
}

#app .gray02 {
  background-color: rgba(128, 128, 128, 0.2);
}

#app .gray03 {
  background-color: rgba(128, 128, 128, 0.3);
}

#app .gray04 {
  background-color: rgba(128, 128, 128, 0.4);
}

.p5 {
  padding: 5px;
}

.p24 {
  padding: 24px;
}

.bbox {
  box-sizing: border-box;
}

.h100p {
  height: 100%;
}
</style>

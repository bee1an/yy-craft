<script setup lang="ts"></script>

<template>
  <div class="logo">
    <div class="logo-title">Y</div>
    <div class="title">Yy UI</div>
  </div>
</template>

<style scoped>
/* 引入复杂艺术字体 - Google Fonts 示例 */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap');

.logo {
  display: flex;
  align-items: center;
}

.title {
  margin-top: 10px;
  font-size: 20px;
}

/* 更复杂的金色调 Logo 风格标题，使用复杂艺术字体 */
.logo-title {
  padding: 0 10px 0 32px;
  font-family: 'Playfair Display', serif; /* 使用复杂的艺术字体 */
  font-size: 3rem; /* 字体大小 */
  text-align: center; /* 居中对齐 */
  color: #8b6d3b; /* 更低调的金色/暗金色 */
  transform: skewX(-12deg) rotate(-6deg) scale(1.1); /* 更强的不规则倾斜和放大 */
  filter: brightness(1.05) contrast(1.3); /* 温和的亮度和对比度提升 */
}
</style>

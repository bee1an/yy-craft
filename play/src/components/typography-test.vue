<script setup lang="ts"></script>

<template>
  <div class="container">
    <yy-card title="段落">
      <yy-p>{{ $t[Math.floor(Math.random() * $t.length - 1) + 1] }}</yy-p>
      <yy-p depth="2">{{
        $t[Math.floor(Math.random() * $t.length - 1) + 1]
      }}</yy-p>
      <yy-p depth="3">{{
        $t[Math.floor(Math.random() * $t.length - 1) + 1]
      }}</yy-p>
    </yy-card>
    <yy-card title="文字">
      <yy-p>你可以给文字提供不同的状态</yy-p>
      <yy-text>Text </yy-text>
      <yy-text type="success">Success </yy-text>
      <yy-text type="warning">Warning </yy-text>
      <yy-text type="error">Error </yy-text>
      <yy-text type="info">Info </yy-text>
      <yy-text depth="1">Primary depth </yy-text>
      <yy-text depth="2">Secondary depth </yy-text>
      <yy-text depth="3">Tertiary depth </yy-text>
      <yy-text strong>Strong </yy-text>
      <yy-text italic>Italic </yy-text>
      <yy-text underline>Underline </yy-text>
      <yy-text delete>Delete </yy-text>
      <yy-text tag="div">使用DIV作为标签 </yy-text>
      <yy-text code>Code </yy-text>
      <yy-text code delete>Code </yy-text>
    </yy-card>
    <yy-card title="链接">
      <yy-p>普通的链接,只是多了一点样式</yy-p>
      <yy-a href="https://music.163.com/#/song?id=67411" target="_blank"
        >Shall We Talk
      </yy-a>
    </yy-card>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  align-items: flex-start;
}
</style>

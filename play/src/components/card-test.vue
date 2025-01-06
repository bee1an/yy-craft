<script setup lang="ts"></script>

<template>
  <yy-flex>
    <yy-flex class="wapper" vertical>
      <yy-card title="标题" segmented>
        内容
        <template #footer>#footer</template>
        <template #action>#action</template>
      </yy-card>
      <yy-card title="标题" :segmented="{ content: 'soft', footer: 'soft' }">
        内容
        <template #footer>#footer</template>
        <template #action>#action</template>
      </yy-card>
    </yy-flex>
    <yy-flex class="wapper" vertical>
      <yy-card title="标题">
        <template #cover>
          <img
            src="https://images.unsplash.com/photo-1735437629103-0fac198c7c2e"
          />
        </template>
        <template #headerExtra>#headerExtra</template>
        内容
        <template #footer>#footer</template>
        <template #action>#action</template>
      </yy-card>
    </yy-flex>

    <yy-flex class="wapper" vertical>
      <yy-card title="小卡片" size="small">内容</yy-card>
      <yy-card title="中卡片" size="medium">内容</yy-card>
      <yy-card title="大卡片" size="large">内容</yy-card>
      <yy-card title="超大卡片" size="huge">内容</yy-card>
    </yy-flex>
    <yy-flex class="wapper" vertical>
      <yy-card title="无边框" :bordered="false">内容</yy-card>
      <yy-card title="可悬浮" hoverable>内容</yy-card>
    </yy-flex>
  </yy-flex>
</template>

<style scoped>
.wapper {
  width: 300px;
}

img {
  width: 100%;
}
</style>

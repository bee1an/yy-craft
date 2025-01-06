<script setup lang="ts"></script>

<template>
  <div class="container">
    <yy-card title="基本使用">
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
    </yy-card>

    <yy-card title="分段">
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
    </yy-card>

    <yy-card title="尺寸">
      <yy-flex class="wapper" vertical>
        <yy-card title="小卡片" size="small">内容</yy-card>
        <yy-card title="中卡片" size="medium">内容</yy-card>
        <yy-card title="大卡片" size="large">内容</yy-card>
        <yy-card title="超大卡片" size="huge">内容</yy-card>
      </yy-flex>
    </yy-card>
    <yy-card title="边框">
      <yy-card title="无边框" :bordered="false">内容</yy-card>
    </yy-card>
    <yy-card title="可悬浮">
      <yy-flex vertical>
        <yy-card title="可悬浮" :bordered="false" hoverable>内容</yy-card>
        <yy-card title="可悬浮" hoverable>内容</yy-card>
      </yy-flex>
    </yy-card>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}

.wapper {
  max-width: 300px;
}

img {
  width: 100%;
}
</style>

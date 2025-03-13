<script setup lang="ts"></script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>卡片</yy-h1>
    <yy-grid cols="3" :gap="10">
      <yy-flex vertical>
        <yy-card title="基本使用">
          <yy-flex class="wapper" vertical>
            <yy-card title="标题">
              <template #cover>
                <img src="https://avatars.githubusercontent.com/u/137426505" />
              </template>
              <template #headerExtra>#headerExtra</template>
              内容
              <template #footer>#footer</template>
              <template #action>#action</template>
            </yy-card>
          </yy-flex>
        </yy-card>

        <yy-card title="可悬浮">
          <yy-flex vertical>
            <yy-card title="可悬浮" :bordered="false" hoverable>内容</yy-card>
            <yy-card title="可悬浮" hoverable>内容</yy-card>
          </yy-flex>
        </yy-card>
      </yy-flex>
      <yy-flex vertical>
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
      </yy-flex>

      <yy-flex vertical>
        <yy-card title="分段">
          <yy-flex class="wapper" vertical>
            <yy-card title="标题" segmented>
              内容
              <template #footer>#footer</template>
              <template #action>#action</template>
            </yy-card>
            <yy-card
              title="标题"
              :segmented="{ content: 'soft', footer: 'soft' }"
            >
              内容
              <template #footer>#footer</template>
              <template #action>#action</template>
            </yy-card>
          </yy-flex>
        </yy-card>
      </yy-flex>
    </yy-grid>
  </div>
</template>

<style scoped>
.wapper {
  max-width: 300px;
}

img {
  width: 100%;
}
</style>

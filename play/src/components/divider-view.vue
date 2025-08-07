<script setup lang="ts"></script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>
      分割线
    </yy-h1>
    <yy-grid cols="3" :gap="10">
      <yy-flex vertical>
        <yy-card title="基本使用">
          <yy-p>非常简单</yy-p>
          <yy-divider />
          <yy-p>或者你可以设置为虚线</yy-p>
          <yy-divider border-style="dashed" />
        </yy-card>
      </yy-flex>
      <yy-flex vertical>
        <yy-card title="垂直分割线">
          <yy-p>当然它可以垂直分割</yy-p>
          <yy-divider border-style="dashed" />
          <yy-p>或者垂直的虚线</yy-p>
          <div style="height: 100px">
            <yy-divider border-style="dashed" vertical />
          </div>
        </yy-card>
      </yy-flex>

      <yy-gi span="3">
        <yy-flex vertical>
          <yy-card title="添加文字">
            <yy-p>
              通过<yy-text code>
                content-position
              </yy-text>添加到<yy-text code>
                left
              </yy-text>
              <yy-text code>
                center
              </yy-text>
              <yy-text code>
                right
              </yy-text>位置
            </yy-p>
            <yy-divider content-position="left">
              left
            </yy-divider>
            <yy-divider>center</yy-divider>
            <yy-divider content-position="right">
              right
            </yy-divider>
            <yy-p>当然也可以是垂直的</yy-p>
            <div style="height: 100px; display: flex">
              <yy-divider :vertical="true" content-position="left">
                left
              </yy-divider>
              <yy-divider :vertical="true">
                center
              </yy-divider>
              <yy-divider :vertical="true" content-position="right">
                right
              </yy-divider>
            </div>
          </yy-card>
        </yy-flex>
      </yy-gi>
    </yy-grid>
  </div>
</template>

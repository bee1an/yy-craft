<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)

const value1 = ref(false)
const indeterminate = ref(false)
</script>

<template>
  <div class="container_padding">
    <yy-h1 prefix align-text>
      复选框
    </yy-h1>

    <yy-grid cols="2" :gap="10">
      <yy-flex vertical>
        <yy-card title="基本使用">
          <yy-checkbox v-model="value" :label="$t[0]" />
        </yy-card>
      </yy-flex>
      <yy-flex vertical>
        <yy-card title="部分选中">
          <yy-p>
            设置复选框<yy-text code>
              indeterminate
            </yy-text>将复选款设置为部分选中
          </yy-p>
          <yy-p>
            <yy-text type="error">
              Bug: 取消部分选中状态时,部分选中状态会变成选中状态再取消
            </yy-text>
          </yy-p>
          <yy-flex>
            <yy-checkbox
              v-model="value1"
              :label="$t[0]"
              :indeterminate="indeterminate"
            />
            <yy-checkbox v-model="value1" label="选中" />
            <yy-checkbox v-model="indeterminate" label="部分选中" />
          </yy-flex>
        </yy-card>
      </yy-flex>
      <yy-flex vertical />
    </yy-grid>

    <!-- <yy-checkbox
      v-model="value"
      :label="$t[0]"
      :indeterminate="true"
    ></yy-checkbox>
    <yy-checkbox :model-value="value"></yy-checkbox> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(false)
const contentWidth = ref(800) // 设置一个较大的宽度来测试横向滚动条

// eslint-disable-next-line no-console
const log = console.log
</script>

<template>
  <div class="p-20px  min-h-screen">
    <yy-h1 prefix align-text class="mb-4 text-2xl font-bold text-gray-800">
      Sider折叠bug复现
    </yy-h1>
    <yy-p class="mb-6 text-gray-600">
      复现sider组件折叠后出现横向滚动条的问题
    </yy-p>

    <yy-button class="mb-20px" @click="collapsed = !collapsed">
      {{ collapsed ? '展开' : '收起' }} Sider
    </yy-button>

    <yy-layout has-sider class="h-400px border-1 border-gray rounded-lg overflow-hidden">
      <yy-layout-sider
        bordered
        :collapsed="collapsed"
        width="200"
        collapsed-width="50"
        content-class="p-10px hfull"
        @collapsed="log('sider collapsed')"
        @expanded="log('sider expanded')"
      >
        <div class="w-280px hfull bg-blue-100 p-10px rounded">
          <div class="mb-2 font-medium text-blue-800">
            这是侧边栏内容
          </div>
          <div class="mb-2 text-blue-700">
            当侧边栏收起时
          </div>
          <div class="mb-2 text-blue-700">
            如果内容超出容器宽度
          </div>
          <div class="mb-2 text-blue-700">
            可能会出现横向滚动条
          </div>
          <div class="my-2 border-b border-blue-200" />
          <div class="mb-1 text-blue-600">
            更多内容...
          </div>
          <div class="mb-1 text-blue-600">
            更多内容...
          </div>
          <div class="text-blue-600">
            更多内容...
          </div>
        </div>
      </yy-layout-sider>

      <yy-layout-content class="p-20px overflow-auto">
        <div :style="{ width: `${contentWidth}px` }" class="bg-white p-20px rounded-lg shadow-sm">
          <h3 class="mb-4 text-xl font-semibold text-gray-800">
            主内容区域
          </h3>
          <p class="mb-3 text-gray-600">
            这是主内容区域，设置了固定宽度来测试横向滚动条问题。
          </p>
          <p class="mb-3 text-gray-600">
            当sider折叠后，如果这个内容区域的宽度超出了容器，就会出现横向滚动条。
          </p>
          <p class="mb-6 text-gray-700 font-medium">
            当前内容宽度: {{ contentWidth }}px
          </p>

          <yy-flex gap="small" class="my-20px">
            <yy-button variant="outlined" @click="contentWidth = Math.max(400, contentWidth - 100)">
              减少宽度
            </yy-button>
            <yy-button variant="outlined" @click="contentWidth += 100">
              增加宽度
            </yy-button>
          </yy-flex>

          <div v-for="i in 5" :key="i" class="my-10px p-10px bg-gray rounded">
            这是内容段落 {{ i }} - 用来填充页面内容以测试滚动行为
          </div>
        </div>
      </yy-layout-content>
    </yy-layout>

    <yy-card title="Bug说明" class="mt-20px">
      <yy-p class="text-gray-600">
        在这个示例中，当你点击"收起"按钮将sider折叠后，如果主内容区域的宽度超出了容器，
        就会出现横向滚动条。这是需要修复的bug。
      </yy-p>
    </yy-card>
  </div>
</template>

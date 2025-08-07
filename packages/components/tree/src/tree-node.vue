<script setup lang="ts">
import type { CreateNamespace } from '@yy-craft/utils/src/create'
import YyIcon from '@yy-craft/components/icon/src/icon.vue'
import { inject } from 'vue'
import TLoading from './icons/Loading'
import TSwitcher from './icons/Switcher'
import { InjectBem } from './tree'
import { treeNodeEmits, treeNodeProps } from './tree-node'
import TreeNodeContent from './tree-node-content'

defineProps(treeNodeProps)

const emits = defineEmits(treeNodeEmits)

const bemBase = inject(InjectBem) as CreateNamespace
</script>

<template>
  <div
    :class="bemBase.b('node').b('wrapper').value"
    @dragenter="emits('dragenter', $event, node)"
    @dragend="emits('dragend', $event, node)"
    @dragover.prevent="emits('dragover', $event, node)"
    @drop.prevent="emits('drop', $event, node)"
  >
    <div
      :class="[
        bemBase.b('node').value,
        bemBase.b('node').m(node.isExpanded && 'expanded').value,
        bemBase.b('node').m(node.isLeaf && 'leaf').value,
        bemBase.b('node').m(node.isLoading && 'loading').value,
        bemBase.b('node').m(node.isSelected && 'selected').value,
      ]"
      :draggable="draggable"
      @click="emits('toggleSelect', node)"
      @dragstart="emits('dragstart', $event, node)"
    >
      <!-- 节点缩进 -->
      <div
        v-for="item in node.level - 1"
        :key="item"
        :class="bemBase.b('node').b('indent').value"
      />

      <!-- 图标 -->
      <div
        :class="bemBase.b('node').b('switcher').value"
        @click.stop="emits('toggleExpand', node)"
      >
        <div :class="bemBase.b('node').b('switcher').e('icon').value">
          <YyIcon v-if="node.isLoading" :size="12" color="green">
            <TLoading />
          </YyIcon>
          <YyIcon v-else>
            <TSwitcher />
          </YyIcon>
        </div>
      </div>

      <!-- 节点内容 -->
      <div :class="bemBase.b('node').e('text').value">
        <TreeNodeContent :node="node" />
      </div>

      <!-- 拖动边框提示 -->
      <div
        v-if="node.dragBorder"
        :class="bemBase.b('node').e('border').value"
      />
      <div
        v-if="node.dragBorderBottom"
        :class="[
          bemBase.b('node').e('border').value,
          bemBase.b('node').e('border').m('bottom').value,
        ]"
        :style="{ width: `${node.dragBorderBottom}px` }"
      />
    </div>
  </div>
</template>

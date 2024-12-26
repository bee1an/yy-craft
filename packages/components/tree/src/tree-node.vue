<script setup lang="ts">
import { inject } from 'vue'
import { InjectBem } from './tree'
import { CreateNamespace } from '@yy-ui/utils'
import YyIcon from '@yy-ui/components/icon/src/icon.vue'
import TSwitcher from './icons/Switcher'
import TLoading from './icons/Loading'
import TreeNodeContent from './tree-node-content'
import { TreeNodeEmitsType, treeNodeProps } from './tree-node'

defineProps(treeNodeProps)

const emits = defineEmits<TreeNodeEmitsType>()

const bemBase = inject(InjectBem) as CreateNamespace
</script>

<template>
  <div
    :class="bemBase.b('node').b('warpper').value"
    @dragenter="emits('dragenter', $event, node)"
    @dragend="emits('dragend', $event, node)"
    @dragover.prevent="emits('dragover', $event, node)"
    @drop.prevent="emits('drop', $event, node)"
  >
    <div
      :class="[
        bemBase.b('node').value,
        bemBase.is('expanded', node.isExpanded),
        bemBase.is('leaf', node.isLeaf),
        bemBase.is('loading', node.isLoading),
        bemBase.is('selected', node.isSelected)
      ]"
      :draggable="draggable"
      @click="emits('toggleSelect', node)"
      @dragstart="emits('dragstart', $event, node)"
    >
      <!-- 节点缩进 -->
      <div
        :class="bemBase.b('node').b('indent').value"
        v-for="item in node.level - 1"
        :key="item"
      ></div>

      <!-- 图标 -->
      <div
        :class="bemBase.b('node').b('switcher').e('icon').value"
        @click.stop="emits('toggleExpand', node)"
      >
        <yy-icon v-if="node.isLoading" :size="12" color="green">
          <t-loading />
        </yy-icon>
        <yy-icon v-else>
          <t-switcher />
        </yy-icon>
      </div>

      <!-- 节点内容 -->
      <div :class="bemBase.b('node').e('text').value">
        <tree-node-content :node="node" />
      </div>

      <!-- 拖动边框提示 -->
      <div
        v-if="node.dragBorder"
        :class="bemBase.b('node').e('border').value"
      ></div>
      <div
        v-if="node.dragBorderBottom"
        :class="bemBase.b('node').e('border').m('bottom').value"
        :style="{ width: node.dragBorderBottom + 'px' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const props = defineProps<{ src: string }>()

const comp = defineAsyncComponent(() => import(props.src))
</script>

<template>
	<comp></comp>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showPopover = ref(false)
const x = ref(0)
const y = ref(0)
const placement = ref()

const placements = [
	'top',
	'bottom',
	'left',
	'right',
	'top-start',
	'top-end',
	'bottom-start',
	'bottom-end',
	'left-start',
	'left-end',
	'right-start',
	'right-end'
]

let timerId: number
const clickHandle = (event: MouseEvent) => {
	const { pageX, pageY } = event
	x.value = pageX
	y.value = pageY
	showPopover.value = true

	placement.value = placements[Math.floor(Math.random() * placements.length)]

	clearTimeout(timerId)
	timerId = window.setTimeout(() => {
		showPopover.value = false
	}, 3000)
}
</script>

<template>
	<div class="playground">
		<yy-popover :showPopover="showPopover" trigger="manual" :x="x" :y="y" :placement="placement"
			>有用</yy-popover
		>

		<div class="bg" @click="clickHandle"></div>
	</div>
</template>

<style scoped>
.playground {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

.bg {
	width: 200px;
	height: 200px;
	background: wheat;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>

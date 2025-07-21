<template>
	<yy-popover :to="false" wrapper wrapper-class="wrapper" wrapper-style="border: 1px solid #ccc">
		<template #trigger>
			<yy-button>点我</yy-button>
		</template>
		<div>我是内容</div>
	</yy-popover>
</template>

<style scoped>
.wrapper {
	display: inline-flex;
	border-radius: 10px;
	padding: 10px;
}
</style>

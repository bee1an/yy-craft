<template>
	<yy-popover content-class="custom-content" content-style="color: red; font-weight: bold;">
		<template #trigger>
			<yy-button>点我</yy-button>
		</template>
		<div>我是内容</div>
	</yy-popover>
</template>

<style scoped>
.custom-content {
	background-color: #f0f0f0;
	padding: 10px;
	border-radius: 4px;
}
</style>

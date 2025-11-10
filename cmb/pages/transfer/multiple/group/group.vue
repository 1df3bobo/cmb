<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" service-btn title="我的转账群组">
		</navbar>
		<view class="main">
			<image class="content" src="/static/home/zzqz.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.main {
		padding-top: 350rpx;

		.content {
			width: 750rpx;
			height: 183rpx;
		}
	}

	.content {}
</style>
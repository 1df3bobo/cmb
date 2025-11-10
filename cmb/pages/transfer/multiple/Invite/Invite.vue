<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" service-btn title="邀请转账伙伴">
		</navbar>
		<view class="main">
			<view class="content">
				<image class="content-image" src="/static/home/ewm.png" mode=""></image>
				<text>转账伙伴邀请码</text>
			</view>
			<view class="null">
				您还没有好友邀请~
			</view>
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
		width: 750rpx;

		.content {
			width: 690rpx;
			height: 101rpx;
			display: flex;
			align-items: center;
			margin: auto;
			background-color: #ffffff;
			padding: 0 30rpx;
			box-sizing: border-box;
			color: #2F6EE5;
			font-size: 32rpx;

			.content-image {
				width: 42rpx;
				height: 42rpx;
				margin-right: 16rpx;
			}
		}

		.null {
			position: fixed;
			text-align: center;
			width: 750rpx;
			top: 60%;
			font-size: 24rpx;
			color: #333;
		}
	}
</style>
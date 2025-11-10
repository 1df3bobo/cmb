<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" left-icon="/static/icon/back.png" title="预约转账">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`}">
					<text>历史计划</text>
				</view>
			</slot>
		</navbar>
		<view class="pages">
			<image class="page-image" src="/static/pages/yyzz.png" mode="widthFix"></image>
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

<style lang="scss" scoped>
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.pages {
		width: 750rpx;
		height: auto;

		.page-image {
			width: 750rpx;
			height: auto;
		}
	}

	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		padding-right: 40rpx;
		color: #111;
		font-size: 26rpx;
		font-weight: 400;
		position: absolute;

		.nav-customer {
			width: 40rpx;
			height: 40rpx;
			margin-left: 36rpx;
		}


	}
</style>
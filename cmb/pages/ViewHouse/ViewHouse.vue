<template>
	<view class="app">
		<navbar :placeholder="false" title="看房">
			<view class="nav">
				<view class="nav-content">
					<image class="nav-icon" src="/static/icon/address-icon.png" mode=""></image>
					<text>合肥</text>
				</view>
				<view class="btn">关注的房</view>
			</view>
		</navbar>
		<view class="main">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.nav {
		width: 500rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: absolute;
		right: 30rpx;
		box-sizing: border-box;
		z-index: 100;

		.btn {
			color: #000000;
			font-size: 22rpx;
			margin-left: 23rpx;
		}

		.nav-content {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			color: #000000;
			font-size: 22rpx;
		}

		.nav-icon {
			width: 40rpx;
			height: 40rpx;
		}

	}

	.main {
		width: 100%;
		background-image: url(/static/pages/kf.png);
		background-size: 750rpx 2387rpx;
		min-height: 2387rpx;
		background-position: top;
		background-repeat: no-repeat;
	}
</style>
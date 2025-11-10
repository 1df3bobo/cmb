<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" more-btn title="我的卡券">
			<view class="nav">
				<view class="nav-content">
					<image class="nav-icon" src="/static/icon/icon11.png" mode=""></image>
					<text>热门活动</text>
				</view>
			</view>
		</navbar>
		<view class="main">
				<image class="pages" src="/static/pages/wdkq_1.png" mode="widthFix"></image>
			<view class="footer">
				<view class="footer-pl"></view>
				<view class="footer-tabs">
					<view class="footer-tab-item"></view>
					<view class="footer-tab-item"></view>
				</view>
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
		width: 750rpx;
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
		right: 126rpx;
		box-sizing: border-box;
		z-index: 100;

		.nav-content {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			color: #000000;
			font-size: 20rpx;
		}

		.nav-icon {
			width: 43rpx;
			height: 43rpx;
		}

	}

	.pages {
		width: 750rpx;
	}

	.footer {
		width: 750rpx;
		position: relative;

		.footer-pl {
			width: 750rpx;
			height: 162rpx;
		}

		.footer-tabs {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 750rpx;
			height: 162rpx;
			background-image: url(/static/pages/wdkq_2.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			z-index: 100;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.footer-tab-item {
				width: 30%;
				height: 100%;
			}
		}
	}

	.main {
		width: 750rpx;
		position: relative;
	}
</style>
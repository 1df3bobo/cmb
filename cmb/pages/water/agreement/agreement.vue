<template>
	<view>
		<navbar bg-color="#f8f8f8">
			<view class="nav">
				<image class="nav-home" src="/static/navIcon/fangzi.png" mode=""></image>
				<view class="title">流水打印</view>
				<image class="nav-right" src="/static/navIcon/xiaochengxu.png" mode=""></image>
			</view>
		</navbar>
		<view class="pages">
			<image class="page-image" :src="pageImage" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageImage: '',
			};
		},
		onLoad(options) {
			if (options.pageImage) {
				this.pageImage = options.pageImage
			}
		},
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.nav {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 400;
		font-size: 36rpx;
		padding-left: 126rpx;
		padding-right: 26rpx;
		box-sizing: border-box;

		.nav-right {
			width: 172rpx;
			height: 72rpx;
		}

		.nav-home {
			width: 44rpx;
			height: 44rpx;

		}

	}

	.pages {
		width: 750rpx;
		height: auto;

		.page-image {
			width: 750rpx;
			height: auto;
		}
	}
</style>
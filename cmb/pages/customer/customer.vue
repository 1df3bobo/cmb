<template>
	<view class="app">
		<navbar :placeholder="false" bg-color="transparent">
			<view class="nav">
				<view class="nav-content">
					<image class="nav-icon" src="/static/icon/jingyin.png" mode=""></image>
				</view>
			</view>
		</navbar>
		<view class="main">
			<image class="pages-image" src="/static/pages/kfxz_1.png" mode="widthFix"></image>
			<image class="pages-btn" src="/static/pages/kfxz_2.png" mode=""></image>
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
		width: 100%;

		.pages-image {
			width: 100%;
		}

		.pages-btn {
			position: fixed;
			width: 750rpx;
			height: 112rpx;
			bottom: 0;
			left: 0;
		}
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

		.nav-content {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.nav-icon {
			width: 48rpx;
			height: 48rpx;
		}

	}
</style>
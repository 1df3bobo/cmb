<template>
	<view class="app">
		<navbar bg-color="#f8f8f8">
			<view class="nav">
				<image class="nav-home" src="/static/navIcon/fangzi.png" mode=""></image>
				<view class="title">流水打印</view>
				<image class="nav-right" src="/static/navIcon/xiaochengxu.png" mode=""></image>
			</view>
		</navbar>
		<view class="main">
			<swiper :interval="3000" @change="change" :current="current" :duration="1000" class="swiper">
				<swiper-item class="swiper-item">
					<view class="swiper-item-content">
						<image class="image-content" src="/static/pages/ylyl_1.png" mode="widthFix"></image>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<view class="swiper-item-content">
						<image class="image-content" src="/static/pages/ylyl_2.png" mode="widthFix"></image>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<view class="swiper-item-content">
						<image class="image-content" src="/static/pages/ylyl_3.png" mode="widthFix"></image>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<view class="swiper-item-content">
						<image class="image-content" src="/static/pages/ylyl_4.png" mode="widthFix"></image>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<view class="swiper-item-content">
						<image class="image-content" src="/static/pages/ylyl_5.png" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="footer">
				{{current+1}}/5含客户摘要
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0
			};
		},
		methods: {
			change(e) {
				this.current = e.detail.current
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 100%;
		height: 100vh;
		background-color: #333;
		display: flex;
		flex-direction: column;

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

	.main {
		width: 100%;
		flex: 1;
		height: 100px;
	}

	.footer {
		width: 750rpx;
		height: 110rpx;
		background-color: #555;
		position: fixed;
		bottom: 0;
		left: 0;
		text-align: center;
		line-height: 110rpx;
		color: #fff;
		font-size: 28rpx;
	}

	.swiper {
		width: 100%;
		height: 100%;
		padding-top: 150rpx;
		box-sizing: border-box;

		.swiper-item {
			width: 100%;
			height: 762rpx;

			.swiper-item-content {
				height: 762rpx;
				display: flex;
				align-items: center;
				justify-content: center;

			}

			.image-content {
				display: block;
				width: 100%;
				height: 533rpx;
			}
		}
	}
</style>
<template>
	<view class="app" :style="{backgroundColor:bgColor}">
		<navbar :left-icon="opacity >0.5?'/static/icon/return@2x.png':'/static/icon/back.png'" :placeholder="false"
			:bg-color="`rgba(255,255,255,${1-opacity})`">
			<view class="nav">
				<image class="search-icon" @click="show = true"
					:src="opacity >0.5?'/static/icon/fenxiang_bai.png':'/static/icon/fenxiang_hei.png'" mode=""></image>
			</view>
		</navbar>
		<view class="pages">
			<image class="page-image" :src="pageImage" mode="widthFix"></image>
		</view>
		<u-popup :show="show" @close="show = false" zIndex="10" :overlayStyle="{zIndex:10}" round="8rpx" mode="bottom">
			<view class="popup" @click="show = false">
				<view class="popup-list">
					<view class="popup-item">
						<image class="popup-item-image" src="/static/icon/wx_icon.png"></image>
						<text>微信好友</text>
					</view>
					<view class="popup-item">
						<image class="popup-item-image" src="/static/icon/pyq_icon.png"></image>
						<text>朋友圈</text>
					</view>
				</view>
				<view class="footer">取消</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				pageImage: '/static/pages/sqrb.png',
				opacity: 1,
				show: false

			};
		},
		onLoad(options) {

		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight']),
		},
		onPageScroll(e) {
			var scrollTop = e.scrollTop;
			if (scrollTop >= this.statusBarHeight) {
				this.opacity = 0
				return
			} else if (scrollTop == 0) {
				this.opacity = 1
				return
			}
			this.opacity = 1 - (scrollTop / this.statusBarHeight)
		},
	}
</script>

<style lang="scss">
	.app {
		width: 750rpx;
		min-height: 100vh;
	}

	.popup {
		width: 100%;
		padding-top: 30rpx;

		.footer {
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #111;
			font-size: 32rpx;
			margin-top: 30rpx;
			;
			border-top: 1rpx solid #ccc;
		}

		.popup-list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 200rpx;
			box-sizing: border-box;

			.popup-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				color: #666;
				font-size: 24rpx;
				;

				.popup-item-image {
					width: 88rpx;
					height: 88rpx;
					margin-bottom: 20rpx;
				}
			}
		}
	}

	.nav {
		width: 500rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		right: 30rpx;
		position: absolute;
		box-sizing: border-box;
		z-index: 100;

		.search-icon {
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
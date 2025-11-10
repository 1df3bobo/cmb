<template>
	<view>
		<navbar :left-icon="opacity >0.5?'/static/icon/return@2x.png':'/static/icon/back.png'"
			:aiBtnIcon="opacity >0.5?'/static/icon/icon5-w.png':'/static/icon/icon5.png'" ai-btn more-btn
			:more-btn-icon="opacity >0.5?'/static/icon/icon3-w.png':'/static/icon/icon3.png'" :placeholder="false"
			:bg-color="`rgba(255,255,255,${1-opacity})`">
		</navbar>
		<view class="pages"></view>
		<view class="footer">
			<view class="footer-pl"></view>
			<view class="footer-content" @click="goBack"></view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				opacity: 1,
			}
		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight']),
		},
		onPageScroll(e) {
			var scrollTop = e.scrollTop;
			if (scrollTop >= this.navBarHeight) {
				this.opacity = 0
				return
			} else if (scrollTop == 0) {
				this.opacity = 1
				return
			}
			this.opacity = 1 - (scrollTop / this.navBarHeight)
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.footer {
		width: 750rpx;

		.footer-pl {
			width: 750rpx;
			height: 165rpx;
		}

		.footer-content {
			width: 750rpx;
			height: 165rpx;
			background-image: url(/static/pages/zbsf2.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: 750rpx 165rpx;
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}

	.pages {
		width: 750rpx;
		height: 5280rpx;
		background-image: url(/static/pages/zbsf.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 5280rpx;
	}

	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		padding: 0 0 0 56rpx;
		box-sizing: border-box;

		.nav-scan,
		.nav-customer,
		.nav-message {
			width: 40rpx;
			height: 40rpx;
		}

		.nav-customer {
			margin-right: 46rpx;
		}

		.nav-search {
			width: 445rpx;
			height: 58rpx;
			margin: 0 34rpx;
			box-sizing: border-box;
			border-radius: 30rpx 30rpx 30rpx 30rpx;
			border: 1rpx solid #E2E2E2;
			display: flex;
			align-items: center;
			padding-left: 20rpx;

			.nav-search-icon {
				width: 40rpx;
				height: 40rpx;
			}

			.search-swiper {
				flex: 1;
				height: 58rpx;
				display: flex;
				align-items: center;
				margin-left: 10rpx;
				color: #FFFFFF;

				.swiper-item {
					height: 58rpx;
					display: flex;

					font-size: 28rpx;
					font-weight: 400;
					align-items: center;
				}
			}
		}
	}
</style>
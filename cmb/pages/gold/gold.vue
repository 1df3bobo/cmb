<template>
	<view>
		<navbar :left-icon="opacity >0.5?'/static/icon/return@2x.png':'/static/icon/back.png'"
			:aiBtnIcon="opacity >0.5?'/static/icon/icon5-w.png':'/static/icon/icon5.png'" ai-btn more-btn
			:more-btn-icon="opacity >0.5?'/static/icon/icon3-w.png':'/static/icon/icon3.png'" :placeholder="false"
			:bg-color="`rgba(255,255,255,${1-opacity})`">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`}">
					<view class="nav-search"
						:style="{border:opacity<1?'1rpx solid #ccc': '1rpx solid #E2E2E2'}">
						<image class="nav-search-icon"
							:src="opacity<1?'/static/icon/search-black.png':'/static/icon/search.png'"></image>
					</view>
				</view>
			</slot>
		</navbar>
		<view class="pages"></view>
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
	.pages {
		width: 750rpx;
		height: 5709rpx;
		background-image: url(/static/pages/hj.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 5709rpx;
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
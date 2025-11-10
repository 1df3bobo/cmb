<template>
	<view>
		<navbar  service-btn showBack bg-color="#f8f8f8">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`,color:'#111111'}">
					<view class="address">
						<text>全国</text>
						<image class="address-icon" src="/static/icon/greyDown.png"></image>
					</view>
					<view :class="['search','search-fix']">
						<image class="nav-search-icon" src="/static/icon/search-grey.png"></image>
					</view>
				</view>
			</slot>
		</navbar>
		<view class="main"></view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				opacity: 1
			}
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
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding-right: 140rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		font-weight: 400;
		position: absolute;
		padding-left: 100rpx;
		box-sizing: border-box;

		.address {
			display: flex;
			align-items: center;
			margin-right: 30rpx;

			.address-icon {
				width: 24rpx;
				height: 24rpx;
				margin-left: 10rpx;
			}
		}

		.search {
			flex: 1;
			height: 50rpx;
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			padding-left: 10rpx;
			border: 1rpx solid #fff;
			margin-right: 10rpx;

			&.search-fix {
				border: 1rpx solid #ccc;
				color: #ccc;
			}

			.nav-search-icon {
				width: 40rpx;
				height: 40rpx;
				padding-right: 16rpx;
			}
		}

		.nav-customer {
			width: 40rpx;
			height: 40rpx;
			margin-left: 20rpx;
		}


	}

	.main {
		width: 750rpx;
		height: 4295rpx;
		background-image: url(/static/pages/djj.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 4267rpx;
	}
</style>
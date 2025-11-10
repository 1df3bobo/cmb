<template>
	<view>
		<navbar :left-icon="opacity >0.5?'/static/icon/return@2x.png':'/static/icon/back.png'" :placeholder="false"
			:bg-color="`rgba(255,255,255,${1-opacity})`">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`,color:opacity >0.5?'#ffffff':'#111111'}">
					<view :class="['search',opacity<1?'search-fix':'']">
						<image class="nav-search-icon"
							:src="opacity<1?'/static/icon/search-grey.png':'/static/icon/search.png'"></image>
						<text>鹏华丰禄</text>
					</view>
					<image class="nav-customer"
						:src="opacity<1?'/static/icon/customer-black.png':'/static/icon/customer-white.png'"></image>
				</view>
			</slot>
		</navbar>
		<view class="main">

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
		padding-right: 40rpx;
		color: #ccc;
		font-size: 26rpx;
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
		height: 4656rpx;
		background-image: url(/static/pages/bdsx.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 4656rpx;
	}
</style>
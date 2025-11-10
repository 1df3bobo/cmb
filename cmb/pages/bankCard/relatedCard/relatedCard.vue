<template>
	<view>
		<view class="app">
			<navbar title="云闪付网络支付" more-btn service-btn bg-color="#F8F8F8"></navbar>
			<view class="main">
				<view class="top">
					<view class="card">
						<image class="icon" src="/static/transfer/zsLogo.png" mode=""></image>
						<view class="info">
							<view class="info-name">招商银行储蓄卡</view>
							<view class="info-number">{{repeatCardNumber(bankInfo.bankCard)}}</view>
						</view>
						<view class="chenked"></view>
					</view>
				</view>
				<view class="bottom"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {
		repeatCardNumber
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				repeatCardNumber: repeatCardNumber
			}
		},
		computed: {
			...mapState(['userInfo']),
			bankInfo() {
				if (this.userInfo.bankList.lengtn <= 0) return {}
				return this.userInfo.bankList[0]
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
		width: 750rpx;

		.top {
			height: 784rpx;
			width: 750rpx;
			box-sizing: border-box;
			background-image: url(/static/pages/ysf.png);
			background-position: top;
			background-repeat: no-repeat;
			background-size: 750rpx 784rpx;
			box-sizing: border-box;
			padding-top: 650rpx;

			.card {
				width: 750rpx;
				display: flex;
				align-items: center;
				padding-left: 60rpx;
				box-sizing: border-box;
				padding-right: 60rpx;

				.icon {
					width: 40rpx;
					height: 40rpx;
					margin-right: 30rpx;
				}

				.chenked {
					width: 36rpx;
					height: 36rpx;
					border-radius: 36rpx;
					border: 1rpx solid #999;


				}

				.info {
					flex: 1;

					.info-name {
						font-size: 32rpx;
						color: #333;
					}

					.info-number {
						font-size: 24rpx;
						color: #666;
						font-weight: 700;
					}
				}
			}
		}

		.bottom {
			height: 486rpx;
			width: 750rpx;
			box-sizing: border-box;
			background-image: url(/static/pages/ysf02.png);
			background-position: top;
			background-repeat: no-repeat;
			background-size: 750rpx 486rpx;
			box-sizing: border-box;
		}
	}
</style>
<template>
	<view class="app">
		<navbar title="转账记录查询" bg-color="#f8f8f8" more-btn service-btn>
		</navbar>
		<view class="main">
			<view class="item active">
				<view>交易完成（实时到账）</view>
				<view>报文</view>
				<view>号：{{info.certificateNo}}（可凭此号码前往对方银行查询）</view>
			</view>
			<view class="item">
				<view>人行已提交收款银行处理</view>
			</view>
			<view class="item border-none">
				<view>已提交人行支付系统处理</view>
				<view>{{info.transactionTime}}</view>
			</view>
			<view class="dots">
				<view class="dot active">
					<view class="dot-content"></view>
				</view>
				<view class="dot">
					<view class="dot-content"></view>
				</view>
				<view class="dot">
					<view class="dot-content"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {

				}
			}
		},
		onLoad(options) {
			if (options.info) {
				this.info = JSON.parse(options.info)
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 750rpx;
		padding: 89rpx 36rpx 0 104rpx;
		box-sizing: border-box;
		position: relative;

		&:before {
			content: '';
			width: 2rpx;
			height: 380rpx;
			top: 100rpx;
			background-color: #AEA8AA;
			position: absolute;
			left: 66rpx;
		}

		.dots {
			position: absolute;
			left: 58rpx;
			top: 80rpx;

			.dot {
				width: 42rpx;
				height: 42rpx;
				display: flex;
				align-items: center;
				margin-bottom: 81rpx;
				background-color: #fff;
			}

			.dot-content {
				width: 16rpx;
				height: 16rpx;
				background: #AEA8AA;
				border-radius: 16rpx;
			}

			.active {
				margin-bottom: 200rpx;

				.dot-content {
					background-color: #169F23;
				}
			}
		}

		.item {
			color: #8B8589;
			font-size: 30rpx;
			line-height: 45rpx;
			padding-bottom: 66rpx;
			margin-bottom: 24rpx;
			border-bottom: 1rpx solid #AEA8AA
		}

		.active {
			color: #169F23;
		}

		.border-none {
			border: none;
		}
	}
</style>
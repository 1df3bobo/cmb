<template>
	<view class="app">
		<navbar title="转账记录查询" bg-color="#f8f8f8" more-btn service-btn>
		</navbar>
		<view class="main">
			<view class="money">
				<view class="money-name">
					转给{{info.oppositeName}}
				</view>
				<view class="money-num" v-if="info.amount">
					-￥{{(info.amount).toFixed(2)}}
				</view>
			</view>
		</view>
		<view class="details">
			<view class="cell">
				<view class="label">收款账户</view>
				<view class="content">{{info.oppositeAccount}}</view>
			</view>
			<view class="cell">
				<view class="label">收款银行</view>
				<view class="content">{{info.bankName}}</view>
			</view>
			<view class="cell">
				<view class="label">付款账户</view>
				<view class="content">{{info.bankCard}}</view>
			</view>
			<view class="cell">
				<view class="label">转账附言</view>
				<view class="content">本人</view>
			</view>
			<view class="cell">
				<view class="label">转账渠道</view>
				<view class="content">{{info.transactionChannel}}</view>
			</view>
			<view class="cell">
				<view class="label">转账方式</view>
				<view class="content">{{info.transactionType}}</view>
			</view>
		</view>
		<view class="state">
			<view class="statr-content">
				<view class="statr-content-txt">
					<view class="dot"></view>
					<view>转账完成</view>
				</view>
				<view class="start-content-time">
					{{info.transactionTime}}
				</view>
			</view>
			<view class="btn" @click="progress">
				<text>进度查询</text>
				<image class="btn-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
			</view>
		</view>
		<view class="info-item" @click="notice">
			<view class="info-label active">通知收款人</view>
			<image class="btn-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
		</view>
		<view class="info-item" @click="record">
			<view class="info-label">查看和他的转账记录</view>
			<image class="btn-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
		</view>
		<view class="again-btn">
			再转一笔
		</view>
		<view class="explanation">
			<view>说明：</view>
			<view>1、您可以选择一卡通、交易时间，查询该卡在指定交易时间段内的自助转账记录。</view>
			<view>2、如需查询2023年1月1日以前的转账记录，请<text>前往收支。</text></view>
		</view>
	</view>
</template>

<script>
	import {
		navigateTo
	} from '../../../utils';
	import {
		getTransferInfo
	} from '@/api/index.js'
	export default {
		data() {
			return {
				id: '',
				info: {}
			};
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id
			}
			this.getTransferInfo()
		},
		methods: {
			record() {
				navigateTo({
					url: '/pages/transfer/record/record?oppositeAccount=' + this.info.oppositeAccount
				})
			},
			progress() {
				navigateTo({
					url: '/pages/transfer/progress/progress?info=' + JSON.stringify(this.info)
				})
			},
			notice() {
				navigateTo({
					url: '/pages/transfer/notice/notice?info=' + JSON.stringify(this.info)
				})
			},
			getTransferInfo() {
				getTransferInfo({
					id: this.id
				}).then((res) => {
					if (res.code === 200) {
						this.info = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.main {
		width: 750rpx;
	}

	.money {
		width: 750rpx;
		height: 220rpx;
		background-color: #fff;
		text-align: center;
		padding-top: 80rpx;

		.money-name {
			text-align: center;
			font-size: 36rpx;
			color: #111;

		}

		.money-num {
			font-size: 48rpx;
			margin-top: 30rpx;
			font-weight: 700;
		}
	}

	.state {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #ffffff;
		margin-top: 20rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 150rpx;

		.statr-content {
			display: block;

			.statr-content-txt {
				display: flex;
				align-items: center;
				color: #169F23;
				font-size: 32rpx;

				.dot {
					width: 32rpx;
					height: 32rpx;
					border-radius: 32rpx;
					margin-right: 10rpx;
					background: #169F23;
				}
			}

			.start-content-time {
				color: #666;
				font-size: 28rpx;
				margin-top: 12rpx;
			}
		}

		.btn {
			display: flex;
			align-items: center;
			color: #666;
			font-size: 32rpx;

			.btn-icon {
				width: 46rpx;
				height: 46rpx;
				margin-left: 8rpx;
			}
		}


	}

	.info-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #ffffff;
		height: 110rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
		font-size: 32rpx;
		color: #111;

		.active {
			color: #2F6EE5;
		}

		.btn-icon {
			width: 46rpx;
			height: 46rpx;
		}
	}

	.details {
		width: 750rpx;
		background-color: #fff;
		margin-top: 20rpx;
		padding: 20rpx 40rpx;
		box-sizing: border-box;

		.cell {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 68rpx;
			font-size: 28rpx;

			.label {
				color: #666;
				font-size: 28rpx;
			}

			.content {
				color: #111;
			}
		}
	}

	.again-btn {
		width: 690rpx;
		height: 84rpx;
		background: #E75258;
		font-size: 34rpx;
		text-align: center;
		line-height: 84rpx;
		color: #fff;
		border-radius: 42rpx 42rpx 42rpx 42rpx;
		margin: 34rpx auto 100rpx;

	}

	.explanation {
		padding: 0 30rpx;
		color: #999;
		font-size: 24rpx;
		box-sizing: border-box;
		padding-bottom: 100px;

		view {
			margin-bottom: 20rpx;
		}

		text {
			color: #2F6EE5;
		}
	}
</style>
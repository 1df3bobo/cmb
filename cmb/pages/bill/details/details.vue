<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" more-btn service-btn title="交易详情">
		</navbar>
		<view class="main">
			<view class="container">
				<view class="info">
					<view class="info-type">
						<image class="info-type-icon" src="/static/home/bill-details-icon3.png" mode=""></image>
						{{details.excerpt}}
					</view>
					<view class="info-money">
						{{momneyStr}}
					</view>
				</view>
				<view class="cell">
					<view class="label">交易卡号</view>
					<view class="content">{{details.bankCard}}</view>
				</view>
				<view class="cell">
					<view class="label">交易时间</view>
					<view class="content">{{details.transactionTime}}</view>
				</view>
				<view class="cell">
					<view class="label">收款账号</view>
					<view class="content">{{details.oppositeAccount}}</view>
				</view>
				<view class="cell">
					<view class="label">转账附言</view>
					<view class="content"></view>
				</view>
				<view class="cell">
					<view class="label">银行交易类型</view>
					<view class="content">{{details.merchantBranch}}</view>
				</view>
			</view>
			<view class="banner"></view>
			<view class="container container2">
				<view class="cell" @click="classifyPopShow = true">
					<view class="label">分类</view>
					<view class="content">
						<image class="content-cate-icon" :src="classify.icon" mode=""></image>
						<text>{{classify.name}}</text>
						<image class="content-cate-arrow" src="/static/home/bill-details-icon1.png" mode=""></image>
					</view>
				</view>
				<view class="cell" @click="showPop = true">
					<view class="label">所属账本</view>
					<view class="content">
						<text class="content-select">请选择</text>
						<image class="content-cate-arrow" src="/static/home/bill-details-icon1.png" mode=""></image>
					</view>
				</view>
				<view class="cell">
					<view class="label">不计入本月收支</view>
					<view class="content">
						<u-switch v-model="show" inactiveColor='#D2CFC8' activeColor="#316EE5" size="24"></u-switch>
					</view>
				</view>
				<view class="remark">
					<view class="label">备注</view>
					<view class="content">
						<input class="content-input" placeholder-style="color:#C7C7C7" placeholder="记录点什么..."
							type="text" />
						<image class="content-icon" src="/static/home/bill-details-icon2.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<billLedger :show="showPop" @close="showPop = false"></billLedger>
		<billClassifyPop @confirm="classifyConfirm" :type="details.type" :show="classifyPopShow"
			@close="classifyPopShow = false">
		</billClassifyPop>
	</view>
</template>

<script>
	import {
		formatAmount
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				details: {},
				show: false,
				showPop: false,
				classifyPopShow: false,
				classify: {
					icon: '/static/icon/billCate/touzishouyi.png',
					name: '投资收益'
				}
			}
		},
		onLoad(op) {
			if (op.details) {
				this.details = JSON.parse(op.details)
			}
		},
		computed: {
			momneyStr() {
				let num = parseFloat(this.details.amount)
				if (num > 0) {
					return `￥${formatAmount(num.toFixed(2))}`
				} else {
					return `-￥${formatAmount(Math.abs(num).toFixed(2))}`
				}
			}
		},
		methods: {
			classifyConfirm(item) {
				this.classify = item
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.main {
		width: 100%;
		padding-bottom: 50rpx;

		.banner {
			width: 690rpx;
			height: 92rpx;
			background-image: url(/static/home/bill-details-ht.png);
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
			margin: auto;
		}

		.container2 {
			padding-top: 25rpx;

		}

		.container {
			width: 690rpx;
			background: #FFFFFF;
			border-radius: 12rpx 12rpx 12rpx 12rpx;
			margin: 19rpx auto;
			padding-bottom: 25rpx;

			.remark {
				padding: 25rpx 29rpx;
				font-size: 26rpx;
				line-height: 1;

				.label {
					color: #999999;
					margin-bottom: 26rpx;
				}

				.content {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1rpx solid #EFEFEF;
					padding-bottom: 29rpx;

					.content-input {
						font-size: 26rpx;
						line-height: 1;
					}

					.content-icon {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}

			.cell {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 25rpx 29rpx;
				font-size: 26rpx;
				line-height: 1;

				.label {
					color: #999999;
				}

				.content {
					color: #383838;
					display: flex;
					align-items: center;

					.content-select {
						color: #999999;
					}

					.content-cate-icon {
						width: 50rpx;
						height: 50rpx;
						margin-right: 12rpx;
					}

					.content-cate-arrow {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}

			.info {
				width: 100%;
				padding-top: 57rpx;
				box-sizing: border-box;
				margin-bottom: 80rpx;

				.info-type {
					display: flex;
					align-items: center;
					justify-content: center;
					color: #999999;
					font-size: 26rpx;
					margin-bottom: 42rpx;


					.info-type-icon {
						width: 40rpx;
						height: 40rpx;
						margin-right: 9rpx;

					}

				}

				.info-money {
					font-size: 50rpx;
					color: #383838;
					text-align: center;
					line-height: 55rpx;
					font-weight: 700;
				}
			}
		}
	}
</style>
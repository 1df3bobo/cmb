<template>
	<view class="app">
		<navbar title="通知收款人" bg-color="#F7F7F7" more-btn service-btn>
		</navbar>
		<view class="main">
			<view class="receipt" v-show="id === 1">
				<view class="title">转出成功</view>
				<image src="/static/home/hdzyz.png" class="seal" mode=""></image>
				<view class="tips">
					此电子回单仅供参考，请以对方账户实际入账为准。
					款项以到对方银行，预计10秒内到账，实际时间取
					决于对方银行
				</view>
				<view class="cell">
					<view class="label">收款方户名</view>
					<view class="content">{{info.oppositeName}}</view>
				</view>
				<view class="cell">
					<view class="label">收款方账号</view>
					<view class="content">{{info.oppositeAccount}}</view>
				</view>
				<view class="cell">
					<view class="label">收款方银行</view>
					<view class="content">{{info.bankName}}</view>
				</view>
				<view class="cell">
					<view class="label">转账金额</view>
					<view class="content">{{info.amount}}</view>
				</view>
				<view class="cell">
					<view class="label">付款方户名</view>
					<view class="content">{{userInfo.realName}}</view>
				</view>
				<view class="cell">
					<view class="label">付款方账号</view>
					<view class="content">{{userInfo.bankCard}}</view>
				</view>
				<view class="cell">
					<view class="label">转账附言</view>
					<view class="content"></view>
				</view>
				<view class="cell">
					<view class="label">转账流水号</view>
					<view class="content">{{info.certificateNo}}</view>
				</view>
				<view class="cell">
					<view class="label">交易时间</view>
					<view class="content">{{info.transactionTime}}</view>
				</view>
			</view>
			<view class="receipt-active" v-show="id !== 1">
				<view class="title">
					{{userInfo.realName}}向您转账
				</view>
				<view class="money">
					￥{{info.amount}}
				</view>
				<!-- 		<view class="name">
					亲爱的{{info.oppositeName}}
				</view> -->
			</view>
			<view class="tabs">
				<scroll-view scroll-x class="list">
					<view class="item" @click="change(item)" v-for="(item,index) in tabs" :key="index">
						<image v-show="id !== item.id" class="icon" :src="item.icon" mode=""></image>
						<image v-show="id === item.id" class="icon" :src="item.selectIcon" mode=""></image>
					</view>
				</scroll-view>
				<image class="tab-footer" src="/static/home/notifyBeneficiary3.png" mode=""></image>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				info: {},
				id: 1,
				tabs: [{
						icon: '/static/home/n-01.png',
						selectIcon: '/static/home/n-011.png',
						bg: '/static/home/notifyBeneficiary4',
						id: 1
					},
					{
						icon: '/static/home/n-02.png',
						selectIcon: '/static/home/n-22.png',
						bg: '/static/home/notifyBeneficiary4',
						id: 2
					},
					{
						icon: '/static/home/n-03.png',
						selectIcon: '/static/home/n-033.png',
						bg: '/static/home/notifyBeneficiary4',
						id: 3
					},
					{
						icon: '/static/home/n-04.png',
						selectIcon: '/static/home/n-044.png',
						bg: '/static/home/notifyBeneficiary4',
						id: 4
					},
					{
						icon: '/static/home/n-05.png',
						selectIcon: '/static/home/n-055.png',
						bg: '/static/home/notifyBeneficiary4',
						id: 5
					}
				]
			}
		},
		onLoad(options) {
			if (options.info) {
				this.info = JSON.parse(options.info)
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			change(item) {
				this.id = item.id
			}
		}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #F7F7F7;
	}

	.main {
		width: 750rpx;
		padding-top: 180rpx;

		.tabs {
			width: 750rpx;
			position: fixed;
			padding-bottom: env(safe-area-inset-bottom);
			bottom: 0;

			.list {
				width: 100%;
				padding: 0 20rpx;
				white-space: nowrap;
				margin-bottom: 50rpx;

				.item {
					display: inline-block;
					width: 138rpx;
					height: 158rpx;
					margin-right: 30rpx;

					.icon {
						width: 138rpx;
						height: 158rpx;
					}
				}
			}

			.tab-footer {
				width: 750rpx;
				height: 101rpx;
			}
		}

		.receipt-active {
			width: 604rpx;
			height: 755rpx;
			background-image: url(/static/home/notifyBeneficiary4.png);
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			margin: auto;
			padding-top: 42rpx;
			box-sizing: border-box;
			position: relative;

			.money {
				text-align: center;
				font-size: 70rpx;
				color: #ffffff;
				font-weight: 700;
				margin-top: 30rpx;
			}

			.title {
				text-align: center;
				font-size: 30rpx;
				color: #ffffff;

			}
		}

		.receipt {
			width: 604rpx;
			height: 755rpx;
			background-image: url(/static/home/zhsy.png);
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			margin: auto;
			padding-top: 37rpx;
			box-sizing: border-box;
			position: relative;

			&:before {
				content: '';
				position: absolute;
				top: 243rpx;
				left: 50%;
				transform: translateX(-50%);
				width: 588rpx;
				height: 1rpx;
				background-color: #F4F4F4;
			}

			.title {
				color: #333333;
				font-size: 36rpx;
				line-height: 1;
				margin-bottom: 30rpx;
				text-align: center;
			}

			.seal {
				width: 315rpx;
				height: 268rpx;
				position: absolute;
				left: 269rpx;
				top: -16rpx;
				z-index: 10;
			}

			.tips {
				color: #999999;
				font-size: 24rpx;
				line-height: 36rpx;
				text-align: center;
				padding: 0 30rpx;
				box-sizing: border-box;
				margin-bottom: 68rpx;
			}

			.cell {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 40rpx 0 32rpx;
				box-sizing: border-box;
				font-size: 27rpx;
				line-height: 1;
				margin-bottom: 17rpx;

				.label {
					color: #999999;
				}

				.content {
					color: #666666;
				}

			}
		}
	}
</style>
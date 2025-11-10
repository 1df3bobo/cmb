<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" service-btn title="向多人转账">

		</navbar>
		<view class="main">
			<view class="list">
				<view class="cell">
					<view class="label">
						付款卡
					</view>
					<view class="content" v-if="userInfo.bankList">
						<text>{{repeatCardNumber(userInfo.bankList[0].bankCard)}}</text>
						<image class="arrow-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
					</view>
				</view>
				<view class="cell">
					<view class="label">
						可用余额
					</view>
					<view class="content">
						<text>{{formatAmount(userInfo.accountBalance)}}</text>
						<image class="arrow-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="tips">
				每人最多可转5万元
			</view>
			<view class="cell cell-1">
				<view class="label">
					收款群组
				</view>
				<view class="content">
					<text>请选择</text>
					<image class="arrow-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
				</view>
			</view>
			<view class="cell cell-1">
				<view class="label">
					附言
				</view>
				<view class="content">
					<text>转账</text>
					<image class="arrow-icon" src="/static/icon/icon7.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		repeatCardNumber,
		formatAmount
	} from '@/utils/index.js'
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				repeatCardNumber: repeatCardNumber,
				formatAmount: formatAmount
			}
		},
		computed: {
			...mapState(['userInfo'])
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

		.list {
			width: 100%;
			background-color: #ffffff;
			padding: 0 30rpx;
			box-sizing: border-box;
		}

		.cell {
			background-color: #ffffff;
			width: 100%;
			height: 101rpx;
			display: flex;
			font-size: 34rpxs;
			color: #111;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #f8f8f8;

			.content {
				display: flex;
				align-items: center;
			}

			.arrow-icon {
				width: 40rpx;
				height: 40rpx;
				margin-left: 16rpx;
			}
		}

		.cell-1 {
			border: none;
			padding: 0 30rpx;
			box-sizing: border-box;
			margin-bottom: 12rpx;

			.content {
				color: #9C9C9C;
			}
		}

		.tips {
			padding: 0 30rpx;
			box-sizing: border-box;
			color: #9C9C9C;
			font-size: 28rpx;
			margin: 8rpx 0 20rpx 0;
		}

	}
</style>
<template>
	<view class="app">
		<navbar title="快捷支付" service-btn bg-color="#f8f8f8" more-btn>
		</navbar>
		<view class="bank">
			<text>招商银行储蓄卡（{{bankInfo.bankCard.slice(-4)}}）</text>
			<text class="change-btn">更换</text>
			<text class="btn">一键多绑</text>
		</view>
		<view class="pages">
			<image class="page-image" src="/static/pages/kjzf.png" mode="widthFix"></image>
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


			};
		},
		computed: {
			...mapState(['userInfo']),
			bankInfo() {
				if (this.userInfo.bankList.lengtn <= 0) return {}
				return this.userInfo.bankList[0]
			},
		},
	}
</script>

<style lang="scss">
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.bank {
		display: flex;
		padding: 16rpx 20rpx 16rpx 30rpx;
		box-sizing: border-box;
		align-items: center;
		font-size: 32rpx;

		.change-btn {
			color: #316EE5;
			margin-left: 16rpx;
			font-size: 28rpx;
		}

		.btn {
			border: 1rpx solid #111111;
			padding: 6rpx 40rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			border-radius: 50rpx;
			margin-left: auto;
		}
	}

	.pages {
		width: 750rpx;
		height: auto;


		.page-image {
			width: 750rpx;
			height: auto;
		}
	}
</style>
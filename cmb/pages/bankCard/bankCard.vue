<template>
	<view class="app">
		<navbar title="银行卡" more-btn service-btn bg-color="#F8F8F8"></navbar>
		<view class="main">
			<view class="bank-info" @click="details">
				<view class="card-number">
					****{{bankInfo.bankCard.slice(-4)}}
				</view>
				<view class="branch-belongs">
					{{bankInfo.branchBelongs}}
				</view>
			</view>
			<view class="btn" @click="hisBankCard"></view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {
		navigateTo
	} from '../../utils';
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
			}
		},
		methods: {
			details() {
				navigateTo({
					url: '/pages/bankCard/details/details'
				})
			},
			hisBankCard() {
				navigateTo({
					url: '/pages/bankCard/hisBankBard/hisBankBard'
				})
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
		width: 750rpx;
		height: 1444rpx;
		background-image: url(/static/pages/bankCard.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 1444rpx;
		box-sizing: border-box;

		.btn {
			width: 100%;
			height: 200rpx;
			margin-top: 100rpx;
		}

		.bank-info {
			width: 100%;
			color: #000;
			font-size: 32rpx;
			font-weight: 700;
			padding: 470rpx 0 0 50rpx;
			box-sizing: border-box;

			.branch-belongs {
				font-weight: 400;
				padding-top: 8rpx;
				font-size: 28rpx;
				color: #3F3F3F;
				box-sizing: border-box;
				padding-left: 164rpx;
			}
		}
	}
</style>
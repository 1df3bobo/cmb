<template>
	<view class="app">
		<navbar bg-color="#f8f8f8"  left-icon="/static/icon/back.png" title="他行卡转入">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`}">
					<text>管理</text>
					<image class="nav-customer" src="/static/icon/customer-black.png"></image>
				</view>
			</slot>
		</navbar>
		<view class="pages">
			<view class="btn" @click="go"></view>
			<view class="bank-info">
				<view class="bank-name">
					招商银行
				</view>
				<view class="bank-card" v-if="userInfo.bankList">
					**{{userInfo.bankList[0].bankCard.slice(-4)}}
				</view>
			</view>
			<view class="card" v-if="userInfo.bankList">
				招商银行({{userInfo.bankList[0].bankCard.slice(-4)}})
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {
		redirectTo
	} from '../../../utils';

	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['userInfo', 'navBarHeight'])
		},
		methods: {
			go() {
				redirectTo({
					url: '/pages/transfer/capitalPooling/capitalPooling'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		padding-right: 40rpx;
		color: #111;
		font-size: 26rpx;
		font-weight: 400;
		position: absolute;

		.nav-customer {
			width: 40rpx;
			height: 40rpx;
			margin-left: 36rpx;
		}


	}

	.pages {
		width: 750rpx;
		height: 770rpx;
		background-image: url(/static/pages/thkzr_4.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;

		.bank-info {
			position: absolute;
			right: 120rpx;
			top: 240rpx;
			font-size: 28rpx;
			color: #111;
			text-align: center;

			.bank-card {
				font-weight: 700;
				font-size: 24rpx;
			}
		}

		.card {
			position: absolute;
			right: 50rpx;
			top: 396rpx;
			font-size: 28rpx;
		}

		.btn {
			position: absolute;
			width: 300rpx;
			height: 100rpx;
			left: 400rpx;
		}
	}
</style>
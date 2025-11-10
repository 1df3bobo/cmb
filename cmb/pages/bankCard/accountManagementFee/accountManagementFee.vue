<template>
	<view class="app">
		<navbar title="账户管理费减免申请" service-btn bg-color="#f8f8f8" more-btn>
		</navbar>
		<view class="pages">
			<image class="page-image" src="/static/pages/zhglfjmsq.png" mode="widthFix"></image>
			<view class="bank">
				<text>{{repeatCardNumber(bankInfo.bankCard)}}</text>
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
		font-size: 32rpx;
		position: absolute;
		top: 200rpx;
		font-weight: 700;
		left: 70rpx;
	}

	.pages {
		width: 750rpx;
		height: auto;
		position: relative;


		.page-image {
			width: 750rpx;
			height: auto;
		}
	}
</style>
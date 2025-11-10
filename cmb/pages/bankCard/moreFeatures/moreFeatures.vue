<template>
	<view class="app">
		<navbar title="更多功能" service-btn bg-color="#f8f8f8" more-btn>
		</navbar>
		<view class="pages">
			<image class="page-image" src="/static/pages/gdgn.png" mode="widthFix"></image>
			<view class="list">
				<view class="item"
					@click="management('/pages/commonPages/commonPages?pageImage=/static/pages/fgmzcxe.png&title=非柜面支出限额')">
				</view>
				<view class="item"
					@click="management('/pages/commonPages/commonPages?pageImage=/static/pages/atmsz.png&title=ATM/POS设置')">
				</view>
				<view class="item" @click="management('/pages/bankCard/automaticDeduction/automaticDeduction')">
				</view>
				<view class="item" @click="management('/pages/bankCard/fastPay/fastPay')">
				</view>
				<view class="item" @click="management('/pages/bankCard/fastPay/fastPay')">
				</view>
				<view class="item"  @click="management('/pages/bankCard/accountManagementFee/accountManagementFee')">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {
		repeatCardNumber,
		navigateTo
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
		methods: {
			management(url) {
				navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style lang="scss">
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.list {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		padding-top: 100rpx;

		.item {
			width: 100%;
			height: 100rpx;
			margin-bottom: 20rpx;
			
		}
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
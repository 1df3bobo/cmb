<template>
	<view>
		<navbar :placeholder="false" :bg-color="`rgba(255,255,255,${1-opacity})`" more-btn service-btn title="收益中心">
		</navbar>
		<view class="pages">
			<view class="income-money">
				0.00
			</view>
			<view class="account-money">
				持仓金额 {{formatAmount(userInfo.accountBalance)}}
			</view>
			<view class="deposit-money">
				余额 {{formatAmount(userInfo.accountBalance)}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {
		formatAmount
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				opacity: 1,
				formatAmount: formatAmount
			}
		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight', 'userInfo']),
		},
		onPageScroll(e) {
			var scrollTop = e.scrollTop;
			if (scrollTop >= this.statusBarHeight) {
				this.opacity = 0
				return
			} else if (scrollTop == 0) {
				this.opacity = 1
				return
			}
			this.opacity = 1 - (scrollTop / this.statusBarHeight)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		width: 750rpx;
		height: 2257rpx;
		background-image: url(/static/pages/syzx.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 2257rpx;
		padding-top: 360rpx;

		.income-money {
			text-align: center;
			font-weight: 700;
			font-size: 42rpx;

		}

		.account-money {
			text-align: center;
			color: #111;
			font-size: 28rpx;
			margin-top: 30rpx;
		}

		.deposit-money {
			color: #111;
			font-size: 28rpx;
			margin-top: 344rpx;
			padding-right: 54rpx;
			box-sizing: border-box;
			text-align: right;
		}
	}
</style>
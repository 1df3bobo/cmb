<template>
	<view class="app">
		<navbar leftIcon="/static/icon/return@2x.png" title="账户总览" more-btn-icon="/static/icon/icon3-w.png"
			:placeholder="false" title-color="#fff" :bg-color="`rgba(52,58,84,${1-opacity})`" more-btn>
		</navbar>
		<view class="main"
			:style="{backgroundImage:type==1? 'url(/static/home/account-header.png)':'url(/static/home/account-header1.png)'}">
			<view class="account">
				<view class="left">
					<view class="big" v-show="type == 1">
						<view class="title">总资产</view>
						<view class="money">
							<view class="money-integer">{{formatAmount(numberParts(userInfo.accountBalance).integer)}}
							</view>
							<view class="money-decimal">.{{numberParts(userInfo.accountBalance).decimal}}</view>
							<image class="money-icon" src="/static/icon/arrow-5.png"></image>
						</view>
						<view class="btn" @click="commonPages('/pages/account/income/income')">查看收益</view>
					</view>
					<view class="small" @click="type = 1" v-if="type == 2">
						<view class="title small-title">总资产</view>
						<view class="money  small-money">
							<view class="money-integer">{{formatAmount(numberParts(userInfo.accountBalance).integer)}}
							</view>
							<view class="money-decimal">.{{numberParts(userInfo.accountBalance).decimal}}</view>
						</view>
					</view>
				</view>
				<view class="right">
					<view class="right-small" @click="type = 2" v-if="type == 1">
					</view>
					<view class="right-big" v-if="type == 2">
						<view class="right-big-title">
							本月剩余应还
						</view>
						<view class="money  right-small-money">
							<view class="money-integer">0</view>
							<view class="money-decimal">.00</view>
						</view>
					</view>
				</view>

			</view>
			<view class="money-num" v-show="type == 1">活钱 {{formatAmount(userInfo.accountBalance)}}</view>
			<view class="details" :style="{height:isexpand?'476rpx':'110rpx'}" v-show="type == 1">
				<view class="title">
					<view class="label">
						<text>直接可用</text>
						<image :class="['icon',isexpand?'icon-ani':'']" @click="changeExpand"
							src="/static/icon/down.png"></image>
					</view>
					<view class="contet" @click="commonPages('/pages/bill/bill')">
						<text>{{formatAmount(userInfo.accountBalance)}}</text>
						<image class="icon" src="/static/icon/back-right-black.png"></image>
					</view>
				</view>
				<view class="item">
					<view class="label">
						<text>尾号6814</text>
					</view>
					<view class="contet">
						<text>{{formatAmount(userInfo.accountBalance)}}</text>
						<image class="icon" src="/static/icon/icon10.png"></image>
					</view>
				</view>
				<view class="deposit">
					<view class="item deposit-item">
						<view class="label">
							<text>活期存款</text>
						</view>
						<view class="contet">
							<text>{{formatAmount(userInfo.accountBalance)}}</text>
						</view>
					</view>
					<view class="item">
						<view class="label">
							<text>零钱宝</text>
						</view>
						<view class="contet deposit-item-content">
							<text>7日年化1.75%</text>
						</view>
					</view>
				</view>
			</view>
			<view class="pages" v-show="type == 1">
				<view class="item"
					@click="commonPages(`/pages/commonPages/commonPages?pageImage=/static/pages/mlclzh.png&title=买理财 来招行&serviceBtn=${false}`)">
				</view>
				<view class="item item-1"
					@click="commonPages(`/pages/commonPages/commonPages?pageImage=/static/pages/xkxd.png&title=新客限定&serviceBtn=${false}`)">
				</view>
				<view class="item"
					@click="commonPages(`/pages/commonPages/commonPages?pageImage=/static/pages/ldc.png&title=灵动存&serviceBtn=${false}`)">
				</view>
				<view class="item" @click="commonPages(`/pages/gold/gold`)">
				</view>
				<view class="item"
					@click="commonPages(`/pages/common/common?pageImage=/static/pages/xjd.png&title=小金袋·积蓄金&serviceBtn=${false}&gradient=0`)">
				</view>
				<view class="item"
					@click="commonPages(`/pages/commonPages/commonPages?pageImage=/static/pages/yljdlb.png&title=养老金大礼包&serviceBtn=${false}`)">
				</view>
			</view>
			<view class="pages1" v-show="type == 2"></view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		navigateTo,
		formatAmount
	} from '@/utils';
	export default {
		data() {
			return {
				type: 1,
				opacity: 1,
				money: 2025.25,
				isexpand: true,
				formatAmount: formatAmount
			}
		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight', 'userInfo']),
			numberParts() {
				return (number) => {
					const numStr = String(number);
					const [integerPart, decimalPart = ''] = numStr.split('.');
					return {
						integer: integerPart,
						decimal: decimalPart ? decimalPart : '00',
					};
				}
			},
		},
		onLoad() {
			this.get_user_info()
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
			...mapActions(['get_user_info']),
			commonPages(url) {
				navigateTo({
					url: url
				})
			},
			changeExpand() {
				this.isexpand = !this.isexpand
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 100%;
		min-height: 100vh;
		background-color: #F8F8F8;
	}

	.main {
		width: 750rpx;
		min-height: 620rpx;
		background-image: url(/static/home/account-header.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 620rpx;

		.placeholder {
			width: 750rpx;
		}

		.icon-ani {
			transform: rotate(180deg)
		}

		.right {
			display: block;

			.right-small {
				width: 200rpx;
				height: 150rpx;
				margin-left: 200rpx;
			}

			.right-big {
				margin-left: 100rpx;
				margin-top: 30rpx;

				.right-big-title {
					color: #FFFFFF;
					font-size: 30rpx;
				}
			}
		}

		.account {
			width: 100%;
			padding: 319rpx 0 0 70rpx;
			box-sizing: border-box;
			line-height: 1;
			display: flex;

			.title {
				color: #FFFFFF;
				font-size: 30rpx;
			}


			.money {
				display: flex;
				color: #FFFFFF;
				font-weight: bold;
				margin-top: 20rpx;
				font-size: 36rpx;
				align-items: flex-end;

				.money-integer {
					font-size: 50rpx;
				}

				.money-icon {
					width: 32rpx;
					height: 32rpx;
				}
			}

			.small {
				padding-top: 50rpx;
				width: 160rpx;
			}

			.small-title {
				font-size: 18rpx;
			}

			.small-money {
				font-size: 24rpx;

				.money-integer {
					font-size: 31rpx;
				}
			}

			.btn {
				width: 133rpx;
				height: 50rpx;
				background: #69738E;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 25rpx;
				color: #E3E4F3;
				font-size: 24rpx;
				margin-top: 33rpx;
			}


		}

		.money-num {
			color: #549CE0;
			font-size: 28rpx;
			text-align: center;
			margin-top: 92rpx;
			margin-bottom: 42rpx;
		}

		.details {
			width: 690rpx;
			height: 476rpx;
			background: #FFFFFF;
			border-radius: 22rpx;
			margin: auto;
			padding: 32rpx 0 0 0;
			box-sizing: border-box;
			overflow: hidden;

			.title {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #010101;
				font-weight: bold;
				margin-bottom: 59rpx;
				padding: 0 12rpx 0 30rpx;
				box-sizing: border-box;

				.label {
					display: flex;
					align-items: center;
					font-size: 32rpx;

					.icon {
						width: 24rpx;
						height: 20rpx;
						margin-left: 14rpx;
						transition: all 0.3s ease
					}
				}

				.contet {
					font-size: 36rpx;
					display: flex;
					align-items: center;

					.icon {
						width: 44rpx;
						height: 44rpx;
					}
				}
			}

			.item {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #010101;
				margin-bottom: 40rpx;
				padding: 0 12rpx 0 30rpx;
				box-sizing: border-box;

				.label {
					display: flex;
					align-items: center;
					font-size: 28rpx;

				}

				.contet {
					font-size: 32rpx;
					display: flex;
					align-items: center;

					.icon {
						width: 44rpx;
						height: 44rpx;
					}
				}
			}

			.deposit {
				width: 661rpx;
				height: 221rpx;
				background: #F7F8FA;
				border-radius: 13rpx 13rpx 13rpx 13rpx;
				margin: auto;
				padding: 37rpx 50rpx 0 26rpx;
				box-sizing: border-box;

				.deposit-item {
					margin-bottom: 70rpx;

					.deposit-item-content {
						width: 28rpx;
					}
				}
			}
		}

		.pages {
			width: 750rpx;
			height: 1540rpx;
			background-image: url(/static/home/account-pages.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: 750rpx 1540rpx;
			padding-top: 30rpx;
			box-sizing: border-box;

			.item {
				width: 750rpx;
				height: 100rpx;
				margin-bottom: 30rpx;

				&.item-1 {
					height: 170rpx;
				}

			}
		}

		.pages1 {
			width: 750rpx;
			height: 1191rpx;
			margin-top: 160rpx;
			background-image: url(/static/home/account-pages1.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: 750rpx 1191rpx;
		}
	}
</style>
<template>
	<view>
		<navbar :showBack="false" :placeholder="false" :bg-color="`rgba(255,255,255,${1-opacity})`">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`}">
					<image class="nav-icon" @click="commPages(`/pages/customer/customer`)"
						src="/static/wealth/icon.png"></image>
					<view class="nav-search">
						<text @click="commPages(`/pages/customer/customer`)"
							:style="{color:opacity<1?'#111': '#ffffff'}">依据资金用途，为你精准匹配理财...</text>
						<image class="nav-search-arrow"
							:src="opacity<1?'/static/icon/blackRight.png':'/static/icon/pickRight.png'"></image>
						<image class="nav-search-icon" @click="goSearch"
							:src="opacity<1?'/static/icon/search-black.png':'/static/icon/search.png'"></image>
					</view>
				</view>
			</slot>
		</navbar>
		<view class="main">
			<view class="haeder"></view>
			<view class="asset">
				<view class="money">
					<view class="money-content">
						<view class="money-content-num">
							<view class="money-num" v-if="moneyState">
								<view class="money-integer">
									{{userInfo.accountBalance?formatAmount(numberParts(userInfo.accountBalance).integer):0}}
								</view>
								<view class="money-decimal">.{{numberParts(userInfo.accountBalance).decimal}}</view>
							</view>
							<view v-else>******</view>
							<image @click="moneyState =!moneyState" class="money-icon"
								:src="moneyState?'/static/icon/icon2.png':'/static/icon/icon1.png'">
							</image>
						</view>
						<view class="money-text">总资产(元)</view>
					</view>
					<view class="money-content yesterday-moeney">
						<view class="money-content-num">
							<view class="money-num" v-if="moneyState">
								<view class="money-integer">
									{{userInfo.accountBalance?formatAmount(numberParts(userInfo.accountBalance).integer):0}}
								</view>
								<view class="money-decimal">.{{numberParts(userInfo.accountBalance).decimal}}</view>
							</view>
							<view v-else>******</view>
						</view>
						<view class="money-text">
							<text>昨日收益</text>
							<image class="money-text-icon" src="/static/icon/grayRight.png"></image>
						</view>
					</view>
				</view>
				<view class="details" v-if="moneyState">
					<view class="details-item" @click="commPages('/pages/account/account/account')">
						<view class="details-item-label">活钱</view>
						<view class="details-item-content">{{formatAmount(userInfo.accountBalance)||0.00}}</view>
						<view class="details-item-content rigth">0.00</view>
					</view>
					<view class="details-item" @click="commPages('/pages/wealth/finance/finance')">
						<view class="details-item-label">理财</view>
						<view class="details-item-content">追求稳健收益</view>
					</view>
					<view class="details-item" @click="commPages('/pages/wealth/fund/fund')">
						<view class="details-item-label">基金</view>
						<view class="details-item-content">10元起投好基金</view>
					</view>
					<view class="details-item" @click="commPages('/pages/wealth/insurance/insurance')">
						<view class="details-item-label">保险</view>
						<view class="details-item-content">100.00</view>
					</view>
				</view>
			</view>
			<view class="cate">
				<view class="item" @click="commPages(item.path)" v-for="(item,index) in cateList" :key="index"></view>
			</view>
			<view class="footer-page">
				<view class="item" @click="commPages('/pages/chaoChaoBao/chaoChaoBao')">

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
		px2rpx,
		navigateTo,
		formatAmount
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				px2rpx: px2rpx,
				opacity: 1,
				moneyState: false,
				money: 1024.25,
				formatAmount: formatAmount,
				cateList: [{
					title: '理财',
					path: '/pages/wealth/finance/finance'
				}, {
					title: '基金',
					path: '/pages/wealth/fund/fund'
				}, {
					title: '保险',
					path: '/pages/wealth/insurance/insurance'
				}, {
					title: '存款',
					path: `/pages/common/common?pageImage=/static/pages/ck.png&serviceBtn=${false}&gradient=0&title=存款`
				}, {
					title: '黄金',
					path: '/pages/gold/gold'
				}, {
					title: '跨境金融',
					path: '/pages/wealth/crossBorderFinance/crossBorderFinance'
				}, {
					title: 'TRE配置',
					path: `/pages/common/common?pageImage=/static/pages/treepz_1.png&title=TREE配置`
				}, {
					title: '朝朝宝',
					path: '/pages/chaoChaoBao/chaoChaoBao'
				}, {
					title: '朝朝盈2号',
					path: `/pages/common/common?pageImage=/static/pages/zzy2.png&title=朝朝盈2号`
				}, {
					title: '全部',
					path: '/pages/allMenu/allMenu'
				}]
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
		onPageScroll(e) {
			var scrollTop = e.scrollTop;
			if (scrollTop >= this.navBarHeight) {
				this.opacity = 0
				return
			} else if (scrollTop == 0) {
				this.opacity = 1
				return
			}
			this.opacity = 1 - (scrollTop / this.navBarHeight)
		},
		methods: {
			commPages(path) {
				navigateTo({
					url: path
				})
			},
			goSearch() {
				navigateTo({
					url: `/pages/search/search`
				})
			},
		}
	}
</script>

<style lang="scss">
	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		padding: 0 24rpx 0 36rpx;
		box-sizing: border-box;

		.nav-icon {
			width: 45rpx;
			height: 45rpx;
		}

		.nav-search {
			display: flex;
			align-items: center;
			flex: 1;
			margin-left: 12rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #ffffff;

			.nav-search-arrow {
				width: 10rpx;
				height: 18rpx;
				margin-left: 60rpx;
			}

			.nav-search-icon {
				width: 40rpx;
				height: 40rpx;
				margin-left: auto;
			}
		}
	}

	.main {
		width: 100%;
		min-height: 400rpx;
		position: relative;

		.haeder {
			width: 100%;
			height: 309rpx;
			justify-content: space-between;
			background-image: url(/static/wealth/header-bg.png);
			background-position: top;
			background-repeat: no-repeat;
			background-size: cover;
		}

		.asset {
			width: 690rpx;
			background: linear-gradient(180deg, #FCD8DA 0rpx, #ffffff 150rpx);
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			min-height: 125rpx;
			padding: 47rpx 32rpx 20rpx 29rpx;
			min-height: 196rpx;
			margin: -115rpx auto 40rpx;
			box-sizing: border-box;
			box-shadow: 0rpx 1rpx 20rpx 1rpx rgba(0, 0, 0, 0.08);

			.money {
				display: flex;
				justify-content: space-between;

				.money-content {
					font-size: 40rpx;
					color: #000000;
					font-weight: 700;
					line-height: 1;
					display: flex;
					flex-direction: column;

					.money-content-num {
						display: flex;
						align-items: center;
					}

					.money-num {
						display: flex;
						align-items: flex-end;

						.money-decimal {
							font-size: 30rpx;
						}
					}
				}

				.yesterday-moeney {
					align-items: flex-end;
				}

				.money-text {
					color: #585656;
					font-size: 25rpx;
					margin-top: 38rpx;
					display: flex;
					align-items: center;

					.money-text-icon {
						width: 15rpx;
						height: 30rpx;
						margin-left: 12rpx;
					}
				}

				.money-icon {
					width: 44rpx;
					height: 44rpx;
					margin-left: 13rpx;
				}
			}

			.details {
				width: 629rpx;
				height: 152rpx;
				margin: 44rpx auto 0;
				border-bottom: 1rpx solid #E8E8E8;
				border-top: 1rpx solid #E8E8E8;
				position: relative;
				display: flex;
				flex-wrap: wrap;

				&:before {
					content: '';
					height: 100%;
					width: 1rpx;
					background-color: #E8E8E8;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
				}

				&::after {
					content: '';
					height: 1rpx;
					width: 100%;
					background-color: #E8E8E8;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);

				}

				.details-item {
					width: 50%;
					height: 74rpx;
					display: flex;
					align-items: center;

					&:nth-child(2n) {
						padding-left: 20rpx;
						box-sizing: border-box;
					}

					.details-item-label {
						color: #808080;
						font-size: 22rpx;
					}

					.details-item-content {
						color: #000000;
						font-size: 22rpx;
						font-weight: bold;
						flex: 1;
						margin-left: 15rpx;
					}
				}
			}
		}

		.cate {
			height: 290rpx;
			width: 750rpx;
			background-image: url(/static/wealth/cate.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;

			.item {
				width: 18%;
				height: 45%;

			}
		}

		.footer-page {
			height: 1276rpx;
			width: 750rpx;
			background-image: url(/static/wealth/pages.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;

			.item {
				width: 100%;
				height: 330rpx;

			}
		}
	}
</style>
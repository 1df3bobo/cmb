<template>
	<view class="app">
		<navbar :placeholder="false" :bg-color="`rgba(255,255,255,${1-opacity})`" more-btn service-btn title="我的银行卡">
		</navbar>
		<view class="main">
			<view class="card">
				<view class="card-money">
					<view class="card-money-title">
						可用余额
					</view>
					<view class="card-money-content">
						<text class="card-money-sl">￥</text>
						<text>{{formatAmount(bankInfo.accountBalance)}}</text>
						<image class="card-money-icon" src="/static/icon/blackRight.png" mode=""></image>
					</view>
				</view>
				<view class="card-info">
					<view class="card-info-title">储蓄卡(I类)</view>
					<view class="card-info-number">
						<view class="card-info-number-content">
							****{{bankInfo.bankCard.slice(-4)}}
						</view>
						<view class="card-info-number-btn" @click="passwordPopShow = true">
							查看卡号
						</view>
					</view>
				</view>
				<view class="bank-info">
					<view class="bank-content" @click="branchBelongs">
						<text>{{bankInfo.branchBelongs}}</text>
						<image class="bank-content-icon" src="/static/icon/blackRight.png" mode=""></image>
					</view>
					<view class="card-type" @click="bankCardLabelShow = true">
						{{bankCardLabel}}
					</view>
				</view>
			</view>
			<view class="center">
				<!-- 快捷支付 -->
				<view class="fast-pay" @click="fastPay"></view>
				<!-- 社区热榜 -->
				<view class="community-hot-list" @click="community"></view>
				<!-- 四个卡片 -->
				<view class="center-card">
					<view class="item" @click="scheduledTransfer"></view>
					<view class="item" @click="repaymentPlanShow  = true"></view>
					<view class="item" @click="financialPlanShow  = true"></view>
					<view class="item" @click="livePay"></view>
				</view>
			</view>
			<view class="today-expenses" @click="goBill">
				<view class="title">今日支出</view>
				<view class="today-expenses-money">
					<text>￥</text><text class="blod">17.00</text>
					<image class="bank-content-icon" src="/static/icon/blackRight.png" mode=""></image>
				</view>
				<view class="time-rang">
					<view>{{today}}</view>
					<view>{{thirtyDaysAgo}}</view>
				</view>
			</view>
			<view class="footer">
				<view class="record" @click="goRecord">
					<view class="item" v-for="(item,index) in list" :key="index" @click="details(item)">
						<view class="item-content">
							<image class="icon" :src="item.icon" mode=""></image>
							<view class="info">
								<view class="info-title">
									{{item.oppositeName}}
								</view>
								<view class="info-time">
									{{item.transactionTime}}
								</view>
							</view>
							<view class="money">
								<view class="money-title">
									-￥{{item.amount}}
								</view>
								<view class="info-status">
									{{item.status}}
								</view>
							</view>
						</view>
					</view>
					<view class="transfer-btn" @click.stop="goTransfer"></view>
				</view>
				<view class="management">
					<view class="item" @click="management('/pages/transfer/settings/settings')"></view>
					<view class="item" @click="management('/pages/password/password')"></view>
					<view class="item"
						@click="management('/pages/commonPages/commonPages?pageImage=/static/pages/yjsk.png&title=一键锁卡')">
					</view>
					<view class="item" @click="management('/pages/bankCard/automaticDeduction/automaticDeduction')">
					</view>
					<view class="item" @click="passwordPopShow = true"></view>
					<view class="item" @click="management('/pages/bankCard/accountManagementFee/accountManagementFee')">
					</view>
					<view class="item"
						@click="management('/pages/commonPages/commonPages?pageImage=/static/pages/fgmzcxe.png&title=非柜面支出限额')">
					</view>
					<view class="item" @click="management('/pages/commonPages/commonPages?pageImage=/static/pages/atmsz.png&title=ATM/POS设置')"></view>
					<view class="item" @click="management('/pages/bankCard/moreFeatures/moreFeatures')"></view>

				</view>
			</view>
		</view>
		<passwordPop :show="passwordPopShow" @close="passwordPopShow = false" @confirm="confirmPassword">
		</passwordPop>
		<bankCardInfoPop :show="viewCardNoPopShow" @close="viewCardNoPopShow = false"></bankCardInfoPop>
		<bankCardLabelPop :show="bankCardLabelShow" @close="bankCardLabelShow = false"></bankCardLabelPop>
		<repaymentPlanPop :show="repaymentPlanShow" @close="repaymentPlanShow = false"></repaymentPlanPop>
		<financialPlanPop :show="financialPlanShow" @close="financialPlanShow = false"></financialPlanPop>
	</view>
</template>

<script>
	import {
		getTransferRecord
	} from '@/api/index.js'
	import {
		mapState,
	} from 'vuex'
	import {
		navigateTo,
		formatAmount
	} from '@/utils/index.js';
	export default {
		data() {
			return {
				opacity: 1,
				formatAmount: formatAmount,
				list: [],
				passwordPopShow: false,
				viewCardNoPopShow: false,
				bankCardLabelShow: false,
				repaymentPlanShow: false,
				financialPlanShow: false,

			}
		},
		onLoad() {
			this.getTransferRecord()
		},
		computed: {
			...mapState(['userInfo', 'statusBarHeight', 'bankCardLabel']),
			bankInfo() {
				if (this.userInfo.bankList.lengtn <= 0) return {}
				return this.userInfo.bankList[0]
			},
			today() {
				return this.formatDate(new Date());
			},
			thirtyDaysAgo() {
				const date = new Date();
				date.setDate(date.getDate() - 29);
				return this.formatDate(date);
			}
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
			confirmPassword() {
				this.passwordPopShow = false
				this.viewCardNoPopShow = true
			},
			// 格式化日期
			formatDate(date) {
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');
				return `${year}-${month}-${day}`;
			},
			branchBelongs() {
				navigateTo({
					url: `/pages/common/common?pageImage=/static/pages/wd.png&title=网点&gradient=2`
				})
			},
			scheduledTransfer() {
				navigateTo({
					url: `/pages/common/common?pageImage=/static/pages/xzyyzz.png&title=&gradient=2`
				})
			},
			livePay() {
				navigateTo({
					url: `/pages/common/common?pageImage=/static/pages/shjf_1.png&title=生活缴费&gradient=2`
				})
			},
			goBill() {
				navigateTo({
					url: `/pages/bill/bill`
				})
			},
			fastPay() {
				navigateTo({
					url: `/pages/bankCard/fastPay/fastPay`
				})
			},
			goRecord() {
				navigateTo({
					url: `/pages/transfer/record/record`
				})
			},
			goTransfer() {
				navigateTo({
					url: `/pages/transfer/bank/bank`
				})
			},
			management(url) {
				navigateTo({
					url: url
				})
			},
			community() {
				navigateTo({
					url: `/pages/bankCard/communityHotList/communityHotList`
				})
			},
			getTransferRecord() {
				getTransferRecord({
					pageSize: 2,
					pageNum: 1,
				}, false).then((res) => {
					if (res.code === 200) {
						this.list = res.data.list

					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.main {
		width: 100rpx;
		position: relative;

		.footer {
			width: 750rpx;
			height: 1106rpx;
			background-image: url(/static/pages/myBankcard4.png);
			background-position: top;
			background-repeat: no-repeat;
			background-size: 750rpx 1106rpx;
			box-sizing: border-box;

			.management {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-top: 150rpx;

				.item {
					width: 30%;
					height: 130rpx;
					margin-bottom: 50rpx;
				}
			}

			.record {
				width: 100%;
				padding-top: 100rpx;
				box-sizing: border-box;
				position: relative;
				height: 470rpx;

				.transfer-btn {
					width: 160rpx;
					height: 60rpx;
					position: absolute;
					right: 50rpx;
					bottom: 40rpx;
				}

				.item {
					width: 100%;
					padding: 0 30rpx;
					box-sizing: border-box;

					.item-content {
						width: 100%;
						height: 120rpx;
						background-color: #FFFFFF;
						border-bottom: 1rpx solid #f8f8f8;
						display: flex;
						align-items: center;
						padding: 0 26rpx 0 30rpx;
						box-sizing: border-box;

						.info {
							flex: 1;
							margin-left: 30rpx;
							font-size: 32rpx;
							color: #111111;

							.info-time {
								color: #999;
								font-size: 26rpx;
								margin-top: 6rpx;
							}
						}

						.money {
							text-align: right;
							margin-left: 30rpx;
							font-size: 32rpx;
							color: #111111;

							.info-status {
								color: #999;
								font-size: 26rpx;
								margin-top: 12rpx;
							}
						}
					}

					.icon {
						width: 70rpx;
						height: 70rpx;
						border-radius: 70rpx;

					}
				}
			}
		}

		.today-expenses {
			width: 750rpx;
			height: 393rpx;
			background-image: url(/static/pages/myBankcard3.png);
			background-position: top;
			background-repeat: no-repeat;
			background-size: 750rpx 393rpx;
			box-sizing: border-box;
			padding: 40rpx 0 0 60rpx;

			.title {
				color: #999;
				font-size: 24rpx;

			}

			.today-expenses-money {
				font-size: 28rpx;
				margin-top: 12rpx;

				.blod {
					font-weight: 700;
				}
			}

			.time-rang {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 200rpx;
				padding-right: 54rpx;
				font-size: 22rpx;
				font-weight: bold;
				color: #333333;
			}

			.today-expenses-money {
				display: flex;
				align-items: center;

				.bank-content-icon {
					width: 20rpx;
					height: 28rpx;
					margin-left: 6rpx;
				}
			}
		}

		.center {
			width: 750rpx;
			height: 1007rpx;
			background-image: url(/static/pages/myBankcard2.png);
			background-position: top;
			background-repeat: no-repeat;
			background-size: 750rpx 1007rpx;
			box-sizing: border-box;

			.fast-pay {
				width: 100%;
				height: 110rpx;
			}

			.community-hot-list {
				width: 100%;
				height: 280rpx;
				margin-top: 80rpx;
			}

			.center-card {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 50rpx 80rpx 0;
				box-sizing: border-box;
				flex-wrap: wrap;

				.item {
					width: 270rpx;
					height: 200rpx;
					margin-bottom: 20rpx;
				}

			}
		}

		.card {
			width: 750rpx;
			height: 635rpx;
			background-image: url(/static/pages/myBankcard.png);
			background-position: top;
			background-repeat: no-repeat;
			background-size: 750rpx 635rpx;
			box-sizing: border-box;
			padding-top: 200rpx;
			padding-left: 30rpx;

			.bank-info {
				width: 100%;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				padding-left: 30rpx;
				color: #333333;
				box-sizing: border-box;

				.card-type {
					flex: 1;
					text-align: right;
					padding-right: 100rpx;
					color: #999;
				}

				.bank-content {
					display: flex;
					align-items: center;

					.bank-content-icon {
						width: 20rpx;
						height: 28rpx;
						margin-left: 6rpx;
					}
				}


			}

			.card-info {
				color: #353533;
				font-size: 28rpx;
				margin-top: 42rpx;
				margin-bottom: 120rpx;

				.card-info-title {
					margin-bottom: 6rpx;
				}

				.card-info-number {
					display: flex;
					align-items: center;


					.card-info-number-content {
						font-size: 28rpx;
						font-weight: 700;
						color: #000;
					}

					.card-info-number-btn {
						height: 36rpx;
						padding: 0 10rpx;
						border-radius: 30rpx;
						font-size: 24rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #5E5D4C;
						border: 1rpx solid #5E5D4C;
						margin-left: 12rpx;
					}
				}
			}

			.card-money {
				color: #353533;
				font-size: 28rpx;

				.card-money-title {
					margin-bottom: 10rpx;
				}
			}

			.card-money-content {
				display: flex;
				align-items: center;
				font-size: 40rpx;
				font-weight: 700;

				.card-money-sl {
					font-weight: 400;
				}

				.card-money-icon {
					width: 20rpx;
					height: 28rpx;
					margin-left: 6rpx;
				}
			}
		}
	}
</style>
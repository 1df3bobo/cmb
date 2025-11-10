<template>
	<view class="app">
		<navbar :actions="actions" bg-color="#f8f8f8" more-btn title="收支">
			<view class="nav">
				<image class="search-icon" @click="doSearch" src="/static/icon/search@2x.png" mode=""></image>
			</view>
		</navbar>
		<view class="main">
			<u-sticky :customNavHeight="statusBarHeight+navBarHeight">
				<view class="tabs">
					<view class="item" @click="timePopShow = true">
						<text>{{selectDate.text}}</text>
						<image class="item-icon" src="/static/icon/down.png" mode=""></image>
					</view>
					<view class="item" @click="billBankCardShow = true">
						<text>{{bankCard}}</text>
						<image class="item-icon" src="/static/icon/down.png" mode=""></image>
					</view>
					<view :class="['item',orderSort?'active':'']" @click="moneySort">
						<text>按金额</text>
					</view>
					<view class="item filter" @click="billFilterShow = true">
						<text>筛选</text>
					</view>
				</view>
			</u-sticky>
			<view class="list">
				<view class="item" :id="'item-' + index" :ref="'item-' + index" v-for="(item,index) in list"
					:key="index">
					<!-- 月份头部总结 -->
					<view class="header"
						v-if="activeTitle ==1&&item.month&&(Math.abs(item.incomeTotal)>0||Math.abs(item.expensesTotal))">
						<view class="title">
							<text class="title-txt">{{convertMonth(item.month)}}</text>
							<text>月</text>
						</view>
						<view class="analysis-btn" @click="goAnalysis(item)">分析</view>
						<view class="summary">
							<view class="summary-item">
								<view class="summary-item-momey">{{balanceStr(item)}}</view>
								<view class="summary-item-name">
									<text>结余</text>
									<image @click="rules" class="summary-item-icon"
										src="/static/home/bill-info-icon.png" mode="">
									</image>
								</view>
							</view>
							<view class="summary-item">
								<view class="summary-item-momey">{{formatAmount(item.incomeTotal)}}</view>
								<view class="summary-item-name">收入</view>
							</view>
							<view class="summary-item">
								<view class="summary-item-momey">{{formatAmount(item.expensesTotal)}}</view>
								<view class="summary-item-name">支出</view>
							</view>
						</view>
					</view>
					<view class="header header_1" v-if="activeTitle ==2&&index == 0">
						<view class="summary">
							<view class="summary-item">
								<view class="summary-item-momey">{{balanceStr(billRangeData)}}</view>
								<view class="summary-item-name">
									<text>结余</text>
									<image @click="rules" class="summary-item-icon"
										src="/static/home/bill-info-icon.png" mode="">
									</image>
								</view>
							</view>
							<view class="summary-item">
								<view class="summary-item-momey">{{formatAmount(billRangeData.incomeTotal)}}</view>
								<view class="summary-item-name">收入</view>
							</view>
							<view class="summary-item">
								<view class="summary-item-momey">{{formatAmount(billRangeData.expensesTotal)}}</view>
								<view class="summary-item-name">支出</view>
							</view>
						</view>
					</view>
					<!-- 账单 -->
					<view class="bill" v-if="item.billDetail" @click="goDetails(item.billDetail)">
						<view class="bill-time" v-if="item.day">
							{{item.day}}
						</view>
						<u-swipe-action>
							<u-swipe-action-item :options="options2" :name="index" :index='index' :threshold="40">
								<view class="bill-contetnt">
									<view class="bill-top">
										<image class="bill-money-icon" :src="item.icon" mode="">
										</image>
										<view class="bill-name">{{item.excerpt}}</view>
										<view class="bill-money">{{momneyStr(item.amount)}}</view>
									</view>
									<view class="bill-bottom">
										<view class="bill-bank-card">{{item.bankCard}}</view>
										<view class="bill-bottom-time">{{item.time}}</view>
										<view class="bill-bottom-balance">余额:￥{{formatAmount(item.accountBalance)}}
										</view>
									</view>
								</view>
							</u-swipe-action-item>
						</u-swipe-action>
					</view>
					<!-- 当月无账单状态 -->
					<view class="bill-empty" v-if="item.month&&(item.incomeTotal==0&&item.expensesTotal==0)">
						<view class="bill-empty-left">
							<text class="bill-empty-left-1">{{convertMonth(item.month)}}</text>
							<text class="bill-empty-left-2">月</text>
						</view>
						<view class="bill-empty-right">
							暂无交易
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" icon loading-text=" " nomore-text="交易只能到这个月啦" />
		</view>
		<view class="footer">
			<view class="footer-pl"></view>
			<view class="footer-tabs">
				<view class="footer-tab-item"></view>
				<view class="footer-tab-item" @click="accountBook"></view>
			</view>
		</view>
		<view class="add-btn" @click="addBill"></view>
		<billFilterPop :show="billFilterShow" @close="billFilterShow = false" @complete="billFilter"></billFilterPop>
		<billBankCardPop :show="billBankCardShow" @close="billBankCardShow = false" @change="bankCardChange">
		</billBankCardPop>
		<billTimePop :show="timePopShow" @select="timeChange" @close="timePopShow = false"></billTimePop>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		getBillPage,
		getBillPageRangePayment
	} from '@/api/index.js'
	import {
		repeatCardNumber,
		formatAmount,
		navigateTo,
		redirectTo
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				actions: [{
						text: '客服',
						icon: '/static/icon/customer-w.png',
						path: '/pages/customer/customer'
					},
					{
						text: '月度账单',
						icon: '/static/icon/zhangdan.png',
						path: '/pages/monthlyBill/monthlyBill'
					}, {
						text: '打印流水',
						icon: '/static/icon/dayin.png',
						path: '/pages/water/water/water'
					},
					{
						text: '财务整理',
						icon: '/static/icon/zhangwu.png',
						path: ''
					},
				],
				formatAmount: formatAmount,
				timePopShow: false,
				billFilterShow: false,
				billBankCardShow: false,
				billRangeData: {},
				pageNum: 1,
				pageSize: 10,
				list: [],
				totalPage: 1,
				activeTitle: 1,
				status: 'loading',
				endPageTime: '',
				totalKeyList: '',
				queryTime: '',
				orderSort: '', // 1金额倒叙 2金额正序
				transactionCategory: '',
				bankCard: '银行卡',
				selectDate: { // 选择的时间
					text: ''
				},
				options2: [{
					text: '批量不计入',
					style: {
						backgroundColor: '#000'
					}
				}, {
					text: '不计入',
					style: {
						backgroundColor: 'red'
					}
				}],
			}
		},
		onPageScroll(e) {
			this.list.forEach((item, index) => {
				const query = uni.createSelectorQuery().in(this);
				query.select('#item-' + index).boundingClientRect((rect) => {
					if (rect.top <= 0 && rect.bottom >= 0) {
						if (item.day) {
							this.$set(this.selectDate, 'text', item.day)
						}
					}
				}).exec();
			});
		},
		computed: {
			...mapState(['userInfo', 'navBarHeight', 'statusBarHeight']),
			convertMonth() {
				return (monthString) => {
					return parseInt(monthString, 10);
				}
			},
			balanceStr() {
				return (item) => {
					let balance = item.incomeTotal - item.expensesTotal
					if (balance > 0) {
						return `￥${formatAmount(balance.toFixed(2))}`
					} else {
						return `-￥${formatAmount(Math.abs(balance).toFixed(2))}`
					}
				}
			},
			momneyStr() {
				return (money) => {
					let num = parseFloat(money)
					if (num > 0) {
						return `￥${formatAmount(num.toFixed(2))}`
					} else {
						return `-￥${formatAmount(Math.abs(num).toFixed(2))}`
					}
				}
			}
		},
		onLoad() {
			const currentDate = new Date();
			const currentYear = currentDate.getFullYear();
			const currentMonth = ((currentDate.getMonth() + 1) < 10) ? ('0' + currentDate.getMonth() + 1) : (currentDate
				.getMonth() + 1)
			this.$set(this.selectDate, 'text', `${currentYear}.${currentMonth}月`)
			this.queryTime = this.selectDate.text.replace('.', '-').replace('月', '');
			this.getBillPage()


		},
		onReachBottom() {
			if (this.pageNum == this.totalPage) {
				this.status = 'nomore'
				return;
			}
			if (this.activeTitle == 2) {
				this.pageNum = this.pageNum + 1
			}
			this.status = 'loading'

			this.getBillPage();
		},
		methods: {
			accountBook() {
				redirectTo({
					url: '/pages/bill/accountBook/accountBook'
				})
			},
			goAnalysis(item) {
				let dateTime = item.year + '-' + item.month
				navigateTo({
					url: '/pages/bill/analysis/analysis?dateTime=' + dateTime
				})
			},
			addBill() {
				navigateTo({
					url: '/pages/commonPages/commonPages?pageImage=/static/pages/jiyibi.png&title=记一笔'
				})
			},
			doSearch() {
				navigateTo({
					url: '/pages/bill/search/search'
				})
			},
			goDetails(details) {
				navigateTo({
					url: '/pages/bill/details/details?details=' + JSON.stringify(details)
				})
			},
			rules() {
				navigateTo({
					url: '/pages/commonPages/commonPages?pageImage=/static/pages/szgztj.png&title=收支统计规则&serviceBtn=' +
						false,
				})
			},
			moneySort() {
				if (this.orderSort) {
					this.orderSort = ''
					return
				}
				this.orderSort = '1'
			},
			bankCardChange(value) {
				this.bankCard = value.name
			},
			billFilter(value) {
				this.transactionCategory = value
			},
			timeChange(e) { // 时间选择
				this.selectDate = e.data
				this.status = 'loading'
				this.pageNum = 1
				this.list = []
				this.activeTitle = e.activeTitle
				this.getBillPage()

			},
			getBillPage() {
				if (this.activeTitle == 1) {
					getBillPage({
						pageSize: this.pageSize,
						pageNum: this.pageNum,
						orderSort: this.orderSort,
						categorys: this.transactionCategory,
						queryTime: this.queryTime,
						totalKeyList: this.totalKeyList
					}).then((res) => {
						if (res.code === 200) {
							this.list = [...this.list, ...res.data.list]
							this.totalPage = res.data.pages
							this.totalKeyList = res.data.customizeParam.totalKeyList
							this.queryTime = res.data.customizeParam.queryTime
							this.pageNum = res.data.customizeParam.pageNum
							if (this.totalPage == 1) {
								this.status = 'nomore'
							} else {
								this.status = 'loadmore'
							}
						} else {
							this.status = 'loadmore'
						}
					})
				} else {
					getBillPageRangePayment({
						pageSize: this.pageSize,
						pageNum: this.pageNum,
						endPageTime: this.endPageTime,
						orderSort: this.orderSort,
						categorys: this.transactionCategory,
						endTime: this.selectDate.end,
						beginTime: this.selectDate.start,
					}).then((res) => {
						if (res.code === 200) {
							this.list = [...this.list, ...res.data.list]
							this.billRangeData = res.data
							this.totalPage = res.data.pages
							if (res.data.list.length > 0) {
								this.endPageTime = res.data.list[res.data.list.length - 1].transactionTime
							}
							if (this.totalPage == 1) {
								this.status = 'nomore'
							} else {
								this.status = 'loadmore'
							}

						} else {
							this.status = 'loadmore'
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;
		// font-family: uvicon-iconfont;
	}

	.list {
		width: 100%;

		.item {
			width: 100%;

			.bill-empty {
				width: 697rpx;
				height: 116rpx;
				background: #FFFFFF;
				border-radius: 16rpx 16rpx 16rpx 16rpx;
				margin: auto;
				margin-top: 50rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 31rpx;
				box-sizing: border-box;

				.bill-empty-right {
					color: #7D7D7D;
					font-size: 22rpx;
				}

				.bill-empty-left {
					color: #000000;
					font-weight: 700;
					display: flex;

					.bill-empty-left-1 {
						font-size: 56rpx;
					}

					.bill-empty-left-2 {
						font-size: 36rpx;
						margin-top: 30rpx;
					}
				}
			}

			.bill {
				background-color: #FFFFFF;
				width: 692rpx;
				margin: auto;
				box-sizing: border-box;
				padding-top: 40rpx;

				.bill-contetnt {
					padding: 40rpx 28rpx 40rpx 34rpx;
					box-sizing: border-box;

					.bill-bottom {
						display: flex;
						align-items: center;
						color: #999999;
						font-size: 24rpx;
						line-height: 1;
						padding-left: 47rpx;
						box-sizing: border-box;

						.bill-bottom-time {
							margin-left: 12rpx;
						}

						.bill-bottom-balance {
							margin-left: auto;

						}
					}

					.bill-top {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						line-height: 1;
						margin-bottom: 19rpx;

						.bill-money {
							margin-left: auto;
							font-size: 32rpx;

						}

						.bill-money-icon {
							width: 28rpx;
							height: 28rpx;
							margin-right: 19rpx;
						}
					}
				}

				.bill-time {
					width: 74rpx;
					height: 32rpx;
					background: #F8F8F8;
					border-radius: 6rpx 6rpx 6rpx 6rpx;
					color: #000000;
					font-size: 26rpx;
					text-align: center;
					line-height: 32rpx;
					margin-left: 30rpx;
					box-sizing: border-box;
				}

			}

			.header {
				width: 750rpx;
				height: 242rpx;
				background-image: url(/static/home/bill-header-bg.png);
				background-position: center;
				background-repeat: no-repeat;
				background-size: cover;
				margin-top: 50rpx;
				padding: 122rpx 50rpx 0 54rpx;
				box-sizing: border-box;
				position: relative;

				&.header_1 {
					width: 750rpx;
					height: 198rpx;
					margin-top: 0;
					padding: 70rpx 50rpx 0 54rpx;
					background-image: url(/static/home/shouzhi_bg.png);
				}

				.title {
					font-size: 36rpx;
					font-weight: 700;
					position: absolute;
					top: -30rpx;
					left: 58rpx;

					.title-txt {
						font-size: 56rpx;
					}
				}

				.summary {
					display: flex;
					align-items: center;
					justify-content: space-between;
					line-height: 1;
					font-size: 28rpx;
					color: #000;
					font-weight: 500;

					.summary-item {
						display: flex;
						flex-direction: column;

						.summary-item-name {
							display: flex;
							align-items: center;
							margin-top: 18rpx;

							.summary-item-icon {
								width: 27rpx;
								height: 27rpx;
								margin-left: 10rpx;
							}
						}
					}
				}

				.analysis-btn {
					width: 78rpx;
					height: 42rpx;
					background: #000000;
					border-radius: 21rpx 21rpx 21rpx 21rpx;
					position: absolute;
					top: 42rpx;
					right: 49rpx;
					color: #FFFFFF;
					font-size: 22rpx;
					text-align: center;
					line-height: 42rpx;
				}
			}
		}

	}

	.add-btn {
		position: fixed;
		bottom: 346rpx;
		left: 600rpx;
		width: 126rpx;
		height: 126rpx;
		background-image: url(/static/icon/bill-add-icon.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		z-index: 100;
	}

	.footer {
		width: 750rpx;
		position: relative;

		.footer-pl {
			width: 750rpx;
			height: 162rpx;
		}

		.footer-tabs {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 750rpx;
			height: 162rpx;
			background-image: url(/static/home/shouzhi_bottom.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			z-index: 100;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.footer-tab-item {
				width: 30%;
				height: 100%;
			}
		}
	}

	.nav {
		width: 500rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		right: 126rpx;
		position: absolute;
		box-sizing: border-box;
		z-index: 100;

		.search-icon {
			width: 48rpx;
			height: 48rpx;
		}

	}

	.main {
		width: 750rpx;
		position: relative;
	}

	.tabs {
		width: 100%;
		padding: 20rpx 26rpx 0 36rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #000;
		display: flex;
		align-items: center;
		background-color: #F8F8F8;
		padding-bottom: 20rpx;
		margin-bottom: 20rpx;

		.item {
			display: flex;
			align-items: center;
			margin-right: 30rpx;
			font-weight: 500;

			&.filter {
				margin-left: auto;
			}

			&.active {
				color: #2F6EE5;
			}

			.item-icon {
				width: 24rpx;
				height: 20rpx;
				margin-left: 8rpx;
			}
		}

	}
</style>
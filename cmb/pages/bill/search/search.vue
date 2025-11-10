<template>
	<view class="app">
		<navbar :show-back="false" :more-btn="false">
			<view class="nav">
				<view class="search">
					<image class="search-icon" src="/static/icon/search-grey.png" mode=""></image>
					<input v-model="keyword" class="search-input" placeholder="输入关键字" type="text" />
					<image v-if="keyword" @click="clear" class="search-close" src="/static/icon/close2.png" mode="">
					</image>
				</view>
				<view class="back-btn" @click="back">
					取消
				</view>
			</view>
		</navbar>
		<view class="main">
			<view class="tabs" v-if="doSearch">
				<view class="item" @click="timePopShow = true">
					<text>{{selectDate.text}}</text>
					<image class="item-icon" src="/static/icon/down.png" mode=""></image>
				</view>
				<view class="tab-list">
					<view @click="selectTabs(item)" :class="['tab-btn',activeId==item.id?'active':'']"
						v-for="(item,index) in tabs" :key="index">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="quick" v-if="!doSearch">
				<view class="quick-title">快捷搜索</view>
				<view class="quick-list">
					<view class="quick-item" @click="doqQuick(item)" v-for="(item,index) in quickList" :key="index">
						{{item}}
					</view>
				</view>
			</view>
			<view class="list" v-if="doSearch">
				<view class="stats">
					<view class="left">
						<view :class="[incomeTotal!=0?'bottom':'']" v-if="expensesTotal!=0">
							支出：{{formatAmount(expensesTotal)}}</view>
						<view v-if="incomeTotal!=0">收入：{{formatAmount(incomeTotal)}}</view>
					</view>
					<view class="right">
						共{{total}}笔交易
					</view>
				</view>
				<view class="list-content">
					<view class="list-item" @click="goDetails(item.billDetail)" v-if="item.daily&&item.billDetail"
						v-for="(item,index) in list" :key="index">
						<view class="item-top">
							<image class="item-icon" src="/static/icon/money-icon.png" mode=""></image>
							<view class="item-name">
								{{item.excerpt}}
							</view>
							<view class="item-money">
								{{momneyStr(item.amount)}}
							</view>
						</view>
						<view class="item-bottom">
							<view class="item-bank">
								{{item.bankCard}}
							</view>
							<view class="item-time">
								{{item.billDetail.transactionTime}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<billTimePop time="lastOneYear" title="2" :show="timePopShow" @select="timeChange" @close="timePopShow = false">
		</billTimePop>
	</view>
</template>

<script>
	import {
		getBillPage
	} from '@/api/index.js'
	import {
		navigateBack,
		formatAmount,
		navigateTo
	} from '../../../utils';
	import toast from '../../../utils/toast';
	export default {
		data() {
			return {
				formatAmount: formatAmount,
				quickList: [
					'仅支出', '仅收入', '薪酬', '转账', '餐饮', '理财', '还款'
				],
				timePopShow: false,
				pageNum: 1,
				pageSize: 10,
				list: [],
				totalPage: 1,
				total: null,
				keyword: '',
				doSearch: false,
				selectDate: { // 选择的时间
					text: '近一年',
					end: '',
					start: ''
				},
				tabs: [{
					name: '按时间',
					id: 1,
					value: '2'
				}, {
					name: '按金额',
					id: 2,
					value: '2'
				}],
				activeId: 1,
				orderSort: '', // 1金额倒叙 2金额正序
				incomeTotal: 0,
				expensesTotal: 0
			};
		},
		onReachBottom() {
			if (this.pageNum == this.totalPage) {
				return;
			}
			this.pageNum = this.pageNum + 1
			this.getBillPage();
		},
		onLoad() {
			// 获取当前日期
			const currentDate = new Date();
			// 获取一年前的日期
			const lastYearDate = new Date(currentDate);
			lastYearDate.setFullYear(currentDate.getFullYear() - 1);
			// 格式化为 YYYY-MM-DD 格式
			this.selectDate = {
				text: '近一年',
				end: currentDate.toISOString().split('T')[0],
				start: lastYearDate.toISOString().split('T')[0]

			}
		},
		computed: {
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
		methods: {
			goDetails(details) {
				navigateTo({
					url: '/pages/bill/details/details?details=' + JSON.stringify(details)
				})
			},
			selectTabs(item) {
				if (item.id === this.activeId) return
				this.orderSort = ''
				this.activeId = item.id
				if (item.id == 1) {
					this.orderSort = item.value
				}
				this.pageNum = 1
				this.list = []
				this.endPageTime = ''
				this.getBillPage()

			},
			clear() {
				this.keyword = ''
				this.doSearch = false
				this.pageNum = 1
				this.endPageTime = ''
				this.list = []
			},
			back() {
				navigateBack()
			},
			timeChange(e) { // 时间选择
				this.selectDate = e
				this.pageNum = 1
				this.list = []
				this.endPageTime = ''
				this.getBillPage()

			},
			doqQuick(item) {
				this.keyword = item
				this.pageNum = 1
				this.list = []
				this.endPageTime = ''
				this.getBillPage()
			},
			getBillPage() {
				toast.showLoading('正在为您查询')
				getBillPage({
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					endPageTime: this.endPageTime,
					orderSort: this.orderSort,
					endTime: this.selectDate.end,
					beginTime: this.selectDate.start,
				}).then((res) => {
					if (res.code === 200) {
						this.list = [...this.list, ...res.data.list]
						this.totalPage = res.data.pages
						this.total = res.data.total
						this.incomeTotal = res.data.incomeTotal
						this.expensesTotal = res.data.expensesTotal
						if (res.data.list.length > 0) {
							this.endPageTime = res.data.list[res.data.list.length - 1].endPageTime
						}
						this.doSearch = true
					}
					toast.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 750rpx;
		padding-top: 10rpx;

		.list {
			width: 100%;
			box-sizing: border-box;

			.list-content {
				width: 100%;
				padding: 0 28rpx;
				box-sizing: border-box;

				.list-item {
					width: 100%;
					height: 122rpx;
					border-bottom: 1rpx solid #E6E6E6;
					padding-top: 30rpx;
					box-sizing: border-box;

					.item-bottom {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding-left: 58rpx;
						box-sizing: border-box;
						color: #929292;
						font-size: 22rpx;
					}

					.item-top {
						display: flex;
						align-items: center;
						line-height: 1;
						color: #000000;
						margin-bottom: 16rpx;

						.item-icon {
							width: 31rpx;
							height: 31rpx;
							margin-right: 18rpx;
						}

						.item-name {
							font-size: 26rpx;
						}

						.item-money {
							font-size: 24rpx;
							font-weight: 700;
							margin-left: auto;
						}
					}
				}
			}

			.stats {
				width: 750rpx;
				padding: 30rpx 28rpx;
				box-sizing: border-box;
				background: #F8F8F8;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #929292;
				font-size: 26rpx;

				.bottom {
					margin-bottom: 16rpx;
				}
			}
		}

		.quick {
			padding: 30rpx 100rpx 30rpx 30rpx;
			box-sizing: border-box;

			.quick-title {
				color: #050505;
				font-size: 32rpx;
				margin-bottom: 30rpx;
			}

			.quick-list {
				display: flex;
				align-items: center;
				flex-wrap: wrap;

				.quick-item {
					padding: 0 24rpx;
					height: 60rpx;
					background: #F8F8F8;
					border-radius: 30rpx;
					color: #000000;
					font-size: 22rpx;
					text-align: center;
					line-height: 60rpx;
					margin-right: 20rpx;
					margin-bottom: 24rpx;
				}
			}
		}

		.tabs {
			width: 100%;
			padding: 26rpx 28rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.tab-list {
				display: flex;
				align-items: center;

				.tab-btn {
					width: 113rpx;
					height: 59rpx;
					background: #F8F8F8;
					border-radius: 30rpx 30rpx 30rpx 30rpx;
					color: #000000;
					font-size: 22rpx;
					text-align: center;
					line-height: 59rpx;
					margin-left: 20rpx;
				}

				.active {
					color: #FF8F53;
					background-color: #FFF0E8;
					;
				}
			}

			.item {
				display: flex;
				align-items: center;
				font-weight: 500;
				font-size: 26rpx;
				color: #050505;

				.item-icon {
					width: 24rpx;
					height: 20rpx;
					margin-left: 8rpx;
				}
			}
		}
	}

	.nav {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		padding-right: 126rpx;
		position: absolute;
		box-sizing: border-box;
		z-index: 100;
		padding: 0 26rpx 0 28rpx;
		box-sizing: border-box;

		.back-btn {
			color: #050505;
			font-size: 36rpx;

			margin-left: 28rpx;


		}

		.search {
			width: 596rpx;
			height: 58rpx;
			border-radius: 32rpx 32rpx 32rpx 32rpx;
			border: 1rpx solid #C5C5C5;
			display: flex;
			align-items: center;
			padding: 0 28rpx 0 22rpx;
			box-sizing: border-box;

			.search-icon {
				width: 36rpx;
				height: 36rpx;
			}

			.search-input {
				color: #050505;
				font-size: 26rpx;
				flex: 1;
				margin-left: 15rpx;

			}

			.search-close {
				width: 24rpx;
				height: 24rpx;
			}
		}

	}
</style>
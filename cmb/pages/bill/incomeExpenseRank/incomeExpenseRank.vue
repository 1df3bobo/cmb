<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" more-btn service-btn title="收支分析">
		</navbar>
		<view class="main">
			<scroll-view class="date-list" scroll-x :scroll-into-view="`item${scrollIntoView}`">
				<view @click="changeMonth(item)" :class="['item',item.dateTime === dateTime?'active':'']"
					:id="`item${item.dateTime}`" v-for="(item,index) in getLastTenYearsMonths" :key="index">
					{{item.name}}
				</view>
			</scroll-view>
			<view class="title">
				<view class="money" v-if="tab == 1">
					￥<text>{{formatAmount(type==1?Math.abs(incomeTotal):Math.abs(expensesTotal))}}</text>
				</view>
				<view class="money" v-else>
					￥<text>0.00</text>
				</view>
				<image class="money-icon" src="/static/home/bill-info-icon.png" mode=""></image>
				<view class="tabs">
					<view @click="tab = item.id" :class="['tab',item.id == tab?'active':'']"
						v-for="(item,index) in tabs" :key="index">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="list" v-if="tab == 1&&list.length>0">
				<view class="list-title">
					{{dateTime.slice(5)}}月共{{total}}笔
				</view>
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="item-rank">
						<view :style="{backgroundImage:`url(/static/home/Top${index+1}.png)`}" class="item-rank-active"
							v-if="index<3">

						</view>
						<view v-else class="item-rank-index">
							{{index+1}}
						</view>
					</view>
					<view class="item-content">
						<view class="item-name">
							{{item.excerpt}}
						</view>
						<view class="item-bank">
							{{item.bankCard}}
						</view>
					</view>
					<view class="item-money">
						<view class="item-amount">
							{{item.amount<0?'-':''}}￥{{ formatAmount(Math.abs(item.amount))}}
						</view>
						<view class="item-time">
							{{item.transactionTime}}
						</view>
					</view>
				</view>
			</view>
			<view class="no-list">
				无交易记录
			</view>
		</view>
	</view>
</template>

<script>
	import {
		incomeExpenseRank
	} from '@/api/index.js'
	import {
		formatAmount
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				formatAmount: formatAmount,
				pageNum: 1,
				pageSize: 10,
				list: [],
				totalPage: 1,
				dateTime: '',
				type: '',
				expensesTotal: 0,
				incomeTotal: 0,
				tabs: [{
						name: '弹性',
						id: 1
					},
					{
						name: '固定',
						id: 2
					}
				],
				tab: 1,
				total: 1
			}
		},
		onLoad(options) {
			this.dateTime = options.dateTime
			this.type = options.type
			this.scrollIntoView = options.dateTime
			this.incomeExpenseRank()
		},
		computed: {
			getLastTenYearsMonths() {
				const currentDate = new Date();
				const currentYear = currentDate.getFullYear(); // 获取当前年份
				const currentMonth = currentDate.getMonth() + 1; // 获取当前月份，注意 JavaScript 中月份从 0 开始，所以需要 +1
				const result = [];

				for (let year = currentYear - 10; year <= currentYear; year++) {
					const monthsInYear = (year === currentYear) ? currentMonth : 12;
					for (let month = 1; month <= monthsInYear; month++) {
						const formattedMonth = month;

						const dateTime = `${year}-${formattedMonth}`;
						const name = (month === 12) ? `${year}年${formattedMonth}月` : `${formattedMonth}月`;

						result.push({
							dateTime,
							name
						});
					}
				}

				return result;
			}

		},
		onReachBottom() {
			if (this.pageNum == this.totalPage) {
				this.status = 'nomore'
				return;
			}
			this.status = 'loading'
			this.incomeExpenseRank();
		},
		methods: {
			changeMonth(item) {
				this.dateTime = item.dateTime
				this.pageNum = 1
				this.list = []
				this.incomeExpenseRank()
			},
			incomeExpenseRank() {
				incomeExpenseRank({
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					dateTime: this.dateTime,
					type: this.type
				}).then(res => {
					if (res.code == 200) {
						this.incomeTotal = res.data.incomeTotal
						this.expensesTotal = res.data.expensesTotal
						this.total = res.data.total
						this.list = [...this.list, ...res.data.list]
						this.pageNum = res.data.customizeParam.pageNum
						this.totalPage = res.data.pages
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
</script>

<style lang="scss" scoped>
	.app {
		width: 100%;
		min-height: 100vh;

	}

	.main {
		width: 100%;
		padding-top: 20rpx;
	}

	.no-list {
		text-align: center;
		padding-top: 150rpx;
		color: #999;

	}

	.list {
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-top: 30rpx;

		.list-title {
			background-color: #f8f8f8;
			min-width: 50rpx;
			display: inline-block;
			padding: 6rpx 10rpx;
			line-height: 1;
			font-size: 26rpx;
			margin-bottom: 36rpx;


		}

		.item {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			.item-rank {
				width: 30rpx;
				height: 43rpx;
				margin-right: 20rpx;
				font-size: 20rpx;

				.item-rank-active {
					width: 30rpx;
					height: 43rpx;
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
				}

				.item-rank-index {
					margin-left: 4rpx;
				}
			}

			.item-content {
				flex: 1;

				.item-name {
					font-size: 26rpx;
				}

				.item-bank {
					color: #999;
					font-size: 22rpx;
					margin-top: 16rpx;
				}
			}

			.item-money {
				text-align: right;

				.item-amount {
					font-size: 26rpx;
					font-weight: 700;
					;
				}

				.item-time {
					color: #999;
					font-size: 22rpx;
					margin-top: 16rpx;
				}
			}
		}
	}

	.title {
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 20rpx;
		box-sizing: border-box;

		.tabs {
			display: flex;
			margin-left: auto;

			.tab {
				width: 108rpx;
				height: 58rpx;
				background: #F1F1F1;
				text-align: center;
				line-height: 58rpx;
				color: #000000;
				font-size: 24rpx;
				border-radius: 29rpx 29rpx 29rpx 29rpx;
				margin-right: 24rpx;
			}

			.active {
				color: #FF7739;
				background-color: rgba(255, 119, 57, 0.3);
			}
		}

		.money-icon {
			width: 32rpx;
			height: 32rpx;
			margin-left: 10rpx;
		}

		.money {
			font-size: 32rpx;

			text {
				font-weight: 700;
			}
		}

		&:before {
			content: '';
			height: 1rpx;
			position: absolute;
			bottom: 0;
			width: 710rpx;
			background-color: #f8f8f8;
		}
	}

	.date-list {
		width: 100%;
		height: 120rpx;
		background-color: #f8f8f8;
		white-space: nowrap;
		color: #000000;
		font-size: 26rpx;

		.item {
			height: 100%;
			display: inline-block;
			padding-top: 20rpx;
			box-sizing: border-box;
			position: relative;

		}

		.active {
			color: #FF7739;

			&:before {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 0;
				height: 0;
				border-left: 20rpx solid transparent;
				border-right: 20rpx solid transparent;
				border-bottom: 20rpx solid #ffffff;
			}
		}
	}
</style>
<template>
	<view class="app">
		<navbar :placeholder="false" :bg-color="`rgba(255,255,255,${1-opacity})`"></navbar>
		<view class="loading-page" v-if="loading">
			<view class="loading-item loading-item1">
				<view class="loading-content">
					<image v-if="showFirst" class="icon rotate icon-loading" src="/static/month-bg/loading-icon.png"
						mode="">
					</image>
					<image class="icon" v-else src="/static/month-bg/checked.png" mode=""></image>
				</view>
			</view>
			<view class="loading-item loading-item2">
				<view class="dot" v-if="time<1000"></view>
				<view class="loading-content" v-else>
					<image v-if="showSecond" class="icon rotate icon-loading" src="/static/month-bg/loading-icon.png"
						mode="">
					</image>
					<image class="icon" v-else src="/static/month-bg/checked.png" mode=""></image>
				</view>
			</view>
			<view class="loading-item loading-item3">
				<view class="dot" v-if="time<2000"></view>
				<view v-else class="loading-content">
					<image v-if="showThird" class="icon rotate icon-loading" src="/static/month-bg/loading-icon.png"
						mode="">
					</image>
					<image class="icon" v-else src="/static/month-bg/checked.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="main" v-else :style="{backgroundImage: `url(${monthInfo().bg})`}">
			<view class="title">
				<view class="titlle-left">
					<text>{{monthInfo().name}}</text>
					<image class="titlle-left-icon" src="/static/month-bg/i.png" mode=""></image>
				</view>
				<view class="titlle-right" @click="comm('/pages/monthlyBill/monthlyBill')">
					<text>更多</text>
					<image class="titlle-left-icon" src="/static/icon/back-right-black.png" mode=""></image>
				</view>
			</view>
			<view class="assets">
				<view class="assets-left">
					<view class="assets-left-title">
						<text>月末总资产(元)</text>
						<image class="assets-left-icon" src="/static/month-bg/i.png" mode=""></image>
					</view>
					<view class="assets-number">
						{{formatAmount(monthBillDetails.totalAmount)}}
					</view>
				</view>
				<view class="assets-left">
					<view class="assets-left-title">
						<text>较上月</text>
					</view>
					<view class="assets-money">
						{{monthBillDetails.upTotalAmount<0?'-':'+'}}{{formatAmount(monthBillDetails.upTotalAmount)}}
					</view>
				</view>
			</view>
			<view class="card">
				<view class="card-list">
					<view class="card-item">
						<view class="card-item-title">
							<text>活钱管理</text>
							<image class="card-item-title-icon" src="/static/month-bg/m-less.png" mode=""></image>
						</view>
						<view class="card-item-content">
							{{formatAmount(monthBillDetails.flexibleAmount)}}
						</view>
					</view>
					<view class="card-item">
						<view class="card-item-title">
							<text>稳健投资</text>
						</view>
						<view class="card-item-content">
							小波动稳收益
						</view>
					</view>
					<view class="card-item">
						<view class="card-item-title">
							<text>进取投资</text>
						</view>
						<view class="card-item-content">
							高风险高收益
						</view>
					</view>
					<view class="card-item">
						<view class="card-item-title">
							<text>保障管理</text>
						</view>
						<view class="card-item-content">
							人生的4笔保单
						</view>
					</view>
				</view>
				<view class="card-footer">
					安排好TREE四笔钱，财富为生活保驾护航
				</view>
			</view>
			<view class="analysis">
				<view class="analysis-title">
					<view class="title-left">
						<text>收支分析</text>
						<image class="titlle-left-icon" src="/static/month-bg/i.png" mode=""></image>
					</view>
					<view class="analysis-tabs">
						<view @click="selectId = item.id" :class="['analysis-tabs-item',item.id===selectId?'active':'']"
							v-for="(item,index) in tabs" :key="index">
							{{item.name}}
						</view>
					</view>
				</view>
				<view class="analysis-list">
					<view class="analysis-item">
						<view class="analysis-item-title">
							<text>结余</text>
						</view>
						<view class="analysis-item-money">
							{{analysis.cashSurplus}}
						</view>
					</view>
					<view class="analysis-item">
						<view class="analysis-item-title">
							<text class="analysis-item-title-dot analysis-item-title-dot1"></text>
							<text>收入</text>
						</view>
						<view class="analysis-item-money">
							{{analysis.expenses}}
						</view>
					</view>
					<view class="analysis-item">
						<view class="analysis-item-title">
							<text class="analysis-item-title-dot analysis-item-title-dot2"></text>
							<text>支出</text>
						</view>
						<view class="analysis-item-money">
							{{analysis.expenses}}
						</view>
					</view>
				</view>
				<view class="analysis-chart">
					<l-echart ref="chartRef" @finished="init"></l-echart>
				</view>
				<view class="analysis-details">
					<view class="analysis-details-title" :style="{backgroundImage:`url(${monthInfo().titleBg})`}">
					</view>
					<view class="analysis-details-content" :style="{background:monthInfo().bgColor}">
						<view class="analysis-details-month">
							{{month}}月{{selectId==1?'收入':'支出'}}
						</view>
						<view class="analysis-details-money">
							{{formatAmount(selectId==1?analysis.income:analysis.expenses)}}
						</view>
						<view class="analysis-details-accrued">
							本年累计{{formatAmount(analysis.yearTotalAmount)}}
						</view>
						<view class="analysis-details-list">
							<view class="analysis-details-item" v-for="(item,index) in list" :key="index">
								<view class="analysis-details-item-sort">{{index+1}}</view>
								<view class="analysis-details-item-name">{{item.name}}</view>
								<view class="analysis-details-item-money">{{formatAmount(item.amount)}}</view>
							</view>
							<view class="analysis-details-tips">
								本月入不敷出啦，要注意开源节流~
							</view>
						</view>
					</view>
				</view>
				<view class="analysis-more" @click="comm('/pages/bill/bill')">
					<text>更多收支分析</text>
					<image class="analysis-more-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
				</view>
			</view>
			<view class="footer">
				<image class="footer-pages" src="/static/month-bg/ydzd.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import * as echarts from 'echarts';
	import {
		mapState,
	} from 'vuex'
	import {
		formatAmount,
		navigateTo,
		rpx2px
	} from '../../../utils';
	import {
		getMonthBillDetails
	} from '@/api/index.js'
	export default {
		data() {
			return {
				formatAmount: formatAmount,
				opacity: 1,
				loading: true,
				showFirst: true,
				showSecond: false,
				showThird: false,
				selectId: 2,
				time: 0,
				timer: null,
				tabs: [{
					name: '收入',
					id: 1
				}, {
					name: '支出',
					id: 2
				}],
				monthBillDetails: {},
				analysis: {},
				month: '',

			}
		},
		onLoad(options) {
			this.month = options.month
			this.dateTime = options.dateTime
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
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight']),
			list() {
				if (this.selectId == 1) {
					return this.analysis.incomeList
				}
				return this.analysis.expensesList
			},
			monthInfo() {
				return (month) => {
					let monthArr = [{
							id: 1,
							name: '1月账单',
							bg: '/static/month-bg/01.png',
							titleBg: '/static/month-bg/greenBill.png',
							bgColor: 'linear-gradient(180deg, #e6f5ca, #fff 7%, #fafcf7 40%, #f4faee)'
						},
						{
							id: 2,
							name: '2月账单',
							bg: '/static/month-bg/02.png',
							titleBg: '/static/month-bg/greenBill.png',
							bgColor: 'linear-gradient(180deg, #e6f5ca, #fff 7%, #fafcf7 40%, #f4faee)'
						},
						{
							id: 3,
							name: '3月账单',
							bg: '/static/month-bg/03.png',
							titleBg: '/static/month-bg/greenBill.png',
							bgColor: 'linear-gradient(180deg, #e6f5ca, #fff 7%, #fafcf7 40%, #f4faee)'
						},
						{
							id: 4,
							name: '4月账单',
							bg: '/static/month-bg/04.png',
							titleBg: '/static/month-bg/pinkBill.png',
							bgColor: 'linear-gradient(180deg, #fcefe7, #fff 16%, #fff 40%, #fff8f2)'
						},
						{
							id: 5,
							name: '5月账单',
							bg: '/static/month-bg/05.png',
							titleBg: '/static/month-bg/pinkBill.png',
							bgColor: 'linear-gradient(180deg, #fcefe7, #fff 16%, #fff 40%, #fff8f2)'
						},
						{
							id: 6,
							name: '6月账单',
							bg: '/static/month-bg/06.png',
							titleBg: '/static/month-bg/pinkBill.png',
							bgColor: 'linear-gradient(180deg, #fcefe7, #fff 16%, #fff 40%, #fff8f2)'
						},
						{
							id: 7,
							name: '7月账单',
							bg: '/static/month-bg/07.png',
							titleBg: '/static/month-bg/orangeBill.png',
							bgColor: 'linear-gradient(180deg, #fcefe7, #fff 48%, #fefcfa 57%, #fefdfb)'
						},
						{
							id: 8,
							name: '8月账单',
							bg: '/static/month-bg/8.png',
							titleBg: '/static/month-bg/orangeBill.png',
							bgColor: 'linear-gradient(180deg, #fcefe7, #fff 48%, #fefcfa 57%, #fefdfb)'
						},
						{
							id: 9,
							name: '9月账单',
							bg: '/static/month-bg/09.png',
							titleBg: '/static/month-bg/orangeBill.png',
							bgColor: 'linear-gradient(180deg, #fcefe7, #fff 48%, #fefcfa 57%, #fefdfb)'
						},
						{
							id: 10,
							name: '10月账单',
							bg: '/static/month-bg/010.png',
							titleBg: '/static/month-bg/purpleBill.png',
							bgColor: 'linear-gradient(180deg, #d1d5fd, #f8f9fe 7%, #fefcfa 50%, #e9ebf7)'
						},
						{
							id: 11,
							name: '11月账单',
							bg: '/static/month-bg/011.png',
							titleBg: '/static/month-bg/purpleBill.png',
							bgColor: 'linear-gradient(180deg, #d1d5fd, #f8f9fe 7%, #fefcfa 50%, #e9ebf7)'
						},
						{
							id: 12,
							name: '10月账单',
							bg: '/static/month-bg/012.png',
							titleBg: '/static/month-bg/purpleBill.png',
							bgColor: 'linear-gradient(180deg, #d1d5fd, #f8f9fe 7%, #fefcfa 50%, #e9ebf7)'
						}
					]
					return monthArr.find(item => item.id == this.month)
				}
			}
		},
		mounted() {
			this.animateElements()

		},
		methods: {
			comm(url) {
				navigateTo({
					url: url
				})
			},
			getMonthBillDetails() {
				getMonthBillDetails({
					dateTime: this.dateTime
				}).then((res) => {
					if (res.code === 200) {
						this.monthBillDetails = res.data
						this.analysis = res.data.incomeExpenseAnalysis
						let trend = res.data.incomeExpenseAnalysis.trend
						let xdata = trend.map(item => item.dateTime.split('-')[1] + '月')
						let income = trend.map(item => item.income)
						let expenses = trend.map(item => item.expenses)
						this.$nextTick(() => {
							this.init({
								grid: {
									top: '6%',
									left: '0%',
									right: '6%',
									bottom: '0',
									containLabel: true,
								},
								xAxis: [{
									type: 'category',
									data: xdata, // X 轴数据
									boundaryGap: false,
									axisLine: {
										show: false, // 隐藏 X 轴线
									},
									axisTick: {
										show: false // 隐藏刻度点
									},
									axisLabel: {
										fontSize: rpx2px(24),
										color: '#C2C2C2',
										formatter: function(value, index) {

											if (index === 3) {
												return '{red|' + value + '}';
											}
											return value;
										},
										rich: {
											red: {
												color: '#010101'
											}
										}
									}
								}],
								yAxis: [{
									show: false, // 隐藏 Y 轴
									type: 'value',
								}],
								series: [{
										name: '收入',
										type: 'line',
										data: trend.map(item => item.income), // 线的数据点
										markPoint: {
											data: [{
													coord: [xdata[xdata.length - 1],
														income[income.length - 1]
													], // 设置大圆的坐标
													symbol: 'circle', // 大圆的形状
													symbolSize: rpx2px(25), // 大圆的大小
													itemStyle: {
														color: '#C2BFFE' // 大圆的颜色：蓝色
													},
													label: {
														show: false // 隐藏大圆的标签
													}
												},
												{
													coord: [xdata[xdata.length - 1],
														income[income.length - 1]
													], // 设置小圆的坐标，位置和大圆相同
													symbol: 'circle', // 小圆的形状
													symbolSize: rpx2px(11), // 小圆的大小
													itemStyle: {
														color: '#8882FE' // 小圆的颜色：红色
													},
													label: {
														show: false // 隐藏小圆的标签
													}
												}
											]
										},
										lineStyle: {
											normal: {
												width: rpx2px(4),
												color: '#8882FE'
											}
										},
										showSymbol: false, // 隐藏折线上的数据点
										smooth: true // 平滑曲线
									},
									{
										name: '支出',
										type: 'line',
										data: trend.map(item => item.expenses), // 线的数据点
										markPoint: {
											data: [{
													coord: [xdata[xdata.length - 1],
														expenses[expenses
															.length - 1]
													], // 设置大圆的坐标
													symbol: 'circle', // 大圆的形状
													symbolSize: rpx2px(25), // 大圆的大小
													itemStyle: {
														color: '#F9C2A8' // 大圆的颜色：蓝色
													},
													label: {
														show: false // 隐藏大圆的标签
													}
												},
												{
													coord: [xdata[xdata.length -
														1], expenses[expenses
														.length - 1]], // 设置小圆的坐标，位置和大圆相同
													symbol: 'circle', // 小圆的形状
													symbolSize: rpx2px(11), // 小圆的大小
													itemStyle: {
														color: '#F27D46' // 小圆的颜色：红色
													},
													label: {
														show: false // 隐藏小圆的标签
													}
												}
											]
										},
										lineStyle: {
											normal: {
												width: rpx2px(4),
												color: '#F27D46'
											}
										},
										showSymbol: false, // 隐藏折线上的数据点
										smooth: true // 平滑曲线
									}
								]
							})
						})
					}
				})
			},
			async init(data) {
				// chart 图表实例不能存在data里
				const chart = await this.$refs.chartRef.init(echarts);
				chart.setOption(data)
			},
			animateElements() {
				let num = 1000
				this.timer = setInterval(() => {
					this.time += num
					this.showFirst = false
					this.showSecond = true
					if (this.time >= 2000) {
						this.showThird = true
						this.showSecond = false
					}
					if (this.time >= 3000) {
						this.showThird = false
						clearInterval(this.timer)
						setTimeout(() => {
							this.loading = false
							this.$nextTick(() => {
								this.getMonthBillDetails()
							})
						}, 500)
					}
				}, 1000)
			}
		}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.loading-page {
		width: 750rpx;
		height: 560rpx;
		background-image: url(/static/month-bg/loading.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 560rpx;
		position: fixed;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);

		.loading-item {

			width: 28rpx;
			height: 28rpx;
			border-radius: 28rpx;
			// background-color: #ccc;
			top: 373rpx;
			left: 120rpx;
			position: absolute;

			.dot {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 28rpx;
				background-color: #ccc;
			}

			.icon {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}

			.icon-loading {
				z-index: 3;
			}
		}

		.loading-item2 {
			top: 440rpx;
			left: 120rpx;
		}

		.loading-item3 {

			top: 504rpx;
			left: 120rpx;

		}

		@keyframes rotate {
			0% {
				transform: rotate(0)
			}

			to {
				transform: rotate(360deg)
			}
		}

		.rotate {
			animation: rotate 1s linear
		}
	}

	.main {
		width: 750rpx;
		min-height: 439rpx;
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 439rpx;
		padding-top: 206rpx;

		.footer {
			width: 750rpx;
			margin-top: 10rpx;
			;

			.footer-pages {
				width: 750rpx;
				display: block;
			}
		}

		.analysis {
			width: 690rpx;
			background: #FFFFFF;
			margin: 40rpx auto 0;
			border-radius: 20rpx;
			box-shadow: 0rpx 4rpx 6rpx rgba(0, 0, 0, 0.1);
			box-sizing: border-box;
			padding-bottom: 40rpx;

			.analysis-more {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #040100;
				font-size: 30rpx;
				margin-top: 50rpx;


				.analysis-more-icon {
					width: 48rpx;
					height: 48rpx;
				}

			}

			.analysis-details {
				width: 100%;
				position: relative;
				margin-top: 30rpx;

				.analysis-details-title {
					width: 652rpx;
					height: 56rpx;
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
					margin: auto;
				}

				.analysis-details-tips {
					border-top: 1rpx solid #EDECEA;
					width: 100%;
					margin-top: 30rpx;
					padding-top: 30rpx;
				}

				.analysis-details-content {
					width: 590rpx;
					min-height: 300rpx;
					margin: -30rpx auto 0;
					position: relative;
					z-index: 2;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding-top: 60rpx;
					color: #040100;
					font-size: 28rpx;
					line-height: 1;
					padding-bottom: 40rpx;

					.analysis-details-list {
						width: 100%;
						padding: 0 30rpx 0 12rpx;
						box-sizing: border-box;
						margin-top: 40rpx;
						position: relative;



						.analysis-details-item {
							display: flex;
							align-items: center;
							color: #040100;
							font-size: 28rpx;
							margin-bottom: 40rpx;

							&:last-child {
								margin-bottom: 0;
							}

							.analysis-details-item-name {
								flex: 1;
								margin-left: 20rpx;


							}

							.analysis-details-item-money {
								color: #000000;
								font-weight: 700;
							}
						}
					}

					.analysis-details-money {
						font-size: 44rpx;
						font-weight: 700;
						margin: 15rpx 0 26rpx 0;
					}


				}

			}

			.analysis-chart {
				margin-top: 30rpx;
				padding: 0 12rpx;
				box-sizing: border-box;
				width: 100%;
				height: 300rpx;
			}

			.analysis-list {
				margin-top: 30rpx;
				display: flex;
				padding: 0 30rpx;
				box-sizing: border-box;
				justify-content: space-between;
				;

				.analysis-item {
					color: #000000;
					font-size: 28rpx;
					font-weight: 700;

					.analysis-item-title {
						color: #030303;
						font-weight: 500;
						display: flex;
						align-items: center;
						margin-bottom: 6rpx;

						.analysis-item-title-dot {
							width: 12rpx;
							height: 12rpx;
							border-radius: 4rpx;
							margin-right: 8rpx;
							background-color: #7D75EC;
						}

						.analysis-item-title-dot2 {
							background-color: #FCA456;
						}
					}
				}
			}

			.analysis-title {
				display: flex;
				align-items: center;
				padding: 30rpx 24rpx;
				justify-content: space-between;

				.analysis-tabs {
					display: flex;
					align-items: center;

					.analysis-tabs-item {
						width: 113rpx;
						height: 58rpx;
						background: #F1F1F1;
						display: flex;
						align-items: center;
						color: #0D0D0D;
						font-size: 24rpx;
						justify-content: center;
						border-radius: 29rpx 29rpx 29rpx 29rpx;
						margin-left: 16rpx;

						&.active {
							background: #010101;
							color: #FFFFFF;
						}
					}
				}

				.title-left {
					display: flex;
					align-items: center;
					font-size: 34rpx;
					line-height: 1;
					font-weight: 700;
					color: #0C0906;

					.titlle-left-icon {
						width: 32rpx;
						height: 32rpx;
						margin-left: 16rpx;
					}
				}
			}
		}

		.card {
			width: 690rpx;
			background: #FFFFFF;
			margin: 70rpx auto 0;
			border-radius: 20rpx;
			box-shadow: 0rpx 4rpx 6rpx rgba(0, 0, 0, 0.1);
			padding: 40rpx 30rpx 34rpx 30rpx;
			box-sizing: border-box;

			.card-footer {
				width: 100%;
				height: 80rpx;
				background-color: #F8F8F8;
				border-radius: 8rpx;
				font-size: 30rpx;
				padding-left: 16rpx;
				box-sizing: border-box;
				line-height: 80rpx;
				color: #5E5E5E;
			}

			.card-list {
				display: flex;
				flex-wrap: wrap;

				.card-item {
					width: 50%;
					margin-bottom: 40rpx;


					.card-item-content {
						font-size: 34rpx;
						color: #000000;
						font-weight: 700;
					}

					.card-item-title {
						display: flex;
						align-items: center;
						font-size: 30rpx;
						color: #818181;
						margin-bottom: 20rpx;


						.card-item-title-icon {
							width: 64rpx;
							height: 32rpx;
							margin-left: 12rpx;
						}
					}
				}
			}

		}

		.assets {
			display: flex;
			justify-content: space-between;
			padding: 48rpx 62rpx 0 62rpx;

			.assets-left {
				font-size: 30rpx;
				line-height: 1;
				font-weight: 500;
				color: #0C0906;

				.assets-money {
					color: #4CAB5A;
					font-size: 30rpx;
					font-weight: 700;
					margin-top: 40rpx;
				}

				.assets-number {
					color: #000000;
					font-size: 48rpx;
					font-weight: bold;
					margin-top: 24rpx;
				}

				.assets-left-title {
					display: flex;
					align-items: center;

					.assets-left-icon {
						width: 32rpx;
						height: 32rpx;
						margin-left: 20rpx;
					}
				}

			}
		}

		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx 30rpx 48rpx;

			.titlle-right {
				display: flex;
				align-items: center;
				font-size: 30rpx;
				line-height: 1;
				font-weight: 500;
				color: #0C0906;

				.titlle-left-icon {
					width: 32rpx;
					height: 32rpx;
				}
			}

			.titlle-left {
				display: flex;
				align-items: center;
				font-size: 40rpx;
				line-height: 1;
				color: #000000;
				font-weight: 500;

				.titlle-left-icon {
					width: 32rpx;
					height: 32rpx;
					margin-left: 20rpx;

				}
			}
		}
	}
</style>
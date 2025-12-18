<template>
	<view>
		<navbar :title="name" :service-btn="false" :more-btn="false">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`}">
					<text>批量修改</text>
				</view>
			</slot>
		</navbar>
		<view class="main">
			<view class="chat">
				<view class="active"></view>
				<view class="chart-content" ref="chart">
					<l-echart ref="chartRef" @finished="init"></l-echart>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<view class="title-left">
						总{{incomeExpenseType=='1'?'收入':'支出'}}
						￥<text>{{formatAmount(Math.abs(incomeExpenseType=='1'?incomeTotal:expensesTotal))}}</text>
					</view>
					<view class="title-right">
						<text>{{dateTimeTitle}}{{type==0?'月':'年'}}共{{total}}笔</text>
						<image class="title-right-icon" src="/static/home/bill-info-icon.png"></image>
					</view>
				</view>
				<view class="rank-tabs">
					<view @click="changeRankTabs(item)" :class="['rank-tab',rank==item.rank?'rank-active':'']"
						v-for="(item,index) in rankList" :key="index">
						{{item.name}}
					</view>
				</view>
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="item-left">
						<view class="item-name">
							{{item.excerpt}}
						</view>
						<view class="item-bank">
							{{item.bankCard}}
						</view>
					</view>
					<view class="item-right">
						<view class="item-amount">
							{{momneyStr(item.amount)}}
						</view>
						<view class="item-time">
							{{item.transactionTime}}
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" icon loading-text=" " loadmoreText=" " nomore-text=" " />
			<!-- <CategoryChat></CategoryChat> -->
		</view>
	</view>
</template>

<script>
	import * as echarts from 'echarts';
	import {
		mapState,
	} from 'vuex'
	import {
		getBillAnalysis,
		getBillCategoryList
	} from '@/api/index.js'
	import {
		formatAmount,
		rpx2px
	} from '../../../utils';
	import CategoryChat from './components/categoryChat/categoryChat.vue'
	export default {
		components: {
			CategoryChat
		},
		data() {
			return {
				chart: null,
				formatAmount: formatAmount,
				status: 'loading',
				name: '',
				trendList: [],
				type: '', // 0月度 1年度
				pageNum: 1,
				pageSize: 10,
				list: [],
				total: 1,
				dateTime: '',
				incomeExpenseType: '', // 1收入 2支出
				rank: '0',
				rankList: [{
					name: '按时间',
					rank: '0'
				}, {
					name: '按金额',
					rank: '1'
				}],
				expensesTotal: 0,
				incomeTotal: 0,
				zoomTimer: null, // 添加防抖定时器
			}
		},
		onLoad(options) {
			this.name = options.name
			this.type = options.type
			this.dateTime = options.dateTime
			this.incomeExpenseType = options.tab == 0 ? '1' : '2'
		},
		mounted() {
			this.getBillAnalysis()
			this.getBillCategoryList()
		},
		beforeDestroy() {
			// 清除防抖定时器
			if (this.zoomTimer) {
				clearTimeout(this.zoomTimer);
			}
		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight']),
			momneyStr() {
				return (amount) => {
					let num = parseFloat(amount)
					if (num > 0) {
						return `￥${formatAmount(num.toFixed(2))}`
					} else {
						return `-￥${formatAmount(Math.abs(num).toFixed(2))}`
					}
				}
			},
			dateTimeTitle() {
				if (this.type == 0) {
					return this.dateTime.slice(5);
				} else {
					return this.dateTime.slice(0, 4);
				}
			},
			chatData() {
				const incomeList = this.trendList.map(item => item.income);
				const expensesList = this.trendList.map(item => Math.abs(item.expenses));
				const dateTimeList = this.trendList.map(item => {
					const date = new Date(item.dateTime);
					if (this.type == 1) {
						return `${date.getFullYear()}年`;
					}
					return `${date.getMonth()+1}月`;
				});
				return {
					incomeList,
					expensesList,
					dateTimeList
				};
			},
		},
		onReachBottom() {
			if (this.total <= this.list.length) {
				this.status = 'nomore'
				return;
			}
			this.pageNum = this.pageNum + 1
			this.status = 'loading'

			this.getBillCategoryList()
		},
		methods: {
			changeRankTabs(item) {
				if (item.rank === this.rank) return
				this.status = 'loading'
				this.pageNum = 1
				this.list = []
				this.rank = item.rank
				this.getBillCategoryList()
			},
			getBillCategoryList() {
				getBillCategoryList({
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					dateTime: this.dateTime,
					type: this.type,
					rank: this.rank,
					name: this.name,
					incomeExpenseType: this.incomeExpenseType
				}).then(res => {
					if (res.code === 200) {
						this.list = [...this.list, ...res.data.list]
						this.total = res.data.total
						this.expensesTotal = res.data.expensesTotal
						this.incomeTotal = res.data.incomeTotal
						if (this.total <= this.list.length) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore'
						}
					} else {
						this.status = 'loadmore'
					}
				})
			},
			async init(data = {}) {
        console.log(this.$refs.chartRef);
				// chart 图表实例不能存在data里
				this.chart = await this.$refs.chartRef.init(echarts);
				let chart = this.chart
				this.bindChartEvents();
				chart.setOption(data)
			},
			bindChartEvents() {
				if (!this.chart) {
					console.error('Chart instance is not available.');
					return;
				}
				// 数据缩放变化事件
				// 移除之前的事件监听
				this.chart.off('datazoom');
				// 使用 datazoom 事件替代不存在的 datazoomended 事件
				this.chart.on('datazoom', this.handleDataZoom);
			},
			handleDataZoom(params) {
				// 使用防抖机制，确保只在最后一次触发后执行
				if (this.zoomTimer) {
					clearTimeout(this.zoomTimer);
				}
				this.zoomTimer = setTimeout(() => {
					this.handleDataZoomEnd(params);
				}, 300); // 300ms 的防抖延迟
			},
			handleDataZoomEnd(params) {
				// 滑动结束后触发
				console.log('滑动结束', params);
				// 在这里添加你需要执行的逻辑
				// 计算中间区域数据
				this.calculateCenterData();
			},

			calculateCenterData() {
				if (!this.chart) {
					console.warn('图表实例不存在');
					return;
				}
				try {
					// 获取当前图表配置
					const option = this.chart.getOption();
					// 获取数据长度
					const dataLength = this.chatData.dateTimeList?.length || 0;
					if (dataLength === 0) {
						console.warn('没有数据');
						return;
					}

					// 获取 dataZoom 配置
					const dataZoom = option.dataZoom && option.dataZoom[0];
					if (!dataZoom) {
						console.warn('没有找到 dataZoom 配置');
						return;
					}

					// 计算当前显示的数据范围
					let startIndex, endIndex;

					if (dataZoom.startValue !== undefined && dataZoom.endValue !== undefined) {
						// 基于索引的缩放
						startIndex = Math.max(0, dataZoom.startValue);
						endIndex = Math.min(dataLength - 1, dataZoom.endValue);
					} else {
						// 基于百分比的缩放
						const startRatio = (dataZoom.start || 0) / 100;
						const endRatio = (dataZoom.end || 100) / 100;
						startIndex = Math.floor(startRatio * dataLength);
						endIndex = Math.ceil(endRatio * dataLength);
					}

					console.log(`显示范围: ${startIndex} - ${endIndex}, 总数据: ${dataLength}`);

					// 计算中间位置
					const visibleCount = endIndex - startIndex;
					const middleIndex = Math.floor(startIndex + visibleCount / 2);

					// 确保索引在有效范围内
					const safeIndex = Math.max(0, Math.min(middleIndex, dataLength - 1));

					// 获取中间数据
					const centerData = {
						index: safeIndex,
						date: this.chatData.dateTimeList[safeIndex],
						value: this.incomeExpenseType == 1 ?
							this.chatData.incomeList[safeIndex] : this.chatData.expensesList[safeIndex],
						visibleRange: {
							start: startIndex,
							end: endIndex,
							count: visibleCount
						},
						timestamp: new Date().toISOString()
					};

					console.log('📊 屏幕中间区域数据:', centerData);

					// 触发事件或更新状态
					this.onCenterDataChanged(centerData);

				} catch (error) {
					console.error('计算中间数据失败:', error);
				}
			},
			onCenterDataChanged(centerData) {
				// 在这里处理中间数据变化的业务逻辑
				console.log('🎯 中间数据已更新:', {
					日期: centerData.date,
					数值: centerData.value,
					位置: `第 ${centerData.index + 1} 个数据`,
					显示范围: `${centerData.visibleRange.start + 1} - ${centerData.visibleRange.end + 1}`,
					可见数据点: centerData.visibleRange.count
				});
				let currentCenterData = this.trendList[centerData.index]

				// 2. 更新本地状态
				if (this.type == 0) {
					this.dateTime = currentCenterData.dateTime.slice(0, 7);
				} else {
					this.dateTime = currentCenterData.dateTime.slice(0, 4);
				}
				this.status = 'loading'
				this.pageNum = 1
				this.list = []
				this.getBillCategoryList()

			},
			getBillAnalysis() {
				getBillAnalysis({
					dateTime: this.dateTime,
					type: this.type
				}).then(res => {
					if (res.code === 200) {
						let trendList = res.data.trendList.reverse()
						let lastArr = trendList.slice(-3)
						trendList = [...trendList, ...lastArr]
						this.trendList = trendList
						const dataLength = this.trendList.length;
						const visiblePoints = 7;;
						// 精确计算显示范围  
						let startValue = 0;
						let endValue = dataLength - 1;

						if (dataLength > visiblePoints) {
							startValue = dataLength - visiblePoints;
							endValue = dataLength - 1;
						}
						const originalData = this.incomeExpenseType == 1 ?
							this.chatData.incomeList :
							this.chatData.expensesList;

						// 处理数据：最后三条设为null
						const processedData = [...originalData];
						for (let i = Math.max(0, dataLength - 3); i < dataLength; i++) {
							processedData[i] = null;
						}

						this.$nextTick(() => {
							this.init({
								grid: {
									top: rpx2px(80),
									left: '0%',
									right: '0%',
									bottom: rpx2px(10),
								},
								xAxis: {
									position: 'top', // 文字放在上面
									type: 'category',
									data: this.chatData.dateTimeList.map((date, index) =>
										index >= dataLength - 3 ? '' : date
									),
									boundaryGap: false, // 确保数据从左边开始
									axisLine: {
										show: false, // 隐藏 X 轴线
									},
									axisTick: {
										show: true, // 显示刻度线
										alignWithLabel: true,
										length: rpx2px(200), // 刻度线长度
										lineStyle: {
											color: '#C5C4C9',
											width: 1,
											type: 'dashed' // 虚线刻度线
										},
										// 关键：隐藏最后三个刻度线
										interval: (index) => {
											return index < dataLength -
												3; // 最后三个返回false，不显示刻度线
										}
									},
								},
								yAxis: {
									type: 'value',
									show: false, // 隐藏Y轴
								},
								series: [{
									color: '#F5986C',
									data: processedData,
									type: 'line',
									smooth: true
								}],
								dataZoom: [{
									connectNulls: false, // 不连接null值，这样最后三条就没有连线
									type: 'inside', // 启用内部滑动
									xAxisIndex: [0], // 只作用于第一个 x 轴
									startValue: startValue, // 使用索引值更精确
									endValue: endValue,
									zoomLock: dataLength <= 7 // 锁定缩放，避免用户缩放影响滑动
								}]
							})
						})
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		padding-right: 40rpx;
		color: #FFFFFF;
		font-size: 26rpx;
		font-weight: 400;
		position: absolute;
	}

	.main {
		width: 750rpx;

		.list {
			width: 100%;

			.item {
				display: flex;
				justify-content: space-between;
				padding: 0 26rpx 0 30rpx;
				box-sizing: border-box;
				color: #333;
				font-size: 24rpx;
				margin-bottom: 50rpx;

				.item-right {
					text-align: right;

					.item-amount {
						margin-bottom: 10rpx;
						font-weight: 600;
					}
				}

				.item-left {
					.item-bank {
						color: #999999;
					}

					.item-name {
						font-size: 28rpx;
						margin-bottom: 10rpx;
					}
				}
			}

			.rank-tabs {
				display: flex;
				align-items: center;
				padding-left: 30rpx;
				box-sizing: border-box;
				margin-top: 50rpx;
				margin-bottom: 50rpx;

				.rank-tab {
					width: 108rpx;
					height: 58rpx;
					background: #F8F8F8;
					text-align: center;
					line-height: 58rpx;
					color: #333333;
					font-size: 24rpx;
					border-radius: 29rpx 29rpx 29rpx 29rpx;
					margin-right: 24rpx;


					&.rank-active {
						background: #FFEFE8;
						color: #DB9071;
					}
				}
			}

			;

			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 40rpx 20rpx 0 30rpx;
				box-sizing: border-box;
				color: #333333;

				.title-left {
					font-size: 36rpx;

					text {
						font-weight: 600;
					}
				}

				.title-right {
					display: flex;
					align-items: center;
					font-size: 28rpx;

					.title-right-icon {
						width: 32rpx;
						margin-left: 6rpx;

						height: 32rpx;
					}
				}
			}
		}

		.chat {
			width: 100%;
			background-color: #F6F5FA;
			height: 310rpx;
			position: relative;

			.chart-content {
				width: 100%;
				height: 290rpx;
			}

			&:before {
				width: 0;
				height: 0;
				border-left: 22rpx solid transparent;
				border-right: 22rpx solid transparent;
				border-bottom: 20rpx solid #fff;
				content: '';
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 0;
				z-index: 2;

			}

			.active {
				width: 150rpx;
				height: 260rpx;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 0;
				background: linear-gradient(to bottom, rgba(255, 229, 184, 0) 0%, rgba(255, 229, 184, 1) 100%);

			}

		}
	}
</style>
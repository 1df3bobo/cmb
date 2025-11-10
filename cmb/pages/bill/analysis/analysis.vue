<template>
	<view class="app">
		<navbar bg-color="#f8f8f8" more-btn service-btn title="收支分析">
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
					<view class="item filter">
						<text @click="changeTabs(item)"
							:class="['filter-text',timeMode==item.mode?'filter-text-active':'']"
							v-for="(item,index) in timeTabs" :key="index">{{item.name}}</text>
					</view>
				</view>
			</u-sticky>
			<view class="card">
				<view class="detail">
					<view class="details-item">
						<view class="details-item-money">
							{{details.cashSurplus<0?'-':''}}￥{{formatAmount(Math.abs(details.cashSurplus))}}
						</view>
						<view class="details-item-name">结余</view>
					</view>
					<view class="details-item">
						<view class="details-item-money">￥{{formatAmount(details.income)}}</view>
						<view class="details-item-name">
							<text class="details-item-name-dot"></text>
							<text>收入</text>
						</view>
					</view>
					<view class="details-item">
						<view class="details-item-money">
							{{details.expenses<0?'-':''}}￥{{formatAmount(Math.abs(details.expenses))}}
						</view>
						<view class="details-item-name">
							<text class="details-item-name-dot details-item-name-dot2"></text>
							<text>支出</text>
						</view>
					</view>
				</view>
				<scroll-view v-if="trendList.length>0" :show-scrollbar="false" scroll-x class="month-chat"
					:scroll-into-view="`item${scrollIntoView}`">
					<view @click="changeChat(item)" v-for="(item, index) in trendList" :key="index"
						:id="`item${item.dateTime}`"
						:class="['bar-group',selectTrend.dateTime === item.dateTime?'active-bar-group':'']">
						<view class="chat-contennt">
							<view class="chat-bar">
								<view class="bar income-bar" :style="{ height: getBarHeight(item.income) + '%' }">
								</view>
								<view class="bar expenses-bar"
									:style="{ height: getBarHeight(Math.abs(item.expenses)) + '%' }">
								</view>
							</view>
							<view class="date-label">{{ formatDate(item.dateTime) }}</view>
						</view>
					</view>
				</scroll-view>
				<view class="chat-tips">
					<text>过去3月结余为负，小招教你如何科学攒钱</text>
					<image class="chat-tips-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
				</view>
			</view>
			<view class="details">
				<view class="details-title">
					<view class="detail-tabs">
						<view @click="changeDetailsTab(item)"
							:class="['detail-tab',item.type == tab?'detail-tab-active':'']" v-for="(item,index) in tabs"
							:key="index">
							{{item.name}}
						</view>
					</view>
					<view class="upTotalAmount">
						<text>{{timeMode == 0?'对比上月':'对比上年'}}</text>
						<u-switch size="18" v-model="switchValue" activeColor="#000" inactiveColor="#D2CFC8"></u-switch>
					</view>
				</view>
				<view class="details-money">
					<text>弹性{{tab==1?'支出':'收入'}}</text>
					<view v-if="tab == 0">￥{{formatAmount(details.income)}}</view>
					<view v-else>
						{{details.expenses<0?'-':''}}￥{{formatAmount(Math.abs(details.expenses))}}
					</view>
				</view>
				<view class="cateogry-list">
					<view class="row" v-for="(item, index) in chunkedItems" :key="index">
						<view class="item" @click="cateogryList(subItem)" v-for="(subItem, subIndex) in item"
							:key="subIndex" :style="{
           width: calculateWidth(item.length) + 'rpx',  marginRight: subIndex < item.length - 1 ? '20rpx' : '0' 
        }">
							<image :src="subItem.categoryIcon" class="icon" />
							<view>{{ subItem.name }}</view>
							<view v-if="switchValue" :style="{color:subItem.upTotalAmount>0?'#E74A55':'#4CAB5A'}">
								{{subItem.upTotalAmount>0?'+':'-'}}{{ formatMoney(subItem.upTotalAmount) }}
							</view>
							<view v-else>
								{{ formatMoney(subItem.totalAmount) }}
							</view>
						</view>
					</view>
				</view>
				<view class="transaction-list" v-if="timeMode == 0">
					<view class="transaction-item" v-if="index<3" v-for="(item,index) in transactioList" :key="index">
						<view class="transaction-name">
							{{item.name}}
						</view>
						<view class="transaction-monry">
							￥{{formatAmount(Math.abs(item.amount))}}
						</view>
					</view>
					<view class="more-transaction" @click="moreTransaction">
						<text>更多交易</text>
						<image class="more-transaction-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<u-picker @confirm="pickerConfirm" closeOnClickOverlay @close="timePopShow = false"
			@cancel="timePopShow = false" :defaultIndex="defaultIndex" :show="timePopShow"
			:columns="generateTimeList"></u-picker>
		<billBankCardPop :show="billBankCardShow" @close="billBankCardShow = false" @change="bankCardChange">
		</billBankCardPop>
	</view>
</template>

<script>
	import * as echarts from 'echarts'
	import {
		mapState
	} from 'vuex'
	import {
		rpx2px,
		formatAmount,
		navigateTo
	} from '../../../utils'
	import {
		getBillAnalysis
	} from '@/api/index.js'
	export default {
		data() {
			return {
				selectTrend: {},
				formatAmount: formatAmount,
				timePopShow: false,
				billFilterShow: false,
				billBankCardShow: false,
				bankCard: '银行卡',
				selectDate: { // 选择的时间
					text: ''
				},
				timeTabs: [{
					mode: '0',
					name: '月度'
				}, {
					mode: '1',
					name: '年度'
				}],
				selectDate: { // 选择的时间
					text: ''
				},
				tabs: [{
					type: '0',
					name: '收入'
				}, {
					type: '1',
					name: '支出'
				}],
				tab: '1',
				timeMode: '0',
				defaultIndex: [0],
				dateTime: '',
				details: {},
				trendList: [],
				scrollIntoView: '',
				switchValue: false,
			

			}
		},
		computed: {
			...mapState(['userInfo', 'navBarHeight', 'statusBarHeight']),
			transactioList() {
				let list = this.tab == 0 ? this.details.incomeRankList : this.details.expensesRankList
				if (!list) return []
				return list
			},
			// 格式化金额显示
			formatMoney() {
				return (amount) => {
					if (amount >= 10000) {
						// 超过1万的金额显示为 "万" 单位
						return (amount / 10000).toFixed(2) + '万';
					} else {
						// 不到1万的金额保留两位小数
						return amount.toFixed(2);
					}
				}
			},
			chunkedItems() {
				let list = this.tab == 0 ? this.details.incomeCateogryList : this.details.expensesCateogryList
				if (!list) return []
				const chunkSize = 3; // 每行最多3个元素
				const result = [];
				for (let i = 0; i < list.length; i += chunkSize) {
					result.push(list.slice(i, i + chunkSize));
				}
				return result;
			},
			maxValue() {
				// 计算最大值，用于确定柱状图高度比例
				let max = 0;
				this.trendList.forEach(item => {
					max = Math.max(max, item.income, item.expenses);
				});
				return max;
			},
			// 生成时间列表
			generateTimeList() {
				const now = new Date()
				const currentYear = now.getFullYear()
				const currentMonth = now.getMonth() + 1
				let tempList = []

				if (this.timeMode === '1') {
					// 年选择器：生成10年的年份列表（从当前年份往前10年）
					for (let i = 0; i < 10; i++) {
						const year = currentYear - 9 + i
						tempList.push(year)
					}
				} else {
					// 年月选择器：生成10年内的年月列表，格式：2025.10
					// 从10年前开始到当前年月
					const startYear = currentYear - 9

					for (let year = startYear; year <= currentYear; year++) {
						// 计算每年的结束月份
						const endMonth = year === currentYear ? currentMonth : 12

						for (let month = 1; month <= endMonth; month++) {
							tempList.push(`${year}.${month.toString().padStart(2, '0')}`)
						}
					}
				}
				return [tempList.reverse()]
			},
		},
		onLoad(options) {
			this.dateTime = options.dateTime
			const currentDate = new Date();
			const currentYear = currentDate.getFullYear();
			const currentMonth = ((currentDate.getMonth() + 1) < 10) ? ('0' + currentDate.getMonth() + 1) : (currentDate
				.getMonth() + 1)
			this.$set(this.selectDate, 'text', `${currentYear}.${currentMonth}`)
			this.getBillAnalysis()
		},
		methods: {
			cateogryList(item) {
				navigateTo({
					url: `/pages/bill/categoryList/categoryList?name=${item.name}&dateTime=${this.dateTime}&tab=${this.tab}&type=${this.timeMode}`
				})
			},
			moreTransaction() {
				let type = this.tab == 0 ? '1' : '2'
				navigateTo({
					url: '/pages/bill/incomeExpenseRank/incomeExpenseRank?type=' + type + '&dateTime=' +
						this.dateTime
				})
			},
			changeDetailsTab(item) {
				this.tab = item.type
			},
			calculateWidth(itemCount) {
				const maxWidth = 640; // 最大宽度
				const margin = 20; // 每个元素之间的间距
				// 计算每个元素宽度：如果是4个或5个，则平分行宽
				let widthPerItem = (maxWidth - (margin * (itemCount - 1))) / itemCount;

				return widthPerItem;
			},

			changeChat(item) {
				this.scrollIntoView = item.dateTime
				this.selectTrend = item
				if (this.timeMode == 0) {
					this.dateTime = item.dateTime.slice(0, 7);
				} else {
					this.dateTime = item.dateTime.slice(0, 4);
				}
				this.getBillAnalysis()
			},
			getBarHeight(value) {
				// 计算柱状图高度百分比
				return (value / this.maxValue) * 80;
			},
			formatDate(dateString) {
				const date = new Date(dateString);
				if (this.timeMode == 1) {
					return `${date.getFullYear()}年`;
				}
				return `${date.getMonth()+1}月`;
			},
			changeTabs(item) {
				this.timeMode = item.mode
				if (this.timeMode === '1') {
					const currentDate = new Date();
					const currentYear = currentDate.getFullYear();
					this.$set(this.selectDate, 'text', currentYear)
					this.dateTime = currentYear
				} else {
					const currentDate = new Date();
					const currentYear = currentDate.getFullYear();
					const currentMonth = ((currentDate.getMonth() + 1) < 10) ? ('0' + currentDate.getMonth() + 1) : (
						currentDate
						.getMonth() + 1)
					this.$set(this.selectDate, 'text', `${currentYear}.${currentMonth}`)
					this.dateTime = `${currentYear}-${currentMonth}`
				}
				this.scrollIntoView = ''
				this.selectTrend = {}
				this.getBillAnalysis()
			},
			getBillAnalysis() {
				getBillAnalysis({
					dateTime: this.dateTime,
					type: this.timeMode
				}).then(res => {
					if (res.code === 200) {
						this.details = res.data
						let trendList = res.data.trendList.reverse()
						this.trendList = trendList
						if (!this.selectTrend.dateTime) {
							this.selectTrend = trendList[trendList.length - 1]
						}
						if (!this.scrollIntoView) {
							this.scrollIntoView = trendList[trendList.length - 1].dateTime
						}
					}
				})
			},
			bankCardChange(value) {
				this.bankCard = value.name
			},
			timeChange(e) { // 时间选择
				this.selectDate = e
			},
			pickerConfirm(e) {
				this.$set(this.selectDate, 'text', e.value[0])
				if (this.timeMode == 0) {
					this.dateTime = e.value[0].replace('.', '-')
				} else {
					this.dateTime = e.value[0].toString()
				}
				this.timePopShow = false
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

	.details {
		width: 690rpx;
		background: #FFFFFF;
		min-height: 300rpx;
		margin: 34rpx auto;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding-top: 32rpx;
		padding-bottom: 32rpx;

		.more-transaction {
			display: flex;
			align-items: center;
			justify-content: center;
			color: #000000;
			font-size: 26rpx;

			.more-transaction-icon {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.transaction-list {
			width: 640rpx;
			margin: auto;
			margin-top: 30rpx;

			.transaction-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #000000;
				font-weight: 500;
				line-height: 1;
				margin-bottom: 78rpx;

				.transaction-name {
					font-size: 26rpx;
				}

				.transaction-monry {
					font-size: 30rpx;
				}
			}
		}

		.cateogry-list {
			width: 640rpx;
			min-height: 193rpx;
			display: flex;
			flex-direction: column;
			margin: 38rpx auto 0;

			.row {
				display: flex;
				justify-content: space-between;
				margin-bottom: 16rpx;
			}

			.item {
				height: 193rpx;
				display: flex;
				flex-direction: column;
				background-color: #F8F8F8;
				border-radius: 12rpx;
				padding: 42rpx 0 0 27rpx;
				box-sizing: border-box;
				color: #000000;
				font-size: 26rpx;
			}

			.icon {
				width: 50rpx;
				height: 50rpx;
			}

			.text {
				margin-top: 28rpx;
			}
		}

		.details-money {
			display: flex;
			padding: 0 27rpx 0 38rpx;
			box-sizing: border-box;
			justify-content: space-between;
			align-items: center;
			margin-top: 50rpx;
			line-height: 1;
			color: #000000;
			font-size: 32rpx;
		}

		.details-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 38rpx;
			box-sizing: border-box;

			.upTotalAmount {
				display: flex;
				align-items: center;
				color: #000000;
				font-size: 26rpx;

				text {
					margin-right: 16rpx;
				}

			}

			.detail-tabs {
				display: flex;
				align-items: center;

				.detail-tab {
					width: 108rpx;
					height: 58rpx;
					background: #F1F1F1;
					text-align: center;
					line-height: 58rpx;
					color: #000000;
					font-size: 24rpx;
					border-radius: 29rpx 29rpx 29rpx 29rpx;
					margin-right: 24rpx;

					&.detail-tab-active {
						background: #000000;
						color: #FFFFFF;
					}
				}
			}

		}
	}

	.card {
		width: 690rpx;
		min-height: 400rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		margin: auto;

		.chat-tips {
			display: flex;
			padding: 42rpx 17rpx 42rpx 27rpx;
			align-items: center;
			color: #000000;
			font-size: 26rpx;
			justify-content: space-between;


			.chat-tips-icon {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.month-chat {
			height: 245rpx;
			width: 100%;
			white-space: nowrap;
			padding: 0 20rpx;
			box-sizing: border-box;

			.bar-group {
				display: inline-block;
				width: 96rpx;
				height: 100%;
				position: relative;
				margin-right: 32rpx;

				&:last-child {
					margin-right: 0;
				}

				&.active-bar-group {
					width: 96rpx;
					height: 245rpx;
					background: linear-gradient(180deg, #FFFFFF 0%, #FFF4EF 100%);
					border-radius: 0rpx 0rpx 0rpx 0rpx;
				}

				.chat-contennt {
					height: 100%;
					width: 100%;

					.chat-bar {
						height: 172rpx;
						display: flex;
						align-items: flex-end;
						justify-content: center;
					}
				}
			}

			.bar {
				width: 6rpx;
				margin: 0 5rpx;
				display: flex;
				justify-content: center;
				align-items: flex-end;
				position: relative;
				transition: height 0.3s;
			}

			.income-bar {
				background: linear-gradient(180deg, #8D9DED 0%, #5C71D3 100%);
				border-radius: 4rpx 4rpx 0 0;
			}

			.expenses-bar {
				background: linear-gradient(180deg, #FEA783 0%, #FF7739 100%);
				border-radius: 4rpx 4rpx 0 0;
			}

			.date-label {
				margin-top: 30rpx;
				font-size: 24rpx;
				line-height: 1;
				color: #808080;
				text-align: center;
				width: 96rpx;
			}
		}

		.detail {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 56rpx 37rpx 0 21rpx;
			line-height: 1;
			margin-bottom: 34rpx;


			.details-item {
				color: #000000;
				font-size: 26rpx;

				.details-item-money {
					font-weight: 700;
					font-size: 28rpx;
					margin-bottom: 14rpx;
				}

				.details-item-name {
					display: flex;
					align-items: center;

					.details-item-name-dot {
						width: 12rpx;
						height: 12rpx;
						background: #586DD1;
						border-radius: 2rpx 2rpx 2rpx 2rpx;
						margin-right: 16rpx;
					}

					.details-item-name-dot2 {
						background-color: #FF7738;
					}
				}
			}


		}
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
				display: flex;
				color: #808080;

				.filter-text {
					margin-left: 56rpx;
				}

				.filter-text-active {
					color: #000;
				}
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
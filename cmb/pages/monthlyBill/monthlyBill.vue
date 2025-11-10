<template>
	<view class="app">
		<navbar service-btn more-btn title="月度账单">
		</navbar>
		<view class="main">
			<view class="title">
				<view class="title-text">月度账单</view>
				<view>共24个账单</view>
			</view>
			<view class="list" v-if="monthBillList.length>0">
				<view class="item" v-for="(item,index) in monthBillList">
					<view class="item-title" v-if="index === 0 || item.year !== monthBillList[index - 1].year">
						{{item.year}}年
					</view>
					<view class="item-content" @click="details(item)"
						:style="{backgroundImage:`url(${monthBg(item.month)})`}">
						<view class="item-details">
							<view class="details-title">
								支出
							</view>
							<view class="details-money">
								{{formatAmount(item.expenses)}}
							</view>
							<view class="details-trend">
								<text>较上月</text>
								<image v-if="item.upExpenses>=0" src="/static/month-bg/up.png" mode=""></image>
								<image v-else src="/static/month-bg/down.png" mode=""></image>
								<text>￥{{formatAmount(item.upExpenses)}}</text>
							</view>
						</view>
						<view class="item-details">
							<view class="details-title">
								收入
							</view>
							<view class="details-money">
								{{formatAmount(item.income)}}
							</view>
							<view class="details-trend">
								<text>较上月</text>
								<image v-if="item.upIncome>=0" src="/static/month-bg/up.png" mode=""></image>
								<image v-else src="/static/month-bg/down.png" mode=""></image>
								<text>￥{{formatAmount(item.upIncome)}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatAmount,
		navigateTo
	} from '@/utils/index.js'
	import {
		getMonthBillList
	} from '@/api/index.js'
	export default {
		data() {
			return {
				formatAmount: formatAmount,
				monthBillList: []
			}
		},
		onLoad() {
			this.getMonthBillList()
		},
		computed: {
			monthBg() {
				return (month) => {
					let monthArr = [{
							id: 1,
							bg: '/static/month-bg/1.png',
						},
						{
							id: 2,
							bg: '/static/month-bg/2.png',
						},
						{
							id: 3,
							bg: '/static/month-bg/3.png',
						},
						{
							id: 4,
							bg: '/static/month-bg/4.png',
						},
						{
							id: 5,
							bg: '/static/month-bg/5.png',
						},
						{
							id: 6,
							bg: '/static/month-bg/6.png',
						},
						{
							id: 7,
							bg: '/static/month-bg/7.png',
						},
						{
							id: 8,
							bg: '/static/month-bg/8.png',
						},
						{
							id: 9,
							bg: '/static/month-bg/9.png',
						},
						{
							id: 10,
							bg: '/static/month-bg/10.png',
						},
						{
							id: 11,
							bg: '/static/month-bg/11.png',
						},
						{
							id: 12,
							bg: '/static/month-bg/12.png',
						}
					]

					return monthArr.find(item => item.id === month).bg
				}
			}
		},
		methods: {
			details(item) {
				navigateTo({
					url: `/pages/monthlyBill/details/details?dateTime=${item.dateTime}&month=${item.month}`
				})
			},
			getMonthBillList() {
				getMonthBillList().then((res) => {
					if (res.code === 200) {
						this.monthBillList = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;

		.main {
			width: 690rpx;
			background: #FFFFFF;
			min-height: 50vh;
			margin: 10rpx auto;
			border-radius: 20rpx;
			box-shadow: 0rpx 4rpx 10rpx rgba(0, 0, 0, 0.1);
			padding: 33rpx 28rpx 24rpx;
			box-sizing: border-box;

			.list {
				width: 100%;

				.item {
					width: 100%;

					.item-title {
						color: #595959;
						font-size: 28rpx;
						line-height: 1;
						margin-bottom: 36rpx;
					}

					.item-content {
						width: 634rpx;
						height: 266rpx;
						border-radius: 12rpx 12rpx 12rpx 12rpx;
						background-position: center;
						background-repeat: no-repeat;
						background-size: cover;
						margin-bottom: 30rpx;
						padding-top: 109rpx;
						box-sizing: border-box;
						padding-left: 38rpx;
						box-sizing: border-box;
						display: flex;

						.item-details {
							width: 50%;
							font-size: 24rpx;
							line-height: 1;
							color: #090B00;

							.details-money {
								color: #010201;
								font-size: 32rpx;
								font-weight: 700;
								margin-top: 19rpx;
								margin-bottom: 32rpx;
							}

							.details-trend {
								display: flex;
								align-items: center;
								color: #040203;

								image {
									width: 13rpx;
									height: 20rpx;
									margin: 0 7rpx;

								}

							}
						}
					}
				}

			}

			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #595959;
				font-size: 28rpx;
				margin-bottom: 50rpx;

				.title-text {
					color: #000000;
					font-size: 34rpx;
					line-height: 1;
				}
			}
		}
	}
</style>
<template>
	<view class="app">
		<navbar title="转账记录查询" bg-color="#f8f8f8" more-btn service-btn>
		</navbar>
		<view class="main">
			<u-sticky :customNavHeight="statusBarHeight+navBarHeight">
				<view class="sift">
					<view :class="['item',bankPopShow?'active':'']" @click="openBankPop">
						<view class="name">{{selectBank.name}}</view>
						<image class="icon" :src="bankPopShow?'/static/icon/blueUp.png':'/static/icon/greyDown.png'"
							mode=""></image>
					</view>
					<view :class="['item',timePopShow?'active':'']" @click="openTimePop">
						<view class="name">{{selectDate.text}}</view>
						<image class="icon" :src="timePopShow?'/static/icon/blueUp.png':'/static/icon/greyDown.png'"
							mode=""></image>
					</view>
				</view>
			</u-sticky>
			<view class="search">
				<input @confirm="inputConfirm" confirm-type="search" v-model="keyword" class="search-input"
					placeholder-class="placeholder" placeholder="输入姓名/卡号/手机号/附言搜索" type="text" />
				<image class="icon" src="/static/icon/search-black.png" mode=""></image>
			</view>
			<view class="list">
				<view class="title">转出记录</view>
				<view class="item" v-for="(item,index) in list" :key="index" @click="details(item)">
					<view class="item-title" v-if="item.day">
						{{item.day}}
					</view>
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
			</view>
			<u-loadmore v-if="!empty" :status="status" icon loading-text="正在加载..." nomore-text="已显示全部转账记录" />
			<view class="null" v-if="empty"></view>
		</view>
		<selectBankCardPop @close="bankPopShow = false" @change="bankChange" :show="bankPopShow"></selectBankCardPop>
		<selectTimePop @select="selectTime" @close="timePopShow = false" :show="timePopShow"></selectTimePop>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		getTransferRecord
	} from '@/api/index.js'
	import {
		navigateTo
	} from '../../../utils';
	export default {
		data() {
			return {
				empty: false,
				bankPopShow: false,
				timePopShow: false,
				selectBank: { // 默认选择的银行卡
					id: '1',
					name: '全部账户',
					icon: '/static/transfer/wallet.png'
				},
				pageNum: 1,
				pageSize: 10,
				list: [],
				totalPage: 1,
				status: 'loading',
				selectDate: {
					text: '最近三个月'
				},
				keyword: '',
				oppositeAccount:'', // 对方账户
			};
		},
		onLoad(options) {
			// this.getTransferRecord()
			if (options.oppositeAccount) {
				this.oppositeAccount = options.oppositeAccount
			}
		},
		computed: {
			...mapState(['statusBarHeight', 'navBarHeight'])
		},
		methods: {
			openBankPop() {
				this.bankPopShow = !this.bankPopShow;
			},
			openTimePop() {
				this.timePopShow = !this.timePopShow;
			},
			bankChange(item) {
				this.selectBank = item
			},
			selectTime(e) {
				this.selectDate = e
				this.status = 'loading'
				this.pageNum = 1
				this.list = []
				this.getTransferRecord()
			},
			inputConfirm() {
				this.status = 'loading'
				this.pageNum = 1
				this.list = []
				this.getTransferRecord()
			},
			getTransferRecord() {
				getTransferRecord({
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					endTime: this.selectDate.end,
					beginTime: this.selectDate.start,
					keyword: this.keyword,
					oppositeAccount: this.oppositeAccount
				}).then((res) => {
					if (res.code === 200) {
						this.list = [...this.list, ...res.data.list]
						this.totalPage = res.data.pages
						if (this.totalPage == 1) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore'
						}
						if (this.totalPage == 0) {
							this.empty = true
						}
					} else {
						this.status = 'loadmore'
					}
				})
			},
			details(item) {
				navigateTo({
					url: '/pages/transfer/details/details?id=' + item.id
				})
			},
			onReachBottom() {
				if (this.pageNum == this.totalPage) {
					this.status = 'nomore'
					return;
				}
				this.pageNum = this.pageNum + 1,
					this.status = 'loading'

				this.getTransferRecord();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 100%;
		min-height: 100vh;
		background-color: #F8F8F8;
	}

	.sift {
		width: 100%;
		background-color: #ffffff;
		height: 74rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 20rpx;

		.item {
			display: flex;
			align-items: center;
			color: #7A7A7A;
			font-size: 28rpx;

			&.active {
				color: #6A87E0;
			}

			.icon {
				width: 18rpx;
				height: 18rpx;
				margin-left: 4rpx;
			}
		}
	}

	.main {
		width: 100%;


		.search {
			width: 690rpx;
			height: 66rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			margin: auto;
			padding: 0 58rpx 0 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			font-size: 26rpx;
			color: #111111;
			margin-bottom: 54rpx;

			.search-input {
				flex: 1;
				height: 100%;
			}

			.icon {
				width: 36rpx;
				height: 36rpx;
			}

			.placeholder {
				color: #8D8D8D;
				font-size: 26rpx;
			}
		}

		.list {
			width: 100%;

			.title {
				padding: 0 30rpx;
				box-sizing: border-box;
				color: #8D8D8D;
				font-size: 28rpx;
				margin-bottom: 10rpx;
			}

			.item {
				width: 100%;

				.item-title {
					padding: 26rpx 30rpx 10rpx 30rpx;
					box-sizing: border-box;
					color: #8D8D8D;
					font-size: 28rpx;
				}

				.item-content {
					width: 100%;
					height: 150rpx;
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
							margin-top: 12rpx;
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

		.null {
			width: 750rpx;
			height: 600rpx;
			background-image: url(/static/transfer/record-null.png);
			background-position: top;
			background-repeat: no-repeat;
			background-size: cover;
		}
	}
</style>
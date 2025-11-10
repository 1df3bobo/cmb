<template>
	<view class="app">
		<navbar title="转账" more-btn ai-btn></navbar>
		<view class="main">
			<view class="transfer-card">
				<view @click="doTransfer('/pages/transfer/bank/bank')" class="item"></view>
				<view @click="doTransfer('/pages/transfer/mobile/mobile')" class="item"></view>
			</view>
			<view class="cate-card" :style="{height:isOpen?'404rpx':'130rpx'}">
				<image class="bg" src="/static/transfer/cate.png" mode=""></image>
				<image @click="isOpen = !isOpen" :class="['cate-icon',isOpen?'cate-icon-ani':'']"
					src="/static/icon/arrow-top.png" mode="">
				</image>
				<view class="list">
					<view class="item" @click="goPages(item)" v-for="(item,index) in list"></view>
				</view>
			</view>
			<view class="recent">
				<view class="recent-title">
					<view class="recent-title-left">最近转账伙伴</view>
					<view class="recent-title-right">全部 0</view>
				</view>
				<view class="list">
					<view :class="['item',isMoreList?'border':'']" @click="isMoreList = !isMoreList">
						<image class="user-icon" src="/static/transfer/user-icon.png" mode=""></image>
						<view class="user-name">{{userInfo.realName}}</view>
						<view class="user-num">0</view>
						<view class="user-share">分享卡号</view>
						<image :class="['user-arrow',isMoreList?'user-arrow-acitive':'']"
							src="/static/icon/arrow-top.png" mode="">
						</image>
					</view>
					<view :class="['item',isMoreList?'border':'']" @click="shortcut(item)"
						v-for="(item,index) in contactsList" :key="index">
						<image class="user-icon" :src="item.icon" mode=""></image>
						<view class="user-name bank-name">
							<view>
								{{item.name}}
							</view>
							<view class="bank-name-text">{{item.bankName}}<text>({{item.bankCard.slice(-4)}})</text>
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
		navigateTo
	} from '../../../utils';
	import {
		getContactsList
	} from '@/api/index.js'
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				isMoreList: false,
				isOpen: false,
				list: [{
					name: '转账记录',
					page: '',
					path: '/pages/transfer/record/record'
				}, {
					name: '他行卡转入',
					page: '',
					path: '/pages/transfer/single/single'
				}, {
					name: '信用卡还款',
					page: '/static/pages/xykhk.png',
					path: '/pages/commonPages/commonPages',
					bgColor: '#f8f8f8'
				}, {
					name: '转入朝朝宝',
					page: '',
					path: '/pages/chaoChaoBao/chaoChaoBao'
				}, {
					name: '预约转账',
					page: '',
					path: '/pages/transfer/appointment/appointment'
				}, {
					name: '资金归集',
					page: '',
					path: '/pages/transfer/capitalPooling/capitalPooling'
				}, {
					name: '向多人转账',
					page: '',
					path: '/pages/transfer/multiple/multiple'
				}, {
					name: '转账设置',
					page: '',
					path: '/pages/transfer/settings/settings'
				}, {
					name: '零花钱大作战',
					page: '/static/pages/changeWar.png',
					path: '/pages/commonPages/commonPages',
					bgColor: '#fff'
				}, {
					name: '友借友还',
					page: '',
					path: '/pages/friendsBorrowFriendsBack/friendsBorrowFriendsBack'
				}, {
					name: '收租宝',
					page: '',
					path: '/pages/collectRent/collectRent'
				}],
				contactsList: [], // 最近联系人列表
			}
		},
		onLoad() {
			this.getContactsList()
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			doTransfer(url) {
				navigateTo({
					url: url
				})
			},
			shortcut(item) {
				navigateTo({
					url: '/pages/transfer/shortcut/shortcut?contactsInfo=' + JSON.stringify(item)
				})
			},
			goPages(item) {
				if (item.path) {
					navigateTo({
						url: `${item.path}?pageImage=${item.page}&title=${item.name}&bgColor=${item.bgColor?item.bgColor:''}`
					})
				}
			},
			// 获取最近转账伙伴 
			getContactsList() {
				getContactsList().then((res) => {
					if (res.code === 200) {
						this.contactsList = res.data
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #FEFEFE;

	}

	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		padding-right: 56rpx;
		color: #FFFFFF;
		font-size: 26rpx;
		font-weight: 400;
		position: absolute;

		.nav-customer {
			width: 44rpx;
			height: 44rpx;
			margin-left: 30rpx;
		}


	}

	.main {
		width: 750rpx;
		padding-top: 16rpx;
		background-color: #FFFFFF;

		.transfer-card {
			width: 750rpx;
			height: 248rpx;
			background-image: url(/static/transfer/type-bg.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			display: flex;
			justify-content: space-around;

			.item {
				width: 40%;
				height: 100%;
			}
		}

		.cate-card {
			width: 750rpx;
			height: 130rpx;
			position: relative;
			overflow: hidden;
			margin-bottom: 70rpx;

			.list {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				position: relative;
				padding-left: 62rpx;
				padding-right: 56rpx;
				z-index: 2;
				padding-top: 10rpx;

				.item {
					width: 100rpx;
					height: 100rpx;
					margin-right: 70rpx;
					margin-bottom: 56rpx;

					&:nth-child(4n) {
						margin: 0;
					}
				}
			}

			.bg {
				width: 750rpx;
				height: 404rpx;
				position: absolute;
				top: 0;
				left: 0;
			}

			.cate-icon {
				position: absolute;
				width: 50rpx;
				right: 30rpx;
				top: 42rpx;
				z-index: 3;
				height: 50rpx;
				transition: all 0.3s ease
			}

			.cate-icon-ani {
				transform: rotate(180deg)
			}
		}

		.recent {
			width: 100%;
			padding: 0 30rpx 0 50rpx;
			box-sizing: border-box;

			.recent-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 70rpx;

				.recent-title-left {
					color: #333333;
					font-size: 32rpx;
					font-weight: 700;
				}

				.recent-title-right {
					width: 108rpx;
					height: 44rpx;
					background: #F7F8F8;
					border-radius: 22rpx 22rpx 22rpx 22rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #5499D9;
					font-size: 24rpx;
				}
			}

			.list {
				width: 100%;

				.item {
					width: 100%;
					display: flex;
					align-items: center;
					padding-bottom: 36rpx;
					position: relative;

					&.border:before {
						content: '';
						position: absolute;
						left: 98rpx;
						right: 0;
						bottom: 0;
						height: 2rpx;
						background-color: #f6f6f6;
					}

					.user-icon {
						width: 68rpx;
						height: 68rpx;
						margin-right: 30rpx;
					}

					.user-arrow-acitive {
						transform: rotate(180deg)
					}

					.user-name {
						color: #393939;
						font-size: 28rpx;
					}

					.bank-name {
						display: flex;
						flex-direction: column;

						.bank-name-text {
							color: #999999;
							font-size: 22rpx;
							margin-top: 10rpx;
						}
					}

					.user-num {
						width: 35rpx;
						height: 35rpx;
						background: #F7F7F7;
						border-radius: 22rpx 22rpx 22rpx 22rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #9B9B9B;
						font-size: 20rpx;
						margin: 0 30rpx;
					}

					.user-share {
						width: 112rpx;
						height: 34rpx;
						border-radius: 17rpx 17rpx 17rpx 17rpx;
						border: 1rpx solid #797A7E;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #141316;
						font-size: 22rpx;
					}

					.user-arrow {
						width: 50rpx;
						height: 50rpx;
						margin-left: auto;
					}

				}
			}
		}
	}
</style>
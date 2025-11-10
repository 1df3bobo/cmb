<template>
	<view class="app">
		<navbar :showBack="false" :placeholder="false" :bg-color="`rgba(255,255,255,${1-opacity})`"
			:title-color="`rgba(${255*opacity},${255*opacity},${255*opacity},1)`">
			<slot>
				<view class="nav-content" :style="{height:`${navBarHeight}px`,color:opacity >0.5?'#ffffff':'#111111'}">
					<image class="nav-customer back" @click="show = true" src="/static/icon/back@2x.png"></image>
					<image @click="goSearch" class="nav-customer" src="/static/icon/search@2x.png"></image>
					<image class="nav-customer" @click="goSet" src="/static/icon/set.png"></image>
					<image class="nav-customer" @click="goMessage" src="/static/icon/message.png"></image>
				</view>
			</slot>
		</navbar>
		<view class="main">
			<view class="placeholder" :style="{height:`${statusBarHeight+navBarHeight}px`}"></view>
			<view class="user">
				<view class="user-info">
					<image class="user-header" @click="goSet" src="/static/icon/header-icon.png"></image>
					<view class="user-name">
						<view>{{replaceWithAsterisks}}</view>
						<view class="user-name-footer" @click="commonPages('/pages/my/home/home')">
							<text>个人主页</text>
							<image class="user-name-icon" src="/static/icon/arrow-2.png"></image>
						</view>
					</view>
				</view>
				<view class="account">
					<view class="item" @click="goBankCard">
						<view v-if="userInfo.bankList" class="num">{{userInfo.bankList.length}}</view>
						<view class="name">银行卡</view>
					</view>
					<view class="item" @click="goToDo">
						<view class="num">0</view>
						<view class="name">待办</view>
					</view>
					<view class="item" @click="goCoupon">
						<view class="num">{{userInfo.couponsNum}}</view>
						<view class="name">卡券</view>
					</view>
					<view class="item" @click="goPoints">
						<view class="num">{{userInfo.points}}</view>
						<view class="name">积分</view>
					</view>
				</view>
			</view>
			<view class="balance">
				<view class="title">
					<text class="title-text">账户总览</text>
					<image @click="state = !state" class="title-icon"
						:src="state?'/static/icon/icon2.png':'/static/icon/icon1.png'"></image>
				</view>
				<view class="balance-data" @click="account">
					<view class="item">
						<view class="label">总资产</view>
						<view class="content">
							<text v-if="state" class="symbol">￥</text>
							<text v-if="state">{{formatAmount(userInfo.accountBalance)}}</text>
							<text class="symbol" v-if="!state">******</text>
						</view>
					</view>
					<view class="item right">
						<view class="label">昨日收益</view>
						<view class="content">
							<text v-if="state" class="symbol">+</text>
							<text v-if="state">0.00</text>
							<text class="symbol" v-if="!state">******</text>
						</view>
					</view>
					<view class="tips">闪电贷获取额度抽好礼，至高赢马歇尔音箱</view>
				</view>
			</view>
			<view class="budget" @click="goBill">
				<view class="title">
					<text class="title-text">本月收支</text>
				</view>
				<view class="balance-data">
					<view class="item">
						<view class="label">支出</view>
						<view class="content">
							<text v-if="state" class="symbol">￥</text>
							<text v-if="state">{{formatAmount(userInfo.expensesTotal)}}</text>
							<text class="symbol" v-if="!state">******</text>
						</view>
					</view>
					<view class="item right">
						<view class="label">收入</view>
						<view class="content">
							<text v-if="state" class="symbol">+</text>
							<text v-if="state">{{formatAmount(userInfo.incomeTotal)}}</text>
							<text class="symbol" v-if="!state">******</text>
						</view>
					</view>
				</view>
			</view>
			<view class="pages">
				<view class="card1">
					<view class="item"
						@click="commonPages('/pages/common/common?pageImage=/static/pages/zlhqd.png&title=招联好期贷&serviceBtn=false')">
					</view>
					<view class="item"
						@click="commonPages('/pages/common/common?pageImage=/static/pages/grylj.png&serviceBtn=false&moreBtn=false')">
					</view>
					<view class="item" @click="commonPages('/pages/common/common?pageImage=/static/pages/qzc.png')">
					</view>
				</view>
				<view class="card2">
					<view class="item"
						@click="commonPages('/pages/common/common?pageImage=/static/pages/szrmb.png&title=数字人民币&gradient=2')">
					</view>
					<view class="item" @click="commonPages('/pages/ViewHouse/ViewHouse')">
					</view>
					<view class="item"
						@click="commonPages('/pages/common/common?pageImage=/static/pages/fxpg.png&title=风险评估&gradient=2')">
					</view>
					<view class="item"
						@click="commonPages('/pages/common/common?pageImage=/static/pages/gcfq.png&title=购车分期额度&&gradient=2')">
					</view>
					<view class="item"
						@click="commonPages('/pages/common/common?pageImage=/static/pages/wdwd.png&title=网点&&gradient=2')">
					</view>
					<view class="item"
						@click="commonPages('/pages/commonPages/commonPages?pageImage=/static/pages/sczx.png&title=收藏中心&serviceBtn=false&moreBtn=false')">
					</view>
				</view>
				<view class="card3" @click="commonPages('/pages/customer/customer')">

				</view>
			</view>
		</view>
		<u-popup :show="show" @close="show = false" round="16rpx" mode="center">
			<view class="popup-content">
				<view class="title">
					安全退出
				</view>
				<view class="content">
					请确认是否退出当前账户？
				</view>
				<view class="footer">
					<view class="btn" @click="logout">
						确定
					</view>
					<view class="btn" @click="show = false">
						取消
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import {
		navigateTo,
		formatAmount
	} from '../../utils';
	import {
		getMemberInfo
	} from '@/api/index.js'
	export default {
		data() {
			return {
				show: false,
				opacity: 1,
				state: false,
				formatAmount: formatAmount
			}
		},
		onLoad() {
			this.get_user_info()
		},
		computed: {
			...mapState(['navBarHeight', 'statusBarHeight', 'userInfo']),
			replaceWithAsterisks(str) {
				let realName = this.userInfo.realName
				if (!realName) return
				if (realName.length <= 1) {
					return realName;
				}
				return realName.slice(0, -1).replace(/./g, '*') + realName.slice(-1);
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
			...mapMutations(['change_login_state', 'init_token', 'init_user_info']),
			...mapActions(['get_user_info']),
			goBankCard() {
				navigateTo({
					url: `/pages/bankCard/bankCard`
				})
			},
			commonPages(url) {
				navigateTo({
					url: url
				})
			},
			goSet() {
				navigateTo({
					url: `/pages/my/set/set`
				})
			},
			goSearch() {
				navigateTo({
					url: `/pages/search/search`
				})
			},
			goCoupon() {
				navigateTo({
					url: `/pages/my/coupon/coupon`
				})
			},
			goMessage() {
				navigateTo({
					url: `/pages/messageCenter/messageCenter`
				})
			},
			goToDo() {
				navigateTo({
					url: `/pages/my/toDo/toDo`
				})
			},
			goBill() {
				navigateTo({
					url: `/pages/bill/bill`
				})
			},
			goPoints() {
				navigateTo({
					url: `/pages/common/common?pageImage=/static/pages/wdjf.png&title=我的积分&serviceBtn=${false}&gradient=2`
				})
			},
			logout() {
				this.init_token({
					token: ''
				})
				this.change_login_state({
					state: false
				})
				this.init_user_info({
					userInfo: {},
				})
				navigateTo({
					url: '/pages/login/login'
				})
			},
			account() {
				navigateTo({
					url: '/pages/account/account/account'
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

	.nav-content {
		width: 750rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		padding-right: 25rpx;
		color: #FFFFFF;
		font-size: 26rpx;
		font-weight: 400;
		position: absolute;

		.nav-customer {
			width: 44rpx;
			height: 44rpx;
			margin-left: 40rpx;
		}

		.back {
			position: absolute;
			left: 43rpx;
			margin: 0;
		}

	}

	.main {
		width: 750rpx;
		min-height: 488rpx;
		background-image: url(/static/home/my-header.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 488rpx;

		.placeholder {
			width: 720rpx;
		}

		.user {
			width: 100%;
			padding-top: 98rpx;
			box-sizing: border-box;

			.user-info {
				display: flex;
				align-items: center;
				padding-left: 48rpx;
				height: 92rpx;
				box-sizing: border-box;

				.user-header {
					width: 92rpx;
					height: 92rpx;
					margin-right: 27rpx;
				}

				.user-name {
					flex: 1;
					color: #000000;
					font-size: 40rpx;
					line-height: 1;
					font-weight: 700;
				}

				.user-name-footer {
					display: flex;
					align-items: center;
					color: #666666;
					font-size: 24rpx;
					font-weight: 400;
					margin-top: 17rpx;

					.user-name-icon {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}

			.account {
				display: flex;
				justify-content: space-around;
				margin-top: 42rpx;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					line-height: 1;

					.num {
						color: #000000;
						font-size: 40rpx;
						font-weight: bold;
						margin-bottom: 15rpx;
					}

					.name {
						color: #808080;
						font-size: 22rpx;
					}
				}
			}
		}

		.balance {
			width: 750rpx;
			height: 354rpx;
			background-image: url(/static/home/my-card.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			margin-top: 53rpx;
			padding: 58rpx 50rpx 0 68rpx;
			box-sizing: border-box;
			position: relative;

			&:before {
				content: '';
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 94rpx;
				width: 617rpx;
				height: 2rpx;
				background-color: #EFEFEF;
			}

			.title {
				display: flex;
				align-items: center;
				color: #000000;
				font-size: 30rpx;
				font-weight: bold;
				position: relative;

				&:before {
					content: '';
					width: 118rpx;
					height: 18rpx;
					background: #F0EFFC;
					position: absolute;
					left: 0;
					bottom: -6rpx;
				}

				.title-text {
					position: relative;


				}

				.title-icon {
					width: 40rpx;
					height: 40rpx;
					margin-left: 13rpx;
				}
			}
		}

		.balance-data {
			display: flex;
			align-items: center;
			margin-top: 34rpx;
			justify-content: space-between;

			.item {
				color: #000000;

				&.right {
					text-align: right;
				}

				.label {
					color: #A5A5A5;
					font-size: 26rpx;
				}

				.content {
					font-size: 40rpx;
					font-weight: bold;
					margin-top: 10rpx;

					.symbol {
						font-size: 36rpx;
					}
				}
			}

			.tips {
				color: #808080;
				font-size: 26rpx;
				line-height: 1;
				position: absolute;
				left: 91rpx;
				bottom: 38rpx;

				&:before {
					content: '';
					width: 11rpx;
					height: 11rpx;
					background: #E85433;
					border-radius: 11rpx;
					position: absolute;
					left: -22rpx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		.budget {
			width: 750rpx;
			height: 286rpx;
			background-image: url(/static/home/my-card2.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			padding: 40rpx 50rpx 0 68rpx;
			box-sizing: border-box;
			position: relative;

			&:before {
				content: '';
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 58rpx;
				width: 629rpx;
				height: 2rpx;
				background-color: #FFAE2F;
			}

			.title {
				display: flex;
				align-items: center;
				color: #000000;
				font-size: 30rpx;
				font-weight: bold;
				position: relative;
			}
		}


		.pages {
			width: 750rpx;
			height: 1148rpx;
			background-image: url(/static/home/my-pages.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: 750rpx 1148rpx;

			.card1 {
				width: 100%;
				padding-top: 30rpx;

				.item {
					width: 100%;
					height: 100rpx;
					margin-bottom: 10rpx;
				}
			}

			.card3 {
				width: 100%;
				height: 300rpx;
			}

			.card2 {
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				justify-content: space-between;
				padding: 130rpx 30rpx 0;
				box-sizing: border-box;

				.item {
					width: 48%;
					height: 100rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}

	.popup-content {
		width: 670rpx;
		height: 300rpx;
		padding: 30rpx 40rpx 40rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;

		.title {
			font-size: 36rpx;
			color: #111;
		}

		.content {
			font-size: 30rpx;
			margin-top: 20rpx;
		}

		.footer {
			display: flex;
			justify-content: flex-end;
			margin-top: auto;

			.btn {
				color: #009C96;
				font-size: 30rpx;
				margin-left: 50rpx;
			}
		}
	}
</style>
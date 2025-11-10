<template>
	<view class="app">
		<navbar title="转账" bg-color="#f8f8f8">
			<slot>
				<view class="nav-right">
					<text @click="goRecord">转账记录</text>
				</view>
			</slot>
		</navbar>
		<view class="main">
			<view class="payee">
				<view class="title">收款人</view>
				<view class="info">
					<image class="info-icon" src="/static/logo/58x58.png"></image>
					<view class="info-content">
						<view class="name">
							<text>{{contactsInfo.name}}</text>
							<text class="bank-name">{{contactsInfo.bankName}}</text>
						</view>
						<view class="info-number">
							{{contactsInfo.bankCard}}
						</view>
					</view>
				</view>
			</view>
			<view class="from">
				<view class="title money-title">
					<view>转账金额</view>
				</view>
				<view class="money-item">
					<view class="label-syl">￥</view>
					<input class="input" placeholder-class="placeholder" v-model="money" placeholder="0手续费"
						type="text" />
				</view>
				<view class="money-item item-ma" @click="selectPayCardPopShow = true">
					<view class="labe">付款卡</view>
					<view class="content" v-if="userInfo.bankList">
						<view class="bank">
							<view>{{userInfo.bankList[0].bankName}}
								<text>({{userInfo.bankList[0].bankCard.slice(-4)}})</text>
							</view>
							<image class="icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
						</view>
						<view class="tips">
							可用余额 ￥{{formatAmount(userInfo.bankList[0].accountBalance)}}
						</view>
					</view>
				</view>
			</view>
			<view class="remark" @click="transferRemarkPopShow = true">
				<view class="labe">转账附言</view>
				<input disabled class="input" v-model="purpose" placeholder-class="placeholder" placeholder="转账"
					type="text" />
				<image class="form-icon" src="/static/icon/icon7.png" mode=""></image>
			</view>
			<view class="tips-txt">将根据转账信息预计到账时间</view>
			<view class="btn" @click="next">下一步</view>
		</view>
		<selectPayCardPop :show="selectPayCardPopShow" @close="selectPayCardPopShow =false"></selectPayCardPop>
		<payPasswordPop :contactsInfo="contactsInfo" :money="money" :purpose="purpose"
			@close="payPasswordPopShow =false" :show="payPasswordPopShow">
		</payPasswordPop>
		<transferRemarkPop @confirm="transferRemarkcConfirm" :show="transferRemarkPopShow"
			@close="transferRemarkPopShow = false"></transferRemarkPop>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {
		navigateTo,
		formatAmount
	} from '@/utils/index.js'
	import toast from '@/utils/toast'
	export default {
		data() {
			return {
				formatAmount: formatAmount,
				contactsInfo: {},
				selectPayCardPopShow: false,
				payPasswordPopShow: false,
				money: null, //转账金额
				purpose: '', // 转账备注 用途
				transferRemarkPopShow: false,
			}
		},
		onLoad(options) {
			if (options.contactsInfo) {
				this.contactsInfo = JSON.parse(options.contactsInfo)
			}
		},
		computed: {
			...mapState(['userInfo']),
			formatMoney() {
				return (money) => {
					if (money === null || money === undefined) return '';
					// 处理数字和字符串输入
					const num = typeof money === 'string' ? parseFloat(money) : money;
					if (isNaN(num)) return '';
					// 使用 Intl.NumberFormat（推荐）
					try {
						return new Intl.NumberFormat('zh-CN').format(num);
					} catch (e) {
						// 降级方案
						const str = num.toString();
						const [integer, decimal] = str.split('.');
						const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
					}
				}
			}
		},
		methods: {
			transferRemarkcConfirm(e) {
				this.purpose = e
			},
			// 点击下一步
			next() {
				if (!this.money || this.money <= 0) {
					toast.msgBox('请输入正确的转账金额')
					return
				}
				this.payPasswordPopShow = true
			},
			goRecord() {
				navigateTo({
					url: '/pages/transfer/record/record'
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
	}

	.nav-right {
		width: 750rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		padding-right: 33rpx;
		font-weight: 400;
		position: absolute;
		color: #030303;
		font-size: 28rpx;
	}

	.main {
		width: 100%;

		.payee {
			width: 750rpx;
			height: 260rpx;
			background: #FFFFFF;
			padding: 45rpx 30rpx 32rpx;
			box-sizing: border-box;

			.title {
				color: #373737;
				font-size: 38rpx;
				margin-bottom: 68rpx;
				line-height: 1;
			}

			.info {
				display: flex;
				align-items: center;
				;

				.info-icon {
					width: 68rpx;
					height: 68rpx;
				}

				.info-content {
					margin-left: 16rpx;

					.name {
						color: #000000;
						font-size: 34rpx;
						display: flex;
						align-items: center;
						margin-bottom: 8rpx;

						.bank-name {
							color: #939393;
							font-size: 28rpx;
							margin-left: 30rpx;
						}
					}

					.info-number {
						color: #000000;
						font-size: 28rpx;
					}
				}
			}
		}

		.from {
			width: 750rpx;
			background: #FFFFFF;
			padding: 26rpx 0 0 30rpx;
			box-sizing: border-box;
			margin-bottom: 24rpx;
			margin-top: 20rpx;

			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #373737;
				padding-right: 63rpx;
				box-sizing: border-box;
				font-size: 38rpx;
				font-weight: 700;
				margin-bottom: 40rpx;

				&.money-title {
					margin-bottom: 50rpx;
				}

				.form-identify {
					width: 155rpx;
					height: 54rpx;
				}
			}


			.money-item {
				width: 100%;
				height: 140rpx;
				border-bottom: 1rpx solid #F7F7F7;
				padding-top: 27rpx;
				display: flex;
				box-sizing: border-box;

				&.item-ma {
					padding-top: 19rpx;
					display: flex;
					justify-content: space-between;
				}

				.content {
					display: block;

					.bank {
						display: flex;
						align-items: center;
						padding-right: 17rpx;
						line-height: 37rpx;
						color: #353535;
						font-size: 34rpx;

						.icon {
							width: 50rpx;
							height: 50rpx;
						}
					}

					.tips {
						color: #000000;
						font-size: 24rpx;
						padding-right: 32rpx;
						text-align: right;
					}
				}

				.labe {
					color: #000000;
					font-size: 34rpx;
					padding-top: 8rpx;
					box-sizing: border-box;
				}

				.label-syl {
					color: #000000;
					font-size: 50rpx;
					font-weight: 700;
				}

				.input {
					flex: 1;
					color: #333333;
					margin-left: 4rpx;
					color: #000000;
					font-size: 50rpx;
					font-weight: 700;
					margin-top: 4rpx;
				}
			}
		}

		.remark {
			width: 100%;
			height: 88rpx;
			display: flex;
			align-items: center;
			width: 100%;
			color: #353535;
			font-size: 34rpx;
			padding-right: 20rpx;
			padding-left: 30rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;


			.input {
				flex: 1;
				text-align: right;
				height: 100%;
				color: #333333;
			}

			.form-icon {
				width: 40rpx;
				height: 40rpx;
				margin-left: 33rpx;
			}

		}

		.tips-txt {
			color: #9C9C9C;
			font-size: 28rpx;
			padding-left: 30rpx;
			line-height: 30rpx;
			margin-top: 15rpx;
			margin-bottom: 67rpx;
		}

		.btn {
			width: 690rpx;
			height: 84rpx;
			margin: auto;
			background: #E75258;
			border-radius: 42rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
			font-size: 34rpx;
		}

		.border-none {
			border: none;
		}

		.placeholder {
			color: #999999;
			font-size: 28rpx;
			font-weight: 400;
		}
	}
</style>
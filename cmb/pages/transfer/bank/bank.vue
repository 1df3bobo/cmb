<template>
	<view class="app">
		<navbar title="转账" more-btn ai-btn bg-color="#F8F8F8"></navbar>
		<view class="main">
			<view class="from">
				<view class="title">
					<view>收款人</view>
					<image @click="goContactList" class="form-identify" src="/static/transfer/icon2.png" mode="">
					</image>
				</view>
				<view class="item">
					<view class="labe">户名</view>
					<input class="input" v-model="contactsInfo.name" placeholder-class="placeholder"
						placeholder="请输入收款人户名" type="text" />
					<image @click="goContactList" class="form-icon" src="/static/transfer/icon1.png" mode=""></image>
				</view>
				<view class="item border-none">
					<view class="labe">账号</view>
					<input class="input" v-model="contactsInfo.bankCard" placeholder-class="placeholder"
						placeholder="请输入收款人账号" type="text" />
					<image class="form-icon" src="/static/transfer/icon4.png" mode=""></image>
				</view>
				<view class="item border-none" v-if="contactsInfo.bankCard" @click="selectBank">
					<view class="labe">银行</view>
					<input disabled class="input" v-model="contactsInfo.bankName" placeholder-class="placeholder"
						placeholder="选择银行" type="text" />
					<image class="form-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
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
				<input class="input" v-model="purpose" disabled placeholder-class="placeholder" placeholder="转账"
					type="text" />
				<image class="form-icon" src="/static/icon/icon7.png" mode=""></image>
			</view>
			<view class="tips-txt">将根据转账信息预计到账时间</view>
			<view class="btn" @click="submit">下一步</view>
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
		formatAmount,
		navigateTo
	} from '@/utils/index.js'
	import toast from '../../../utils/toast'
	export default {
		data() {
			return {
				formatAmount: formatAmount,
				selectPayCardPopShow: false,
				contactsInfo: {
					name: '', // 真实姓名
					bankCard: '', // 卡号
					bankId: '', //  银行id
					bankName: '' // 银行名称
				},
				money: null, // 转账金额
				purpose: '', // 转账备注 用途
				payPasswordPopShow: false,
				transferRemarkPopShow: false,
			}
		},
		onLoad(options) {
			if (options.contactsInfoStr) {
				this.contactsInfo = JSON.parse(options.contactsInfoStr)
			}

		},
		computed: {
			...mapState(['userInfo', 'selectBankInfo']),
		},
		watch: {
			selectBankInfo(n, o) {
				this.$set(this.contactsInfo, 'bankId', n.id)
				this.$set(this.contactsInfo, 'bankName', n.name)
			}
		},
		methods: {
			transferRemarkcConfirm(e) {
				this.purpose = e
			},
			submit() {
				if (!this.contactsInfo.name) {
					toast.msgBox('请输入户名')
					return
				}
				if (!this.contactsInfo.bankCard) {
					toast.msgBox('请输入账号')
					return
				}
				if (!this.contactsInfo.bankId) {
					toast.msgBox('请选择银行')
					return
				}
				if (!this.money) {
					toast.msgBox('请输入汇款金额')
					return
				}
				this.payPasswordPopShow = true
			},
			goContactList() {
				navigateTo({
					url: '/pages/transfer/contactList/contactList'
				})
			},
			selectBank() {
				navigateTo({
					url: '/pages/transfer/bankList/bankList'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		width: 100%;
		height: 100vh;
		background-color: #f8f8f8;
	}

	.main {
		width: 100%;
		padding-top: 16rpx;

		.from {
			width: 750rpx;
			background: #FFFFFF;
			padding: 26rpx 0 0 30rpx;
			box-sizing: border-box;
			margin-bottom: 24rpx;

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

			.item {
				width: 100%;
				height: 100rpx;
				border-bottom: 1rpx solid #F7F7F7;
				display: flex;
				align-items: center;
				width: 100%;
				color: #353535;
				font-size: 28rpx;
				padding-right: 32rpx;
				box-sizing: border-box;



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
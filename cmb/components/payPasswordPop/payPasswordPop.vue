<template>
	<view>
		<u-popup :show="show" @close="close" zIndex="10" :overlayStyle="{zIndex:10}" round="16rpx" mode="center">
			<view class="main">
				<view class="title">
					<text>请输入取款密码</text>
					<image @click="close" class="title-icon" src="/static/icon/close3.png"></image>
				</view>
				<view class="contacts-info">
					<view class="contacts-name">
						{{contactsInfo.name}} <text class="contacts-bank-name"> （{{contactsInfo.bankName}}）</text>
					</view>
					<view class="contacts-card-number" v-if="show">
						{{formatCardNumber(contactsInfo.bankCard)}}
					</view>
					<view class="money">
						￥{{money}}
					</view>
					<view class="tips">
						请输入一卡通<text class="active">{{repeatCardNumber(contactsInfo.bankCard)}}</text>取款密码
					</view>
					<view class="password-input">
						<u-code-input v-model="value" size="88rpx" :space="0" dot hairline></u-code-input>
					</view>
					<view @click="billTransfer" :class="['btn',value.length>5?'active':'']">确认转账</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		billTransfer
	} from '@/api/index.js'
	import {
		repeatCardNumber,
		redirectTo
	} from '@/utils/index.js'
	import toast from '../../utils/toast';
	export default {
		name: "payPasswordPop",
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			contactsInfo: {
				type: Object,
				default: {}
			},
			purpose: {
				type: String,
				default: {}
			},
			money: {
				type: String | Number | Object,
				default: {}
			}
		},
		data() {
			return {
				repeatCardNumber: repeatCardNumber,
				value: "", // 密码
			};
		},
		computed: {
			formatCardNumber() {
				return (cardNumber) => {
					if (!cardNumber) return
					return cardNumber.replace(/\d{4}(?=\d)/g, '$& ').trim();
				}
			}
		},
		methods: {
			// 确认转账
			billTransfer() {
				if (this.value.length < 6) return
				billTransfer({
					realName: this.contactsInfo.name,
					cardNo: this.contactsInfo.bankCard,
					bankId: this.contactsInfo.bankId,
					amount: this.money,
					purpose: this.purpose,
					bankName: this.contactsInfo.bankName
				}).then((res) => {
					if (res.code === 200) {
						redirectTo({
							url: '/pages/transfer/success/success'
						})
					} else {
						toast.msgBox(res.msg)
					}
				})
			},
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 700rpx;
		min-height: 500rpx;
		border-radius: 8rpx;

		.title {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 88rpx;
			border-bottom: 1rpx solid #eee;
			color: #111;
			font-size: 26rpx;
			position: relative;

			.title-icon {
				position: absolute;
				right: 30rpx;
				width: 36rpx;
				height: 36rpx;
				justify-self: end;


			}
		}

		.contacts-info {
			width: 100%;
			margin-top: 30rpx;

			.contacts-name {
				text-align: center;
				font-size: 26rpx;

				.contacts-bank-name {
					font-size: 24rpx;
				}
			}

			.contacts-card-number {
				text-align: center;
				font-size: 24rpx;
				margin-top: 10rpx;
			}

		}

		.money {
			text-align: center;
			font-size: 36rpx;
			margin-top: 30rpx;
			font-weight: 700;
			color: #444;
		}

		.tips {
			text-align: center;
			font-size: 24rpx;
			margin-top: 30rpx;
			color: #999;

			.active {
				color: #FF8420;
			}
		}

		.password-input {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 26rpx;
		}

		.btn {
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #5499D9;
			font-size: 32rpx;
			opacity: 0.5;
			border-top: 1rpx solid #eee;

			&.active {
				opacity: 1;
			}
		}
	}
</style>
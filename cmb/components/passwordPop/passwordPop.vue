<template>
	<view>
		<u-popup :show="show" @close="close" zIndex="10" :overlayStyle="{zIndex:10}" round="16rpx" mode="center">
			<view class="main">
				<view class="title">
					<text>请输入取款密码</text>
					<image @click="close" class="title-icon" src="/static/icon/close3.png"></image>
				</view>
				<view class="contacts-info">

					<view class="tips">
						请输入取款密码已验证身份
					</view>
					<view class="contacts-card-number">
						{{userInfo.bankList[0].bankName}}({{userInfo.bankList[0].bankCard.slice(-4)}})
					</view>
					<view class="password-input">
						<u-code-input v-model="value" size="88rpx" :space="0" dot hairline></u-code-input>
					</view>
					<view @click="submit" :class="['btn',value.length>5?'active':'']">确定</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		repeatCardNumber,
		redirectTo
	} from '@/utils/index.js'
	import toast from '../../utils/toast';
	export default {
		name: "passwordPop",
		props: {
			show: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				value: "", // 密码
			};
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			submit() {
				if (this.value.length < 6) return
				this.$emit('confirm')
				this.value = ''
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
		min-height: 400rpx;
		border-radius: 8rpx;

		.title {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 88rpx;
			border-bottom: 1rpx solid #eee;
			color: #111;
			font-size: 32rpx;
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
				font-size: 28rpx;
				margin-top: 20rpx;
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
			font-size: 26rpx;
			margin-top: 30rpx;
			color: #999;
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
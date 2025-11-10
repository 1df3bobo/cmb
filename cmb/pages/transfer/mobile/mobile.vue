<template>
	<view class="app">
		<navbar title="手机号转账" more-btn service-btn bg-color="#F8F8F8"></navbar>
		<view class="main">
			<view class="title">
				<view>通过姓名、手机号向好友转账</view>
				<view class="title-sub">如好友手机号已关联银行卡则直接入账;若未关联，好友回复卡号后亦可收到转账</view>
			</view>
			<view class="form">
				<view class="item">
					<view class="labe">收款人手机号</view>
					<input disabled class="input" placeholder-class="placeholder" placeholder="请输入手机号" type="text" />
					<image class="form-icon" src="/static/transfer/user.png" mode=""></image>
				</view>
				<view class="item">
					<view class="labe">收款人姓名</view>
					<input disabled class="input" placeholder-class="placeholder" placeholder="请输入真实姓名" type="text" />
				</view>
			</view>
			<view class="btn">
				下一步
			</view>
			<view class="tips">管理我的手机号收款卡</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.app {
		width: 100%;
		height: 100vh;
		background-color: #f8f8f8;
	}

	.main {
		width: 750rpx;
		padding-top: 56rpx;

		.title {
			width: 100%;
			padding: 0 36rpx 0 30rpx;
			box-sizing: border-box;
			color: #030303;
			font-size: 32rpx;
			line-height: 1;

			.title-sub {
				color: #999999;
				font-size: 26rpx;
				line-height: 36rpx;
				margin-top: 24rpx;
			}
		}

		.form {
			width: 750rpx;
			height: 176rpx;
			background: #FFFFFF;
			position: relative;
			margin-top: 50rpx;
			padding-left: 30rpx;
			padding-right: 33rpx;
			box-sizing: border-box;

			&:before {
				content: '';
				width: 720rpx;
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 1rpx;
				background-color: #F0F0F0;
			}

			.item {
				height: 50%;
				display: flex;
				align-items: center;
				width: 100%;
				color: #383838;
				font-size: 28rpx;

				.input {
					flex: 1;
					text-align: right;
					height: 100%;
				}

				.form-icon {
					width: 30rpx;
					height: 32rpx;
					margin-left: 33rpx;
				}

				.placeholder {
					color: #999999;
				}
			}
		}

		.btn {
			width: 690rpx;
			height: 84rpx;
			background: #E75258;
			border-radius: 42rpx 42rpx 42rpx 42rpx;
			display: flex;
			align-items: center;
			margin: 72rpx auto;
			justify-content: center;
			color: #FC737A;
			font-size: 32rpx;
			font-weight: 700;
		}

		.tips {
			color: #5499D9;
			font-size: 25rpx;
			position: fixed;
			left: 50%;
			bottom: 98rpx;
			transform: translateX(-50%);
		}
	}
</style>
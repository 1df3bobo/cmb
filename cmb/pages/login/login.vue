<template>
	<view>
		<navbar :show-back="false" ai-btn ai-btn-icon="/static/icon/fanyi.png" service-btn></navbar>
		<view class="main">
			<view class="header"></view>
			<view class="input">
				<input placeholder="手机号/卡号/一网通用户" placeholder-class="placeholder" v-model="username" type="number" />
			</view>
			<view class="agreement" @click="checkboxValue1 = !checkboxValue1">
				<image class="agreement-icon" :src="checkboxValue1?'/static/home/check.png':'/static/home/check-no.png'"
					mode=""></image>
				<view class="agreement-content">
					<text>已同意</text>
					<text class="active">《信息接收服务同意书》</text>
				</view>
			</view>
			<view class="agreement" @click="checkboxValue2 = !checkboxValue2">
				<image class="agreement-icon" :src="checkboxValue2?'/static/home/check.png':'/static/home/check-no.png'"
					mode=""></image>
				<view class="agreement-content">
					<text>已同意</text>
					<text class="active">《招商银行 App服务协议》、《招商银行零售业务与App用户隐私政策》</text>
				</view>
			</view>
			<view class="next-btn" @click="next">
				<image class="next-btn-image"
					:src="(checkboxValue1&&checkboxValue2&&username)?'/static/home/login-next.png':'/static/home/login-next-no.png'"
					mode=""></image>
			</view>
			<view class="tips">
				<text>旧手机号已不再使用?</text>
				<text class="active">修改登录手机号</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		navigateTo
	} from '../../utils';

	export default {
		data() {
			return {
				username: '',
				checkboxValue1: false,
				checkboxValue2: false,
				path: ''
			};
		},
		onLoad(options) {
			if (options.path) {

				this.path = options.path
			}
		},
		methods: {
			next() {
				if (this.username && this.checkboxValue1 && this.checkboxValue1) {
					navigateTo({
						url: '/pages/login/next/next?username=' + this.username + '&path=' + this.path
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 720rpx;
		padding-top: 80rpx;
	}

	.header {
		width: 750rpx;
		height: 173rpx;
		background-image: url(/static/home/login-header.png);
		background-position: top;
		background-repeat: no-repeat;
		background-size: 750rpx 173rpx;
		margin-bottom: 70rpx;
	}

	.input {
		width: 680rpx;
		margin: 0 auto 45rpx;
		padding: 22rpx 10rpx;
		box-sizing: border-box;
		border-bottom: 1rpx solid #D9D9D9;
		color: #333333;
		font-size: 38rpx;
	}

	.agreement {
		display: flex;
		align-items: center;
		padding: 0 30rpx 0 36rpx;
		box-sizing: border-box;
		color: #727272;
		font-size: 26rpx;
		margin-bottom: 30rpx;

		.agreement-content {
			flex: 1;
			line-height: 36rpx;
		}

		.agreement-icon {
			width: 32rpx;
			height: 32rpx;
			margin-right: 26rpx;
		}

		.active {
			color: #5995EF;
		}
	}

	.next-btn {
		width: 166rpx;
		height: 86rpx;
		margin: auto;
		margin-top: 90rpx;

		.next-btn-image {
			width: 166rpx;
			height: 86rpx;
		}

	}

	.tips {
		text-align: center;
		margin-top: 50rpx;
		color: #8D8D8D;
		font-size: 26rpx;

		.active {
			color: #5995EF;
			margin-left: 40rpx;
		}
	}

	.placeholder {
		color: #727272;
	}
</style>
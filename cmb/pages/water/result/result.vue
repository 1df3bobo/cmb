<template>
	<view>
		<navbar bg-color="#f8f8f8">
			<view class="nav">
				<image class="nav-home" src="/static/navIcon/fangzi.png" mode=""></image>
				<view class="title">流水打印</view>
				<image class="nav-right" src="/static/navIcon/xiaochengxu.png" mode=""></image>
			</view>
		</navbar>
		<view class="main">
			<image class="success-icon" src="/static/pages/lsdycg.png" mode=""></image>
			<view class="title">申请提交成功，银行处理中</view>
			<view class="tips">
				1.请在邮箱{{email}}中接受交易流水文档，请在申请记录中查看交易流水的解压码。
			</view>
			<view class="tips">
				2.可通过“招商银行App-右上角消息中心-通知助手”及时获取申请状态，因交易流水记录超过系统限制、选择的银行卡在指定日期范围内没有交易数据、最近信申请或更换了银行卡等情况可能导致申请失败。
			</view>
			<view class="footer">
				<view class="back" @click="goHome">
					返回首页
				</view>
				<view class="record" @click="goRecord">
					查看申请记录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		navigateTo,
		redirectTo,
		switchTab
	} from '../../../utils';

	export default {
		data() {
			return {
				email: ''
			}
		},
		onLoad(options) {
			if (options.email) {
				this.email = options.email
			}
		},
		methods: {
			goHome() {
				switchTab({
					url: '/pages/index/index'
				})
			},
			goRecord() {
				redirectTo({
					url: '/pages/water/applyRecord/applyRecord'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 400;
		font-size: 36rpx;
		padding-left: 126rpx;
		padding-right: 26rpx;
		box-sizing: border-box;

		.nav-right {
			width: 172rpx;
			height: 72rpx;
		}

		.nav-home {
			width: 44rpx;
			height: 44rpx;

		}

	}

	.main {
		width: 750rpx;
		padding-top: 138rpx;
	}

	.success-icon {
		width: 116rpx;
		height: 116rpx;
		display: block;
		margin: auto;
	}

	.title {
		margin: 32rpx auto;
		text-align: center;
		color: #111;
		font-size: 36rpx;
	}

	.tips {
		color: #999;
		font-size: 30rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
	}

	.footer {
		width: 750rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 170rpx;
		padding: 0 40rpx;
		box-sizing: border-box;

		.back {
			width: 300rpx;
			height: 72rpx;
			border-radius: 60rpx;
			border: 1rpx solid #565656;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
			color: #111;
		}

		.record {
			width: 300rpx;
			height: 72rpx;
			border-radius: 60rpx;
			background-color: #565656;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 26rpx;
		}
	}
</style>
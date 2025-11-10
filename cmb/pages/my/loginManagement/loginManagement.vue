<template>
	<view class="app">
		<navbar title="登录管理" bg-color="#f8f8f8" more-btn>
		</navbar>
		<view class="pages">
			<image class="page-image" src="/static/pages/dlgl.png" mode="widthFix"></image>
			<view class="list">
				<view class="item"
					@click="common(`/pages/commonPages/commonPages?pageImage=/static/pages/xgdlmm.png&title=修改登录密码`)">
				</view>
				<view class="item"
					@click="common(`/pages/commonPages/commonPages?pageImage=/static/pages/szzwdl.png&title=设置指纹登录`)">
				</view>
				<view class="item"
					@click="common(`/pages/commonPages/commonPages?pageImage=/static/pages/szssmm.png&title=设置手势登录`)">
				</view>
				<view class="item"
					@click="common(`/pages/commonPages/commonPages?pageImage=/static/pages/wxdl.png&title=微信登录`)">
				</view>
				<view class="item"
					@click="common(`/pages/commonPages/commonPages?pageImage=/static/pages/szdxyzdl.png&title=设置短信验证登录`)">
				</view>
				<view class="item"
					@click="common(`/pages/commonPages/commonPages?pageImage=/static/pages/fztc.png&title=翻转退出`)">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {
		navigateTo
	} from '@/utils/index.js'
	export default {
		data() {
			return {


			};
		},
		methods: {
			common(url) {
				navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.bank {
		display: flex;
		padding: 16rpx 20rpx 16rpx 30rpx;
		box-sizing: border-box;
		align-items: center;
		font-size: 32rpx;

		.change-btn {
			color: #316EE5;
			margin-left: 16rpx;
			font-size: 28rpx;
		}

		.btn {
			border: 1rpx solid #111111;
			padding: 6rpx 40rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			border-radius: 50rpx;
			margin-left: auto;
		}
	}

	.pages {
		width: 750rpx;
		height: auto;
		position: relative;

		.list {
			position: absolute;
			width: 100%;
			top: 0;

			.item {
				height: 110rpx;
				width: 100%;
				opacity: 0.6;
				margin-bottom: 16rpx;
			}
		}

		.page-image {
			width: 750rpx;
			height: auto;
		}
	}
</style>
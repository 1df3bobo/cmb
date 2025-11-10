<template>
	<view class="app">
		<navbar moreBtn bg-color="#f8f8f8" service-btn title="手机号收款设置">
		</navbar>
		<view class="main">
			<view class="content">
				<view class="title">
					手机号收款
				</view>
				<view class="text" v-if="userInfo.phone">
					为手机号{{showPhoneNo(userInfo.phone)}}设置收款后，他人在任何手机银行App都可以通过该手机号向你转账哦~
				</view>
			</view>
			<view class="pages">
				<image src="/static/home/payment.png" class="page-image" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {
		showPhoneNo,
	} from '@/utils/index.js'
	export default {
		data() {
			return {
				showPhoneNo: showPhoneNo,
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 100%;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.main {
		width: 750rpx;
		position: relative;

		.content {
			color: #8B8589;
			font-size: 34rpx;
			padding: 100rpx 40rpx 0 40rpx;
			box-sizing: border-box;
			margin-bottom: 180rpx;

			.title {
				color: #111;
				margin-bottom: 20rpx;
				font-size: 48rpx;
			}
		}

		.pages {
			width: 750rpx;
			height: auto;
			position: relative;

			.page-image {
				width: 750rpx;
				height: auto;
			}

		}
	}
</style>